export type Landmarks = Array<{ x: number; y: number }>;

export type AnguloObjetivo = {
    [key: string]: [number, number];
};

// Clase para representar un movimiento de ejercicio, que contiene el nombre, los ángulos objetivo, la tolerancia y el estado de los movimientos
export class Movimiento {
    nombre: string;
    angulosObjetivo: AnguloObjetivo;
    tolerancia: number;
    stage: { [key: string]: EstadoStage };
    contador: number;

    // Constructor para inicializar la clase Movimientos
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

        // Inicializar el estado de cada ángulo como NULL
        for (const puntos in angulosObjetivo) {
            this.stage[puntos] = EstadoStage.NULL;
        }
    }

    // Función para calcular el ángulo entre tres puntos dados (start, mid, end)
    calcularAngulo(puntos: [number, number, number], landmarks: Landmarks): number {
        const [start, mid, end] = this.extractCoordinates(landmarks, puntos);

        const a = [start[0], start[1]];
        const b = [mid[0], mid[1]];
        const c = [end[0], end[1]];

        // Calcular el ángulo en radianes usando la función atan2 y luego convertirlo a grados
        const radians =
            Math.atan2(c[1] - b[1], c[0] - b[0]) -
            Math.atan2(a[1] - b[1], a[0] - b[0]);
        let angle = Math.abs((radians * 180.0) / Math.PI);

        // Ajustar el ángulo si es mayor a 180 grados
        if (angle > 180.0) {
            angle = 360.0 - angle;
        }

        return angle;
    }

    // Función para verificar si el ejercicio se ha completado correctamente
    verificarEjercicio(landmarks: Landmarks): boolean {
        let todosLosAngulosVerificados = true;

        // Verificar cada ángulo objetivo
        for (const puntos in this.angulosObjetivo) {
            const [anguloInicial, anguloFinal] = this.angulosObjetivo[puntos];
            const puntosIndices: [number, number, number] = puntos
                .split(",")
                .map(Number) as [number, number, number];
            const anguloActual = this.calcularAngulo(puntosIndices, landmarks);

            // Actualizar el estado del ángulo actual
            this.actualizarStage(puntos, anguloActual, anguloInicial, anguloFinal);

            // Si algún ángulo no está en el estado UP, el ejercicio no está completo
            if (this.stage[puntos] !== EstadoStage.UP) {
                todosLosAngulosVerificados = false;
            }
        }

        // Si todos los ángulos están en el estado UP, incrementar el contador y reiniciar los estados
        if (todosLosAngulosVerificados) {
            this.contador++;
            this.reiniciarStages();
            return true;
        }

        return false;
    }

    // Función para actualizar el estado del ángulo actual basado en el ángulo medido y los límites definidos
    actualizarStage(
        puntos: string,
        anguloActual: number,
        anguloInicial: number,
        anguloFinal: number
    ): void {
        // Si el ángulo actual es mayor o igual al ángulo final menos la tolerancia, el estado es DOWN
        if (anguloActual >= anguloFinal - this.tolerancia) {
            this.stage[puntos] = EstadoStage.DOWN;
        }
        // Si el ángulo actual es menor o igual al ángulo inicial más la tolerancia y el estado previo era DOWN, cambiar a UP
        else if (
            anguloActual <= anguloInicial + this.tolerancia &&
            this.stage[puntos] === EstadoStage.DOWN
        ) {
            this.stage[puntos] = EstadoStage.UP;
        }
    }

    // Función para reiniciar todos los estados de los ángulos a NULL
    reiniciarStages(): void {
        for (const puntos in this.stage) {
            this.stage[puntos] = EstadoStage.NULL;
        }
    }

    // Función para extraer las coordenadas (x, y) de los landmarks dados los índices proporcionados
    extractCoordinates(
        landmarks: Landmarks,
        indices: [number, number, number]
    ): Array<[number, number]> {
        return indices.map((i) => [landmarks[i].x, landmarks[i].y]);
    }
}

// Enumeración para representar el estado del movimiento de un ángulo
enum EstadoStage {
    NULL = "null",
    DOWN = "down",
    UP = "up",
}
