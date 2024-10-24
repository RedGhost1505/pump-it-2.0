// Archivo: PoseTrackingComponent.tsx
"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Pose as MediaPipePose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlineacionEspalda , VerificadorRestricciones, AlineacionPiesHombros, AlineacionManosHombros, AlineacionCodosHombrosX } from './Restricciones';
import { Movimiento, Landmarks } from './Movimiento';

const restricciones = [new AlineacionPiesHombros(), new AlineacionCodosHombrosX];
const verificador = new VerificadorRestricciones(restricciones);

type AnguloObjetivo = {
    [key: string]: [number, number];
};


const angulosObjetivo : AnguloObjetivo = {
    "12,14,16": [30.0, 100.0], // Ángulo para el brazo izquierdo 
    "11,13,15": [30.0, 100.0], // Ángulo para el brazo derecho 
};
const ejercicio = new Movimiento("Elevaciones Laterales", angulosObjetivo, 5);

const PoseTrackingComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [contador, setContador] = useState(0);
    const [stages, setStages] = useState<{ [key: string]: string | null }>({});
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        if (!videoRef.current || !canvasRef.current) return;

        // Configuración de MediaPipe Pose 
        const pose = new MediaPipePose({
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

        // Configuración de la cámara 
        const camera = new Camera(videoRef.current!, {
            onFrame: async () => {
                await pose.send({ image: videoRef.current! });
            },
            width: 1280,
            height: 720,
        });
        camera.start();

        // Callback para procesar los resultados
        function onResults(results: any) {
            const canvasCtx = canvasRef.current!.getContext('2d');
            if (canvasCtx) {
                canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

                if (results.poseLandmarks) {
                    drawPose(results.poseLandmarks, canvasCtx);

                    // Verificar las restricciones
                    const landmarks = results.poseLandmarks.map((landmark: { x: number; y: number; z: number }) => ({ x: landmark.x, y: landmark.y, z: landmark.z }));
                    const poseData: { [key: string]: { x: number; y: number; z: number } } = Object.fromEntries(
                        landmarks.map((landmark, index) => [index.toString(), landmark])
                    );
                    const resultadoRestricciones = verificador.verificarPostura(poseData);

                    // Actualizar errores
                    setErrores(resultadoRestricciones.puntosMal);

                    // Verificar el ejercicio solo si no hay errores
                    if (resultadoRestricciones.puntosMal.length === 0) {
                        const ejercicioCompletado = ejercicio.verificarEjercicio(landmarks as Landmarks);
                        if (ejercicioCompletado) {
                            setContador(ejercicio.contador);
                        }
                    }

                    // Actualizar el estado de las etapas
                    setStages({ ...ejercicio.stage });
                }
            }
        }

        // Dibuja los landmarks de la pose en el canvas 
        function drawPose(landmarks: { x: number; y: number; z: number }[], canvasCtx: CanvasRenderingContext2D) {
            for (const landmark of landmarks) {
                const { x, y } = landmark;
                canvasCtx.beginPath();
                canvasCtx.arc(x * canvasRef.current!.width, y * canvasRef.current!.height, 5, 0, 2 * Math.PI);
                canvasCtx.fillStyle = 'red';
                canvasCtx.fill();
            }
        }

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

            <div className="flex flex-row justify-between items-start z-10 pt-8 px-8 w-full relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <h1 className="text-4xl font-bold text-white">Pump-<span className="text-red-600">It</span></h1>
                    <p className="text-white mt-4">Repeticiones completadas: {contador}</p>
                    <p className="text-white mt-4">Estado de los ángulos principales:</p>
                    <ul className="text-white">
                        {Object.entries(stages).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                        ))}
                    </ul>
                    <p className="text-white mt-4">Errores detectados:</p>
                    <ul className="text-white">
                        {errores.map((punto, index) => (
                            <li key={index}>Punto {punto}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Link href="/">
                        <Button
                            size="lg"
                            className="text-md font-bold border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500"
                        >
                            End
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default PoseTrackingComponent;
