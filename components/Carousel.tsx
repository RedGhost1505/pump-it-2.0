import React, { useRef, useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'

const Carousel = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

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
                <div ref={emblaRef} className="overflow-hidden w-40">
                    <div className="flex">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="embla__slide p-1"
                                style={{ flex: "0 0 100%" }}
                            >
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            {index + 1}
                                        </span>
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
                            className={`w-12 h-2 rounded-full transition-colors duration-300 ${selectedIndex === index
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