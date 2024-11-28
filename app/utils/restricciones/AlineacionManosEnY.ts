import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Clase para verificar que las posiciones Y de las manos estén dentro de un rango de 0.05% entre sí
export class AlineacionManosEnY extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 15 - muñeca izquierda, 16 - muñeca derecha
        const rangoPermitido = 0.08; // 0.05% de tolerancia

        const posicionMunecaIzquierdaY = puntos['15'].y;
        const posicionMunecaDerechaY = puntos['16'].y;

        // Calculamos la diferencia relativa entre las posiciones Y de las muñecas
        const diferenciaRelativa = Math.abs(posicionMunecaIzquierdaY - posicionMunecaDerechaY) /
                                   Math.max(posicionMunecaIzquierdaY, posicionMunecaDerechaY);

        // Si la diferencia relativa excede el rango permitido, ambas muñecas están mal posicionadas
        if (diferenciaRelativa > rangoPermitido) {
            puntosMal.push('15'); // Señala muñeca izquierda
            puntosMal.push('16'); // Señala muñeca derecha
        }

        return { puntosMal };
    }
}
