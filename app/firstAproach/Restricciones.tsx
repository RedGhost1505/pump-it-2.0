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
}

// Restricción: Alineación de pies y hombros
export class AlineacionPiesHombros extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];
        const distanciaPies = this.medirDistancia(puntos['28'], puntos['32']); // right ankle to right foot index
        const distanciaHombros = this.medirDistancia(puntos['11'], puntos['12']); // left shoulder to right shoulder

        if (Math.abs(distanciaPies - distanciaHombros) > 0.1) {
            puntosMal.push('28', '32');
        }

        return { puntosMal };
    }
}

// Restricción: Apertura de los codos (Curl de barra)
export class AperturaCodosCurlBarra extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];
        const anguloCodoIzquierdo = this.calcularAngulo(puntos['11'], puntos['13'], puntos['15']); // left shoulder, left elbow, left wrist
        const anguloCodoDerecho = this.calcularAngulo(puntos['12'], puntos['14'], puntos['16']); // right shoulder, right elbow, right wrist

        // Para un curl de barra, el ángulo del codo debería estar entre 30 y 150 grados
        if (anguloCodoIzquierdo < 30 || anguloCodoIzquierdo > 150) {
            puntosMal.push('13'); // left elbow
        }
        if (anguloCodoDerecho < 30 || anguloCodoDerecho > 150) {
            puntosMal.push('14'); // right elbow
        }

        return { puntosMal };
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