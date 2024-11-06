// Archivo: ConfiguracionContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ConfiguracionEjercicio = {
    restricciones: string[];
    angulosObjetivo: { [key: string]: [number, number] };
    ejercicioNombre: string;
    puntosNecesarios: number[][]; // Lista de listas 
};

type ConfiguracionContextType = {
    configuracion: ConfiguracionEjercicio | null;
    setConfiguracion: (config: ConfiguracionEjercicio) => void;
};

const ConfiguracionContext = createContext<ConfiguracionContextType | undefined>(undefined);

export const ConfiguracionProvider = ({ children }: { children: ReactNode }) => {
    const [configuracion, setConfiguracion] = useState<ConfiguracionEjercicio | null>(null);

    return (
        <ConfiguracionContext.Provider value={{ configuracion, setConfiguracion }}>
            {children}
        </ConfiguracionContext.Provider>
    );
};

export const useConfiguracion = () => {
    const context = useContext(ConfiguracionContext);
    if (!context) {
        throw new Error("useConfiguracion debe usarse dentro de un ConfiguracionProvider");
    }
    return context;
};
