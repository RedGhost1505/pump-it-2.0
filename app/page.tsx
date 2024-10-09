"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import GymImage from "../app/assets/GYM_Landing_Image.jpg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Image
        src={GymImage}
        alt="Gym"
        fill
        className="object-cover z-0"
      />

      <div className="flex flex-col items-start justify-start z-10 pt-8 pl-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white">Pump-<span className="text-red-600">It</span></h1>
        </motion.div>
      </div>

      <div className="flex flex-col flex-grow items-start justify-center z-10 pl-8 w-[500px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-red-600">Power your training with AI</h2>
          <h1 className="text-6xl font-bold text-white mt-6">Build the best version of <span className="font-light">yourself!</span></h1>
          <Button size="lg" className="mt-8  text-md font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500">
            Sign Up
          </Button>
        </motion.div>
      </div>


    </main>
  );
}
