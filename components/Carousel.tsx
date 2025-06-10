import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import Recents1 from '../app/public/assets/Gym_Menu_07.jpg'
import Recents2 from '../app/public/assets/Gym_Menu_05.jpg'
import Recents3 from '../app/public/assets/Gym_Menu_03.jpg'
import Image from 'next/image'

const Carousel = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const recentsHardcode = [
        {
            id: 1,
            image: Recents1,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start'
        },
        {
            id: 2,
            image: Recents2,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start'
        },
        {
            id: 3,
            image: Recents3,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start'
        }
    ]

    // Configure autoplay plugin
    const autoplayPlugin = React.useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            rootNode: (emblaRoot) => emblaRoot.parentElement,
        })
    );

    // Initialize carousel with autoplay plugin
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            skipSnaps: false,
        },
        [autoplayPlugin.current]
    );

    // Handle slide changes and update selected index
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect(); // Set initial selection

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    // Handle manual navigation through buttons
    const handleButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;

            emblaApi.scrollTo(index);
            autoplayPlugin.current.stop(); // Stop autoplay

            // Optional: Restart autoplay after a delay
            setTimeout(() => {
                autoplayPlugin.current.play();
            }, 4000);
        },
        [emblaApi]
    );

    return (
        <>
            <div>
                <div ref={emblaRef} className="overflow-hidden w-full"> {/* Aumentar ancho */}
                    <div className="flex">
                        {recentsHardcode.map((_, index) => (
                            <div
                                key={index}
                                className="embla__slide p-1"
                                style={{ flex: "0 0 100%" }} // Asegurarse de que cada slide ocupe el 100% del ancho
                            >
                                <Card className="border-none p-0 rounded-lg bg-transparent">
                                    <CardContent className="relative w-full h-[150px]"> {/* Ajustar altura del contenedor */}
                                        <Image
                                            src={_.image}
                                            alt="Gym"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg z-0"
                                        />
                                        <button className="absolute left-1 top-2 w-auto z-10 bg-transparent border-[1px] border-white rounded-full">
                                            <h1 className='font-light text-[12px] text-white px-2 py-[2px]'> Your recents </h1>
                                        </button>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex mt-4 space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={`w-14 h-2 rounded-full transition-colors duration-300 ${selectedIndex === index
                                ? "bg-white"
                                : "bg-gray-400 hover:bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Carousel