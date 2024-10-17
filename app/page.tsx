"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import GymImage from "../app/assets/GYM_Landing_Image.jpg";
import Footer from "@/components/ui/footer";
import { motion } from "framer-motion";
import Link from 'next/link'; // Importa Link de Next.js

const Home = () => {

  return (
    <main className="relative min-h-screen flex flex-col bg-black">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={GymImage}
          alt="Gym"
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="flex flex-row justify-between items-center z-10 pt-8 px-8 w-full ">
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
          <Link href="/firstAproach">
            <Button
              size="lg"
              className="text-md font-bold bg-transparent border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500"
            >
              Start
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col flex-grow items-start justify-center z-10 pl-8 w-[500px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-2xl font-bold text-red-600">Power your training with AI</h2>
          <h1 className="text-6xl font-bold text-white mt-6">Build the best version of <span className="font-light">yourself!</span></h1>
          <Button size="lg" className="mt-8  text-md font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500">
            Sign Up
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className=" flex flex-row items-end justify-center z-10 h-[50px]"
      >
        <Footer />
      </motion.div>

    </main>
  );
}

export default Home;