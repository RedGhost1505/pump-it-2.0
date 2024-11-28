"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GymImage from "../app/assets/Gym_Landing_Mobile.jpg";
import { motion } from "framer-motion";
import Link from "next/link";

const MobileHome = () => {
    return (
        <main className="relative min-h-screen flex flex-col bg-black">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={GymImage}
                    alt="Gym"
                    fill
                    className="object-cover object-right opacity-70" // Aquí ajustamos la posición
                />
            </div>

            {/* Contenido principal */}
            <div className="relative flex z-10 pt-12 pl-8 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold text-white">
                        Pump-<span className="text-red-600">It</span>
                    </h1>
                </motion.div>
            </div>

            <div className="relative flex flex-col flex-grow items-end justify-end z-10 px-8 pb-10 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-left"
                >

                    <h1 className="text-5xl font-bold text-white">
                        Build the best version of <span className="font-light">yourself!</span>
                    </h1>
                    <h3 className="text-md font-light text-white mt-6">Whether you&apos;re just starting or leveling up, Pump-It guides your transformation every step of the way. Start today!
                    </h3>

                </motion.div>
            </div>
            <div className="flex flex-row z-10 px-8 w-full items-center justify-center gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pl-8"
                >
                    <Link href="/menu">
                        <Button
                            className="w-[170px] h-14 text-lg font-bold bg-red-600 text-white rounded-full hover:bg-red-700 focus:ring-2 focus:ring-red-500 z-10"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pr-8"
                >
                    <Link href="/menu">
                        <Button
                            className="w-[170px] h-14 text-lg font-bold bg-transparent text-white border-2 border-white rounded-full z-10"
                        >
                            Sign In
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
};

export default MobileHome;
