import React, { useState } from 'react';
import { motion } from 'framer-motion';


const Footer = () => {
    const [activeLink, setActiveLink] = useState<string>('About');


    return (
        <footer className="bg-white bg-opacity-45 w-[300px] h-16 my-4 rounded-full">
            <div className="container mx-auto h-full flex justify-center items-center relative">
                {/* Fondo animado */}
                <motion.div
                    className={`absolute h-[75%] mx-5 rounded-full bg-red-600`}
                    style={{
                        // Usamos left o right dependiendo del enlace activo
                        left: activeLink === 'About' ? '0%' : '41.5%', // Ajusta las posiciones según tu diseño
                        width: activeLink === 'About' ? '6rem' : '8rem', // Cambia el ancho aquí si es necesario
                    }}
                    layoutId="background" // Esto permite la animación de posición
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Ajusta el tipo de transición aquí
                />

                <div className="flex justify-between w-full px-10 z-10">
                    <motion.a
                        href="#"
                        onClick={() => setActiveLink('About')}
                        className={`font-semibold text-lg ${activeLink === 'About' ? 'text-white' : 'text-black'
                            }`}
                        whileTap={{ scale: 0.95 }} // Efecto de escala al hacer clic
                    >
                        About
                    </motion.a>
                    <motion.a
                        href="#"
                        onClick={() => setActiveLink('Contact Us')}
                        className={`font-semibold text-lg ${activeLink === 'Contact Us' ? 'text-white' : 'text-black'
                            }`}
                        whileTap={{ scale: 0.95 }} // Efecto de escala al hacer clic
                    >
                        Contact Us
                    </motion.a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;