import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import Recents1 from '../app/public/Gym_Menu_07.jpg';
import Recents2 from '../app/public/Gym_menu_05.jpg';
import Recents3 from '../app/public/Gym_menu_03.jpg';
import Image from 'next/image';

const CarouselMobile = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const recentsHardcode = [
        {
            id: 1,
            image: Recents1,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start',
        },
        {
            id: 2,
            image: Recents2,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start',
        },
        {
            id: 3,
            image: Recents3,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start',
        },
        {
            id: 4,
            image: Recents2,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start',
        },
        {
            id: 5,
            image: Recents3,
            title: 'Power your training with AI',
            description: 'Build the best version of yourself!',
            button: 'Start',
        },
    ];

    // Configuración del autoplay
    const autoplayPlugin = React.useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: false, // Desactiva esta opción para pruebas
        })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
        },
        [autoplayPlugin.current]
    );

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
            console.log('Selected index:', selectedIndex);
        };

        const onInteraction = () => {
            if (autoplayPlugin.current) {
                autoplayPlugin.current.stop();
                setTimeout(() => {
                    autoplayPlugin.current.play(); // Reactivar autoplay después de 4 segundos
                }, 4000);
            }
        };

        emblaApi.on('select', onSelect);
        emblaApi.on('pointerUp', onInteraction); // Detecta interacción y reinicia autoplay
        onSelect();

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('pointerUp', onInteraction);
        };
    }, [emblaApi]);

    return (
        <div>
            <div ref={emblaRef} className="overflow-hidden w-full">
                <div className="flex">
                    {recentsHardcode.map((workout, index) => (
                        <div
                            key={index}
                            className="embla__slide p-1"
                            style={{ flex: '0 0 100%' }}
                        >
                            <Card className="border-none p-0 rounded-xl bg-transparent">
                                <CardContent className="relative w-full h-[395px]">
                                    <Image
                                        src={workout.image}
                                        alt="Gym"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-xl z-0"
                                    />

                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselMobile;
