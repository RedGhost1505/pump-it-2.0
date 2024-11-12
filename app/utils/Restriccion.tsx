// Archivo: Restricciones.ts
export interface Restriccion {
    verificar(puntos: Pose): Resultado;
}

export interface Pose {
    [key: string]: { x: number; y: number; z: number };
}

export interface Resultado {
    puntosMal: string[];
}

// Clase base con métodos comunes
export abstract class RestriccionPostura implements Restriccion {
    abstract verificar(puntos: Pose): Resultado;

    protected calcularAngulo(p1: { x: number; y: number; z: number }, p2: { x: number; y: number; z: number }, p3: { x: number; y: number; z: number }): number {
        const angulo = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
        return Math.abs(angulo * (180 / Math.PI));
    }

    protected medirDistancia(p1: { x: number; y: number; z: number }, p2: { x: number; y: number; z: number }): number {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) +
            Math.pow(p2.y - p1.y, 2) +
            Math.pow(p2.z - p1.z, 2)
        );
    }

    protected medirDistancia2D(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) +
            Math.pow(p2.y - p1.y, 2)
        );
    }
}


// Clase para verificar todas las restricciones
export class VerificadorRestricciones {
    private restricciones: Restriccion[];

    constructor(restricciones: Restriccion[]) {
        this.restricciones = restricciones;
    }

    verificarPostura(puntos: Pose): { puntosMal: string[]; frecuenciaErrores: { [key: string]: number } } {
        let puntosMal: string[] = [];
        const frecuenciaErrores: { [key: string]: number } = {};

        this.restricciones.forEach((restriccion) => {
            const resultado = restriccion.verificar(puntos);
            puntosMal = puntosMal.concat(resultado.puntosMal);
        });

        puntosMal.forEach((punto) => {
            frecuenciaErrores[punto] = (frecuenciaErrores[punto] || 0) + 1;
        });

        return { puntosMal, frecuenciaErrores };
    }
}

// Restricción: Alineación de los codos con los hombros en el eje X
export class AlineacionCodosHombrosX extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 13 - codo izquierdo, 14 - codo derecho, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.10; // 3% de tolerancia

        const posicionHombroIzquierdoX = puntos['11'].x;
        const posicionHombroDerechoX = puntos['12'].x;
        const posicionCodoIzquierdoX = puntos['13'].x;
        const posicionCodoDerechoX = puntos['14'].x;

        // Verificamos que la posición del codo izquierdo esté dentro del 10% de la posición del hombro izquierdo
        if (
            posicionCodoIzquierdoX < posicionHombroIzquierdoX * (1 - rangoPermitido) ||
            posicionCodoIzquierdoX > posicionHombroIzquierdoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('13'); // Señala codo izquierdo
        }

        // Verificamos que la posición del codo derecho esté dentro del 10% de la posición del hombro derecho
        if (
            posicionCodoDerechoX < posicionHombroDerechoX * (1 - rangoPermitido) ||
            posicionCodoDerechoX > posicionHombroDerechoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('14'); // Señala codo derecho
        }

        return { puntosMal };
    }
}