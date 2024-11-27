// configuracionesEjercicios.ts

type ConfiguracionEjercicio = {
    restricciones: string[];
    angulosObjetivo: { [key: string]: [number, number] };
    ejercicioNombre: string;
    puntosNecesarios: number[][];
};

export const configuraciones: { [key: string]: ConfiguracionEjercicio } = {
    Lagartijas: {
        restricciones: ["CuerpoRecto","AlineacionHombrosConMunecas","SeparacionPies"],
        angulosObjetivo: {
            "12,14,16": [20.0, 140.0],
            "11,13,15": [20.0, 140.0]
        },
        ejercicioNombre: "Lagartijas",
        puntosNecesarios: [
            [11, 13, 15, 23, 25, 27],
            [12, 14, 16, 24, 26, 28]
        ]
    },
    Sentadilla: {
        restricciones: ["AlineacionRodillasPies"],
        angulosObjetivo: {
            "24,26,28": [70.0, 140.0],
            "23,25,27": [70.0, 140.0]
        },
        ejercicioNombre: "Sentadilla",
        puntosNecesarios: [
            [23, 25, 27, 29, 31],
            [24, 26, 28, 30, 32],
            [23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
        ]
    },
    CurlDeBarra: {
        restricciones: ["AlineacionCodosHombrosX", "AlineacionPiesHombros"],
        angulosObjetivo: {
            "12,14,16": [30.0, 150.0],
            "11,13,15": [30.0, 150.0]
        },
        ejercicioNombre: "Curl de barra",
        puntosNecesarios: [
            [11, 13, 15, 23, 25, 27],
            [12, 14, 16, 24, 26, 28],
            [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]
        ]
    },
    ElevacionesLaterales: {
        restricciones: ["AlineacionMunecasCodos"],
        angulosObjetivo: {
            "24,12,14": [20.0, 80.0],
            "23,11,13": [20.0, 80.0]
        },
        ejercicioNombre: "Elevaciones laterales",
        puntosNecesarios: [
            [11, 13, 15, 23, 25, 27],
            [12, 14, 16, 24, 26, 28],
            [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]
        ]
    },
    Pullups: {
        restricciones: ["AlineacionCodosHombrosX", "CuerpoRecto", "AlineacionHombrosConMunecas"],
        angulosObjetivo: {
            "12,14,16": [30.0, 160.0],
            "11,13,15": [30.0, 160.0]
        },
        ejercicioNombre: "Pullups",
        puntosNecesarios: [
            [11, 13, 15, 23],
            [12, 14, 16, 24],
            [11, 12, 13, 14, 15, 16, 23, 24]
        ]
    }
};
