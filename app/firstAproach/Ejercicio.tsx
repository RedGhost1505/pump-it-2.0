
type Landmarks = Array<{ x: number; y: number }>;

type AnguloObjetivo = {
    [key: string]: [number, number];
};

type AngulosAdicionales = {
    [key: string]: number;
};

class Ejercicio {
    nombre: string;
    angulosObjetivo: AnguloObjetivo;
    tolerancia: number;
    angulosAdicionales: AngulosAdicionales;
    toleranciaAdicional: number;
    stage: { [key: string]: string | null };
    contador: number;

    constructor(
        nombre: string,
        angulosObjetivo: AnguloObjetivo,
        tolerancia: number = 10.0,
        angulosAdicionales: AngulosAdicionales = {},
        toleranciaAdicional: number = 50.0
    ) {
        /** 
         * Clase para definir un ejercicio basado en múltiples ángulos y puntos de referencia. 
         * 
         * @param nombre El nombre del ejercicio. 
         * @param angulosObjetivo Un diccionario donde las claves son tuplas de puntos (start, mid, end) y los valores son tuplas con ángulos (inicial, final). 
         * @param tolerancia La tolerancia permitida para considerar cada ángulo como válido. 
         * @param angulosAdicionales Un diccionario con ángulos adicionales a verificar. 
         * @param toleranciaAdicional La tolerancia permitida para considerar los ángulos adicionales como válidos. 
         */
        this.nombre = nombre;
        this.angulosObjetivo = angulosObjetivo;
        this.tolerancia = tolerancia;
        this.angulosAdicionales = angulosAdicionales;
        this.toleranciaAdicional = toleranciaAdicional;
        this.stage = {};
        this.contador = 0;

        for (const puntos in angulosObjetivo) {
            this.stage[puntos] = null;
        }
    }

    calcularAngulo(puntos: [number, number, number], landmarks: Landmarks): number {
        /** 
         * Funcíon para calcular el ángulo entre tres puntos dados los landmarks. 
         * 
         * @param puntos Tupla de índices (start, mid, end) para calcular el ángulo. 
         * @param landmarks Los puntos de referencia proporcionados por MediaPipe. 
         * @return El ángulo calculado. 
         */
        const [start, mid, end] = this.extractCoordinates(landmarks, puntos);

        const a = [start[0], start[1]];
        const b = [mid[0], mid[1]];
        const c = [end[0], end[1]];

        const radians =
            Math.atan2(c[1] - b[1], c[0] - b[0]) -
            Math.atan2(a[1] - b[1], a[0] - b[0]);
        let angle = Math.abs((radians * 180.0) / Math.PI);

        if (angle > 180.0) {
            angle = 360.0 - angle;
        }

        return angle;
    }

    verificarEjercicio(landmarks: Landmarks): boolean {
        /** 
         * Verifica si todos los ángulos necesarios para el ejercicio están dentro de los márgenes de tolerancia, 
         * siguiendo la secuencia de etapas. 
         * 
         * @param landmarks Los puntos de referencia proporcionados por MediaPipe. 
         * @return True si se completa una repetición correctamente para todos los ángulos, False en caso contrario. 
         */
        let ejercicioCompletado = true;

        for (const puntos in this.angulosObjetivo) {
            const [anguloInicial, anguloFinal] = this.angulosObjetivo[puntos];
            const puntosParsed: [number, number, number] = puntos
                .split(",")
                .map(Number) as [number, number, number];
            const anguloActual = this.calcularAngulo(puntosParsed, landmarks);

            if (anguloActual >= anguloFinal - this.tolerancia) {
                this.stage[puntos] = "down";
            } else if (
                anguloActual <= anguloInicial + this.tolerancia &&
                this.stage[puntos] === "down"
            ) {
                this.stage[puntos] = "up";
            } else {
                ejercicioCompletado = false;
            }
        }

        if (
            ejercicioCompletado &&
            Object.values(this.stage).every((stage) => stage === "up")
        ) {
            this.contador++;
            return true;
        }

        return false;
    }

    verificarAnguloAdicional(
        puntos: [number, number, number],
        anguloObjetivo: number,
        landmarks: Landmarks
    ): boolean {
        /** 
         * Verifica si un ángulo adicional está dentro de la tolerancia permitida. 
         * 
         * @param puntos Tupla de índices (start, mid, end) para calcular el ángulo. 
         * @param anguloObjetivo El ángulo objetivo para verificar. 
         * @param landmarks Los puntos de referencia proporcionados por MediaPipe. 
         * @return True si el ángulo está dentro de la tolerancia, False en caso contrario. 
         */
        const anguloActual = this.calcularAngulo(puntos, landmarks);
        return Math.abs(anguloActual - anguloObjetivo) <= this.toleranciaAdicional;
    }

    extractCoordinates(
        landmarks: Landmarks,
        indices: [number, number, number]
    ): Array<[number, number]> {
        /** 
         * Funcíon auxiliar para extraer las coordenadas de los landmarks dados los índices. 
         * 
         * @param landmarks Los puntos de referencia proporcionados por MediaPipe. 
         * @param indices Tupla de índices para extraer las coordenadas (start, mid, end). 
         * @return Lista de tuplas con las coordenadas (x, y) de los puntos. 
         */
        return indices.map((i) => [landmarks[i].x, landmarks[i].y]);
    }
}

export default Ejercicio; 