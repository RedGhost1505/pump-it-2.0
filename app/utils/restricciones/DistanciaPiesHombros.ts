import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

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