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


type Landmark = {
    x: number;
    y: number;
    z: number;
};

type Results = {
    poseLandmarks?: Landmark[];
};

const PoseTrackingComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { configuracion } = useConfiguracion();
    const [contador, setContador] = useState(0); // Estado para contar los ejercicios
    const [verificador, setVerificador] = useState<VerificadorRestricciones | null>(null);
    const [ejercicio, setEjercicio] = useState<Movimiento | null>(null);
    // const [errores, setErrores] = useState<string[]>([]); // Estado para almacenar los puntos que no cumplen restricciones

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

    // useEffect para inicializar MediaPipe Pose y la cámara
    useEffect(() => {
        if (!videoRef.current || !canvasRef.current || !verificador || !ejercicio) return;

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

        const camera = new Camera(videoRef.current!, {
            onFrame: async () => {
                await pose.send({ image: videoRef.current! });
            },
            width: 1280,
            height: 720,
        });
        camera.start();

        // Callback para procesar los resultados de MediaPipe
        function onResults(results: Results) {
            const canvasCtx = canvasRef.current!.getContext('2d');
            if (canvasCtx) {
                canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

                if (results.poseLandmarks) {
                    const landmarks = results.poseLandmarks.map((landmark: { x: number; y: number; z: number }) => ({
                        x: landmark.x,
                        y: landmark.y,
                        z: landmark.z,
                    }));
                    const poseData: { [key: string]: { x: number; y: number; z: number } } = Object.fromEntries(
                        landmarks.map((landmark, index) => [index.toString(), landmark])
                    );

                    // Verificar restricciones sin mostrarlas
                    const resultadoRestricciones = verificador.verificarPostura(poseData);
                    // setErrores(resultadoRestricciones.puntosMal);

                    if (resultadoRestricciones.puntosMal.length === 0) {
                        // Si no hay restricciones incumplidas, verificar si se completó el ejercicio
                        const ejercicioCompletado = ejercicio.verificarEjercicio(landmarks as Landmarks);
                        if (ejercicioCompletado) {
                            setContador(ejercicio.contador);
                        }
                    }

                    // Dibujar pose en el canvas
                    drawPose(landmarks, canvasCtx, resultadoRestricciones.puntosMal);
                }
            }
        }

        // Dibuja los landmarks de la pose en el canvas
        function drawPose(landmarks: { x: number; y: number; z: number }[], canvasCtx: CanvasRenderingContext2D, puntosMal: string[]) {
            for (let i = 0; i < landmarks.length; i++) {
                const { x, y } = landmarks[i];
                canvasCtx.beginPath();
                canvasCtx.arc(x * canvasRef.current!.width, y * canvasRef.current!.height, 5, 0, 2 * Math.PI);
                canvasCtx.fillStyle = puntosMal.includes(i.toString()) ? 'red' : 'green';
                canvasCtx.fill();
            }
        }

        return () => {
            camera.stop();
            pose.close();
        };
    }, [verificador, ejercicio]);

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

            {/* Pasar el contador al componente Interface */}
            <Interface contador={contador} />
        </div>
    );
};

export default PoseTrackingComponent;
