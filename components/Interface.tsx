// Interface.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BiStats } from "react-icons/bi";

const Interface: React.FC = () => {
    return (
        <div className="absolute bottom-0 left-0 z-10 p-8 w-[500px]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <Button size="lg" className="mt-8 text-md font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-red-600 focus:ring-2 focus:ring-white w-[100%]">
                    New set
                </Button>
                <div className="mt-6 rounded-xl bg-white bg-opacity-40 p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-4xl font-bold text-white">Time</h1>
                            <h1 className="text-5xl font-thin text-white">00:00:00</h1>
                            <h1 className="text-4xl font-bold text-white">Reps</h1>
                            <h1 className="text-5xl font-thin text-white">0</h1>
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <div className="flex justify-center items-center w-40 h-40 border-4 border-red-600 rounded-full">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-white">Set</h2>
                                    <h3 className="text-3xl font-thin text-white">0</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 rounded-lg bg-white bg-opacity-40 p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-4xl font-bold text-white">Avg. Time</h1>
                            <h1 className="text-5xl font-thin text-white">00:00:00</h1>
                            <h3 className="text-md font-bold text-white">Seconds per Exercise</h3>
                            <h1 className="text-4xl font-bold text-white mt-2">Calories</h1>
                            <h1 className="text-5xl font-thin text-white">0kcal</h1>
                        </div>
                        <div className="flex justify-center items-center w-40 h-40 mt-6">
                            <div className="flex flex-col justify-center items-center text-center">
                                <BiStats className="text-6xl text-white" />
                                <h2 className="text-4xl font-thin text-white">0%</h2>
                                <h3 className="text-1xl font-bold text-white">Correct technique</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Interface;
