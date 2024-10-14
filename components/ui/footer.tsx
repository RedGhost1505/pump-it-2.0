import React, { useState } from 'react';
import { motion } from 'framer-motion';


const Footer = () => {
    const [activeLink, setActiveLink] = useState<string>('About');


    return (
        <footer className="bg-white bg-opacity-45 w-[400px] h-16 my-4 rounded-full">
            <div className="container mx-auto h-full flex justify-center items-center relative">
                {/* Fondo animado */}
                <motion.div
                    className="absolute h-[75%] mx-5 rounded-full bg-red-600"
                    style={{
                        left: activeLink === 'Home' ? '2%' : activeLink === 'About' ? '27.5%' : '57.5%',
                        width: activeLink === 'Home' ? '5rem' : activeLink === 'About' ? '6rem' : '7.5rem',
                    }}
                    layoutId="background"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                <div className="flex justify-between w-full px-10 z-10">
                    <motion.a
                        href="#"
                        onClick={() => setActiveLink('Home')}
                        className={`font-semibold text-lg ${activeLink === 'Home' ? 'text-white' : 'text-black'
                            }`}
                        whileTap={{ scale: 0.95 }} // Efecto de escala al hacer clic
                    >
                        Home
                    </motion.a>
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