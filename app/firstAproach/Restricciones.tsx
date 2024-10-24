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


// Restricción: Alineación de la espalda (Postura recta)
export class AlineacionEspalda extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // Consideramos puntos clave para evaluar la alineación de la espalda:
        // 11 - hombro izquierdo, 23 - cadera izquierda, 25 - rodilla izquierda
        const anguloEspaldaIzquierda = this.calcularAngulo(puntos['11'], puntos['23'], puntos['25']);

        // Para una buena alineación, el ángulo de la espalda debería estar entre 150 y 180 grados
        if (anguloEspaldaIzquierda < 150 || anguloEspaldaIzquierda > 180) {
            puntosMal.push('11', '23', '25'); // Señala hombro, cadera y rodilla
        }

        // Repetimos para el lado derecho
        // 12 - hombro derecho, 24 - cadera derecha, 26 - rodilla derecha
        const anguloEspaldaDerecha = this.calcularAngulo(puntos['12'], puntos['24'], puntos['26']);

        if (anguloEspaldaDerecha < 150 || anguloEspaldaDerecha > 180) {
            puntosMal.push('12', '24', '26'); // Señala hombro, cadera y rodilla
        }

        return { puntosMal };
    }
}


// Restricción: Apertura de los codos (Curl de barra)
export class AperturaCodosCurlBarra extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];
        const anguloCodoIzquierdo = this.calcularAngulo(puntos['13'], puntos['11'], puntos['23']); 
        const anguloCodoDerecho = this.calcularAngulo(puntos['14'], puntos['12'], puntos['24']); 

        // Para un curl de barra, el ángulo del codo debería estar entre 30 y 150 grados
        if (anguloCodoIzquierdo < 5 || anguloCodoIzquierdo > 20) {
            puntosMal.push('13'); // left elbow
        }
        if (anguloCodoDerecho < 5 || anguloCodoDerecho > 20) {
            puntosMal.push('14'); // right elbow
        }

        return { puntosMal };
    }
}

// Restricción: Alineación de los pies con los hombros
export class AlineacionPiesHombros extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // Verificar alineación de los pies con los hombros
        // 27 - pie izquierdo, 28 - pie derecho, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.05; // 5% de tolerancia

        const posicionHombroIzquierdo = puntos['11'].x;
        const posicionHombroDerecho = puntos['12'].x;
        const posicionPieIzquierdo = puntos['27'].x;
        const posicionPieDerecho = puntos['28'].x;

        // Verificamos que la posición del pie izquierdo no se aleje más del 20% de la posición del hombro izquierdo
        if (
            posicionPieIzquierdo < posicionHombroIzquierdo * (1 - rangoPermitido) ||
            posicionPieIzquierdo > posicionHombroIzquierdo * (1 + rangoPermitido)
        ) {
            puntosMal.push('27'); // Señala pie izquierdo y hombro izquierdo
        }

        // Verificamos que la posición del pie derecho no se aleje más del 20% de la posición del hombro derecho
        if (
            posicionPieDerecho < posicionHombroDerecho * (1 - rangoPermitido) ||
            posicionPieDerecho > posicionHombroDerecho * (1 + rangoPermitido)
        ) {
            puntosMal.push('28'); // Señala pie derecho y hombro derecho
        }

        return { puntosMal };
    }
}

// Restricción: Alineación de las manos con los hombros
export class AlineacionManosHombros extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // Verificar alineación de las manos con los hombros
        // 15 - mano izquierda, 16 - mano derecha, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.10; // 5% de tolerancia

        const posicionHombroIzquierdo = puntos['11'];
        const posicionHombroDerecho = puntos['12'];
        const posicionManoIzquierda = puntos['15'];
        const posicionManoDerecha = puntos['16'];

        // Verificamos que la posición de la mano izquierda no se aleje más del 5% de la posición del hombro izquierdo
        if (
            posicionManoIzquierda.x < posicionHombroIzquierdo.x * (1 - rangoPermitido) ||
            posicionManoIzquierda.x > posicionHombroIzquierdo.x * (1 + rangoPermitido) ||
            posicionManoIzquierda.y < posicionHombroIzquierdo.y * (1 - rangoPermitido) ||
            posicionManoIzquierda.y > posicionHombroIzquierdo.y * (1 + rangoPermitido)
        ) {
            puntosMal.push('15'); // Señala mano izquierda
        }

        // Verificamos que la posición de la mano derecha no se aleje más del 5% de la posición del hombro derecho
        if (
            posicionManoDerecha.x < posicionHombroDerecho.x * (1 - rangoPermitido) ||
            posicionManoDerecha.x > posicionHombroDerecho.x * (1 + rangoPermitido) ||
            posicionManoDerecha.y < posicionHombroDerecho.y * (1 - rangoPermitido) ||
            posicionManoDerecha.y > posicionHombroDerecho.y * (1 + rangoPermitido)
        ) {
            puntosMal.push('16'); // Señala mano derecha
        }

        return { puntosMal };
    }
}

// Restricción: Distancia entre pies en relación con hombros
export class DistanciaPiesHombros extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 27 - pie izquierdo, 28 - pie derecho, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.2; // 20% de tolerancia

        const distanciaHombros = this.medirDistancia2D(puntos['11'], puntos['12']);
        const distanciaPies = this.medirDistancia2D(puntos['27'], puntos['28']);

        // Verificamos que la distancia entre los pies esté dentro del 20% de la distancia entre los hombros
        const minDistancia = distanciaHombros * (1 - rangoPermitido);
        const maxDistancia = distanciaHombros * (1 + rangoPermitido);

        if (distanciaPies < minDistancia || distanciaPies > maxDistancia) {
            puntosMal.push('27', '28'); // Señala ambos pies
        }

        return { puntosMal };
    }
}

// Restricción: Alineación de los codos con los hombros en el eje X
export class AlineacionCodosHombrosX extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 13 - codo izquierdo, 14 - codo derecho, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.03; // 3% de tolerancia

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

