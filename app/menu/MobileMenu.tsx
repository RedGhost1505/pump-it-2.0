"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import recentWorkoutImage1 from "../assets/Gym_menu_01.jpg";
import recentWorkoutImage2 from "../assets/Gym_menu_02.jpg";
import recentWorkoutImage3 from "../assets/Gym_menu_03.jpg";
import CarouselMobile from "@/components/CarouselMobile";
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import gymMenuImage from "../assets/Gym_Menu_Mobile.jpg";

const MobileMenu = () => {

    const recentWorkouts = [
        {
            image: recentWorkoutImage1,
            title: "Your last workout",
            description: "In your last workout you burned 300 calories",
        },
        {
            image: recentWorkoutImage2,
            title: "Cardio Blast",
            description: "You ran 5 kilometers in 30 minutes",
        },
        {
            image: recentWorkoutImage3,
            title: "Strength Training",
            description: "You lifted a total of 5,000 kg",
        },
        {
            image: recentWorkoutImage1,
            title: "Your last workout",
            description: "In your last workout you burned 300 calories",
        },
        {
            image: recentWorkoutImage2,
            title: "Cardio Blast",
            description: "You ran 5 kilometers in 30 minutes",
        },
        {
            image: recentWorkoutImage3,
            title: "Strength Training",
            description: "You lifted a total of 5,000 kg",
        }
    ];

    return (
        <div className="relative min-h-screen flex flex-col bg-black">
            <div className="flex flex-row items-center justify-center space-x-8 mt-14"> {/* Espacio entre avatar e input */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Avatar className="w-14 h-14">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            className="w-14 h-14"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative"
                >
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {/* Icono de búsqueda de Lucide */}
                            <Search className="h-5 w-5 text-white" />
                        </span>
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-[280px] bg-transparent border border-white text-white placeholder-white rounded-lg pl-10 pr-4 py-2"
                        />
                    </div>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-row justify-start"
            >
                <h1 className="text-white text-2xl font-bold mt-8 ml-6">Good morning Alex</h1>
            </motion.div>


            <div className="relative flex flex-col items-center justify-center mt-6 rounded-xl overflow-hidden h-[200px] w-full px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative w-full h-full" // Asegura que el contenedor tenga un tamaño definido
                >
                    <Image
                        src={gymMenuImage}
                        alt="Gym"
                        fill
                        className="object-cover object-right opacity-70 rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end pl-4 pb-4">
                        <h2 className="text-white text-xl font-light">Your last workout</h2>
                        <h2 className="text-white text-2xl font-normal">In your last workout you burned 300 calories</h2>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-row justify-start"
            >
                <h1 className="text-white text-2xl font-normal mt-8 ml-6">Your recent workouts</h1>
            </motion.div>

            <div className="relative flex flex-row h-auto w-full overflow-x-scroll whitespace-nowrap gap-4 px-6 overflow-y-hidden">
                {recentWorkouts.map((workout, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 flex flex-col items-center justify-center mt-6 rounded-xl overflow-hidden h-[200px] w-[200px]"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={workout.image}
                                alt={workout.title}
                                fill
                                className="object-cover object-right opacity-70 rounded-xl"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end pl-4 pb-4">
                                <h2 className="text-white text-xl font-light">{workout.title}</h2>
                                <h2 className="text-white text-2xl font-normal">
                                    {workout.description}
                                </h2>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-row justify-start"
            >
                <h1 className="text-white text-2xl font-normal mt-8 ml-6">Your workouts</h1>
            </motion.div>
            <div>
                <div className="relative flex flex-col items-center justify-center mt-6 rounded-xl overflow-hidden h-[400px] w-full px-6 mb-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="relative w-full h-full"
                    >
                        <CarouselMobile />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
