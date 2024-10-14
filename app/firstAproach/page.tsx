"use client";
import React, { useRef, useEffect } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

const PoseTrackingComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
                canvasCtx.fillStyle = 'red';
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
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                playsInline
            />
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                width={1280}  // Ajusta el tamaño del canvas
                height={720}   // Ajusta el tamaño del canvas
            />
        </div>
    );
};

export default PoseTrackingComponent;
