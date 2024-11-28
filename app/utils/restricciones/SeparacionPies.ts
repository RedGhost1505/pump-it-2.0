import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Clase para verificar la separación de los pies
export class SeparacionPies extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 27 - tobillo izquierdo, 28 - tobillo derecho
        const distanciaMinima = 0.10; // Distancia mínima permitida entre los tobillos (en unidades normalizadas)
        const distanciaMaxima = 0.50; // Distancia máxima permitida entre los tobillos

        const distanciaTobillos = this.medirDistancia2D(
            { x: puntos['27'].x, y: puntos['27'].y },
            { x: puntos['28'].x, y: puntos['28'].y }
        );

        if (distanciaTobillos < distanciaMinima || distanciaTobillos > distanciaMaxima) {
            puntosMal.push('27', '28'); // Señala tobillo izquierdo y derecho
        }

        return { puntosMal };
    }
}
