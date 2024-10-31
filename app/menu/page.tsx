"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { IoMdCloudyNight } from "react-icons/io";
import { FaCloudSun } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import gymMenuImage from "../assets/Gym_menu_01.jpg";
import Image from 'next/image';

const Menu = () => {
    const [time, setTime] = useState<Date>(new Date());
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    // Manejar el cambio de slide y el estado del índice seleccionado
    useEffect(() => {
        if (emblaApi) {
            const onSelect = () => {
                const selected = emblaApi.selectedScrollSnap();
                setSelectedIndex(selected);
            };

            // Añadir el listener
            emblaApi.on("select", onSelect);

            // Cleanup cuando el componente se desmonta
            return () => {
                if (emblaApi) {
                    emblaApi.off("select", onSelect); // Solo quitar si emblaApi existe
                }
            };
        }
    }, [emblaApi]);

    // Manejar el clic en los botones para cambiar diapositiva
    const handleButtonClick = (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    // Actualizar la hora cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Formatear la hora para mostrar
    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const isPM = hours >= 12;
        const formattedHours = hours % 12 || 12; // Formato de 12 horas
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const period = isPM ? 'PM' : 'AM';
        return { formattedHours, formattedMinutes, period };
    };

    const { formattedHours, formattedMinutes, period } = formatTime(time);

    return (
        <div className="flex flex-col z-0 w-full min-h-[100vh] bg-black">
            <div className="flex flex-row justify-between items-center z-10 pt-4 px-8 w-full">
                <div className="flex flex-row items-center">
                    <div>
                        <h1 className="text-4xl font-normal text-white">{formattedHours}:{formattedMinutes}</h1>
                        <h3 className="text-4xl font-extralight text-white">{period}</h3>
                    </div>
                    {period === 'PM' ? (
                        <IoMdCloudyNight className="text-4xl text-white ml-6" />
                    ) : (
                        <FaCloudSun className="text-4xl text-white ml-5" />
                    )}
                </div>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white">
                    Pump-<span className="text-red-600">It</span>
                </h1>

                <div className="flex flex-row items-center">
                    <Avatar className='mr-4'>
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

            <div className="flex justify-center mt-10">
                <div className="relative w-[300px]">
                    <Input
                        placeholder="Search..."
                        className="pr-10 rounded-3xl"
                    />
                    <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>
            </div>

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

                    <div className="absolute top-4 left-8 z-10 w-[400px]">
                        <div className="text-white text-[3rem] font-semibold">
                            Good morning Alex
                        </div>
                        <div className="text-white text-[2rem] font-light mt-4">
                            in your last workout you burned <span className='font-semibold'>300kcals</span>, keep going !!
                        </div>
                        <div className="mt-8">
                            <Carousel plugins={[plugin.current]} className='w-40 h-40'>
                                <CarouselContent>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {/* <CarouselPrevious />
                                <CarouselNext /> */}
                            </Carousel>

                            {/* Botones de navegación */}
                            <div className="flex mt-4 space-x-2">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleButtonClick(index)}
                                        className={`w-12 h-2 rounded-full ${selectedIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center w-full h-full py-4 bg-blue-100 rounded-lg">
                    {/* Contenido del segundo div */}
                </div>
            </div>
        </div>
    );
};

export default Menu;
