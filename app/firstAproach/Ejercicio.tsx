export type Landmarks = Array<{ x: number; y: number }>;

export type AnguloObjetivo = {
    [key: string]: [number, number];
};

export class Ejercicio {
    nombre: string;
    angulosObjetivo: AnguloObjetivo;
    tolerancia: number;
    stage: { [key: string]: string | null };
    contador: number;

    constructor(
        nombre: string,
        angulosObjetivo: AnguloObjetivo,
        tolerancia: number = 10.0
    ) {
        this.nombre = nombre;
        this.angulosObjetivo = angulosObjetivo;
        this.tolerancia = tolerancia;
        this.stage = {};
        this.contador = 0;

        for (const puntos in angulosObjetivo) {
            this.stage[puntos] = null;
        }
    }

    calcularAngulo(puntos: [number, number, number], landmarks: Landmarks): number {
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

    extractCoordinates(
        landmarks: Landmarks,
        indices: [number, number, number]
    ): Array<[number, number]> {
        return indices.map((i) => [landmarks[i].x, landmarks[i].y]);
    }
}