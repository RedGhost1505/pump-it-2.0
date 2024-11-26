"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { IoMdCloudyNight } from "react-icons/io";
import { FaCloudSun } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import gymMenuImage from "../assets/Gym_menu_01.jpg";
import gymLegs from "../assets/Gym_Menu_05.jpg";
import gymShouders from "../assets/Gym_Menu_03.jpg";
import gymPullUps from "../assets/Gym_Menu_08.jpg";
import gymCurl from "../assets/Gym_Menu_06.jpg";
import gymFlex from "../assets/Gym_Menu_07.jpg";
import gymStatsImage from "../assets/Gym_Menu_04.jpg";
import Carousel from "@/components/Carousel";
import { IoSettingsSharp } from "react-icons/io5";
import { TbBrandGithubFilled } from "react-icons/tb";
import { MdOutlineQuestionMark } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area"
import { BiStats } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { configuraciones } from './configuracionesEjercicios';
import { useConfiguracion } from "@/app/Context/ConfiguracionContext";
import { useRouter } from "next/navigation";


const Menu = () => {
    const [time, setTime] = useState<Date>(new Date());
    const router = useRouter(); // Inicializar useRouter
    const { setConfiguracion } = useConfiguracion(); // Importar y definir setConfiguracion


    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const isPM = hours >= 12;
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const period = isPM ? "PM" : "AM";
        return { formattedHours, formattedMinutes, period };
    };

    const { formattedHours, formattedMinutes, period } = formatTime(time);

    const handleStartClick = (ejercicioNombre: string) => {
        const configuracion = configuraciones[ejercicioNombre];

        if (configuracion) {
            // Guardar configuración en el contexto
            setConfiguracion(configuracion);
            // Redirigir a la página específica del ejercicio
            router.push("/firstAproach"); // Puedes cambiar la ruta según la página destino
        } else {
            console.error(`Configuración para el ejercicio "${ejercicioNombre}" no encontrada.`);
        }
    };

    return (
        <div className="flex flex-col z-0 w-full min-h-[100vh] bg-black">
            {/* Header section */}
            <div className="flex flex-row justify-between items-center z-10 pt-4 px-8 w-full">
                <div className="flex flex-row items-center">
                    <div>
                        <h1 className="text-4xl font-normal text-white">
                            {formattedHours}:{formattedMinutes}
                        </h1>
                        <h3 className="text-4xl font-extralight text-white">{period}</h3>
                    </div>
                    {period === "PM" ? (
                        <IoMdCloudyNight className="text-4xl text-white ml-6" />
                    ) : (
                        <FaCloudSun className="text-4xl text-white ml-5" />
                    )}
                </div>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white">
                    Pump-<span className="text-red-600">It</span>
                </h1>

                <div className="flex flex-row items-center">
                    <Avatar className="mr-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link href="/menu">
                        <Button
                            size="lg"
                            className="text-md font-bold bg-transparent border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500"
                        >
                            Sign Out
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Search section */}
            <div className="flex justify-center mt-10 ">
                {/* <button className="w-auto h-10 bg-white rounded-full flex items-center justify-center space-x-2 px-4">
                    <IoSettingsSharp className="text-xl text-gray-800" />
                    <span className="font-semibold text-gray-800">Settings</span>
                </button> */}
                <div className="relative w-[300px]">
                    <Input placeholder="Search..." className="pr-10 rounded-3xl" />
                    <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>
            </div>

            {/* Main content section */}
            <div className="flex flex-row w-full mt-8 h-[550px] px-6 gap-6">
                <div className="relative flex flex-row justify-between items-center w-full h-full py-4 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={gymMenuImage}
                            alt="Gym Menu"
                            layout="fill"
                            objectFit="cover"
                            style={{ filter: "blur(4px)" }}
                        />
                    </div>

                    <div className="absolute top-4 left-8 z-10 w-full">
                        <div className="text-white w-[400px] text-[3rem] font-semibold">
                            Good morning Alex
                        </div>
                        <div className="text-white text-[2rem] w-[400px] font-light mt-4">
                            in your last workout you burned{" "}
                            <span className="font-semibold">300kcals</span>, keep going !!
                        </div>
                        <div className="flex flex-row w-[100%] justify-between mt-8">
                            <Carousel />
                            <div className="flex flex-row items-end justify-end pr-14 gap-2">
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <TbBrandGithubFilled className="text-xl" />
                                </button>
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <MdOutlineQuestionMark className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full h-full rounded-lg">
                    <ScrollArea className="h-full w-full rounded-lg">
                        <div className="w-full h-[280px] relative rounded-lg overflow-hidden">
                            <div className="absolute inset-0">
                                <Image
                                    src={gymStatsImage}
                                    alt="Gym Stats"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                    style={{ filter: "blur(4px)" }}
                                />
                            </div>
                            {/* Header */}
                            <div className="absolute z-10 flex flex-row justify-between items-center w-full px-4 pt-3  rounded-lg">
                                <Button size="sm" className="text-xs font-bold text-white bg-transparent border-[1px] border-white rounded-full h-7 ">
                                    Your Stats
                                </Button>
                                <Button size="sm" className="text-xs font-bold text-white bg-transparent border-white rounded-full bg-white bg-opacity-20 h-7">
                                    <BsThreeDots className="text-sm" />
                                </Button>
                            </div>

                            <div className="absolute z-10 inset-0 flex justify-center items-center"> {/* Clases de flex para centrar */}
                                <div className="flex flex-row items-center justify-center w-full ">
                                    <div className="flex flex-col items-end pr-4 pb-14 h-auto space-y-[-3px] w-36">
                                        <h1 className="text-md font-light text-white">12/12/2021</h1>
                                        <h1 className="text-md font-light text-white">9.20 pm</h1>
                                        {/* <h1 className="text-md font-light text-white">pm</h1> */}
                                    </div>
                                    {/* Circulo de progreso */}
                                    <div className="w-40 h-40 border-8 border-white rounded-full flex justify-center items-center">
                                        <BiStats className="text-[100px] text-white" />
                                    </div>
                                    <div className="flex flex-col items-start pl-4 pt-14 h-auto w-36 ">
                                        <h1 className="text-md font-light text-white">100% of correct technique</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4 relative rounded-lg overflow-hidden mt-4 h-[255px]">
                            <div className="w-[40%] relative">
                                <div className="absolute inset-0">
                                    <Image
                                        src={gymCurl}
                                        alt="Gym Legs"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="relative w-full h-full">
                                    <div className="absolute bottom-0 left-0 flex flex-col items-start pl-4 pb-2 h-auto w-40 z-20">
                                        <h3 className="text-white z-20 font-light mb-[-5px]">Muscle building</h3>
                                        <h1 className="text-white z-20 font-bold text-[26px]">Bicep Curl</h1>
                                    </div>
                                    <button onClick={() => handleStartClick("CurlDeBarra")} 
                                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center absolute bottom-2 right-4 z-20">
                                        <FaPlay className="text-sm" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-[60%] relative">
                                <div className="absolute inset-0">
                                    <Image
                                        src={gymLegs}
                                        alt="Gym Abs"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="relative w-full h-full">
                                    <div className="absolute bottom-0 left-0 flex flex-col items-start pl-4 pb-2 h-auto w-36 z-20">
                                        <h3 className="text-white z-20 font-light mb-[-5px]">Muscle building</h3>
                                        <h1 className="text-white z-20 font-bold text-[26px]">Squat</h1>
                                    </div>
                                        <button onClick={() => handleStartClick("Sentadilla")} 
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center absolute bottom-2 right-4 z-20">
                                            <FaPlay className="text-sm" />
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4 relative rounded-lg overflow-hidden mt-4 h-[255px]">
                            <div className="w-[64%] relative">
                                <div className="absolute inset-0">
                                    <Image
                                        src={gymShouders}
                                        alt="Gym Legs"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="relative w-full h-full">
                                    <div className="absolute bottom-0 left-0 flex flex-col items-start pl-4 pb-2 h-auto w-50 z-20">
                                        <h3 className="text-white z-20 font-light mb-[-5px]">Muscle building</h3>
                                        <h1 className="text-white z-20 font-bold text-[26px]">Lateral Raises</h1>
                                    </div>
                                        <button onClick={() => handleStartClick("ElevacionesLaterales")} 
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center absolute bottom-2 right-4 z-20">
                                            <FaPlay className="text-sm" />
                                        </button>
                                </div>
                            </div>
                            <div className="w-[36%] relative">
                                <div className="absolute inset-0">
                                    <Image
                                        src={gymPullUps}
                                        alt="Gym Abs"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="relative w-full h-full">
                                    <div className="absolute bottom-0 left-0 flex flex-col items-start pl-4 pb-2 h-auto w-50 z-20">
                                        <h3 className="text-white z-20 font-light mb-[-5px]">Muscle building</h3>
                                        <h1 className="text-white z-20 font-bold text-[26px]">Pull Ups</h1>
                                    </div>
                                        <button onClick={() => handleStartClick("Pullups")} 
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center absolute bottom-2 right-4 z-20">
                                            <FaPlay className="text-sm" />
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4 relative rounded-lg overflow-hidden mt-4 h-[255px]">
                            <div className="w-[100%] relative">
                                <div className="absolute inset-0">
                                    <Image
                                        src={gymFlex}
                                        alt="Gym Legs"
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="50% 30%"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="relative w-full h-full">
                                    <div className="absolute bottom-0 left-0 flex flex-col items-start pl-4 pb-2 h-auto w-50 z-20">
                                        <h3 className="text-white z-20 font-light mb-[-5px]">Muscle building</h3>
                                        <h1 className="text-white z-20 font-bold text-[26px]">Push Ups</h1>
                                    </div>
                                        <button onClick={() => handleStartClick("Lagartijas")} 
                                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center absolute bottom-2 right-4 z-20">
                                            <FaPlay className="text-sm" />
                                        </button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div >
            </div >
        </div >
    );
};

export default Menu;
