"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Interface from '@/components/Interface';
import * as Restricciones from '@/app/utils/restricciones/restricciones';
import { VerificadorRestricciones } from '../utils/Restriccion';
import { Movimiento, Landmarks } from "@/app/utils/Movimiento";
import { useConfiguracion } from "@/app/Context/ConfiguracionContext";


const PoseTrackingComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { configuracion } = useConfiguracion();
    const [contador, setContador] = useState(0);
    const [stages, setStages] = useState<{ [key: string]: string | null }>({});
    const [errores, setErrores] = useState<string[]>([]);
    const [verificador, setVerificador] = useState<VerificadorRestricciones | null>(null);
    const [ejercicio, setEjercicio] = useState<Movimiento | null>(null);

    // useEffect para manejar la configuración
    useEffect(() => {
        if (configuracion) {
            // Crear las restricciones con base en la configuración
            const restricciones = configuracion.restricciones
                .map((nombre) => {
                    const ClaseRestriccion = Restricciones[nombre];
                    if (ClaseRestriccion) {
                        return new ClaseRestriccion();
                    } else {
                        console.error(`La clase de restricción ${nombre} no está definida.`);
                        return null;
                    }
                })
                .filter((restriccion) => restriccion !== null);

            setVerificador(new VerificadorRestricciones(restricciones));
            setEjercicio(new Movimiento(configuracion.ejercicioNombre, configuracion.angulosObjetivo, 5));
        }
    }, [configuracion]);


    useEffect(() => {
        if (!videoRef.current || !canvasRef.current) return;

        // Configuración de MediaPipe Pose
        const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResults);

        // Callback para procesar los resultados de MediaPipe
        function onResults(results: any) {
            const canvasCtx = canvasRef.current!.getContext('2d');
            if (canvasCtx) {
                canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

                if (results.poseLandmarks) {
                    drawPose(results.poseLandmarks, canvasCtx);
                }
            }
        }

        // Dibuja los landmarks de la pose en el canvas
        function drawPose(landmarks: any[], canvasCtx: CanvasRenderingContext2D) {
            for (const landmark of landmarks) {
                const { x, y } = landmark;
                canvasCtx.beginPath();
                canvasCtx.arc(x * canvasRef.current!.width, y * canvasRef.current!.height, 5, 0, 2 * Math.PI);
                canvasCtx.fillStyle = 'green';
                canvasCtx.fill();
            }
        }

        // Configuración de la cámara
        const camera = new Camera(videoRef.current!, {
            onFrame: async () => {
                await pose.send({ image: videoRef.current! });
            },
            width: 1280, // Aumenta el ancho
            height: 720, // Aumenta la altura
        });
        camera.start();

        return () => {
            camera.stop();
            pose.close();
        };
    }, []);

    return (
        <div className="relative w-screen h-screen">
            <div className="absolute w-full h-full z-0">
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    playsInline
                />
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    width={1280}
                    height={720}
                />
            </div>

            <div className="flex flex-row justify-between items-center z-10 pt-8 px-8 w-full relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <h1 className="text-4xl font-bold text-white">Pump-<span className="text-red-600">It</span></h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Link href="/">
                        <Button
                            size="lg"
                            className="text-md font-bold border-2 bg-transparent border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500"
                        >
                            End
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <Interface />

        </div>
    );
};

export default PoseTrackingComponent;
