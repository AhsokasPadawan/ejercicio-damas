# ADR 0004: Controles de animación e interactividad para la demostración

## Estado
Aceptado

## Contexto
El algoritmo de backtracking produce una serie de eventos discretos (intentos de colocación, detección de conflictos, podas y retrocesos). Para propósitos didácticos y de exposición analítica, los usuarios requieren inspeccionar la secuencia en diferentes momentos temporales, detenerse en puntos críticos y analizar por qué una decisión fue revertida.

## Decisión
Se implementará un conjunto completo de controles de reproducción y navegación temporal:
1. **Play / Pausa**: Iniciar o detener la reproducción continua automática.
2. **Paso a paso manual**:
   - Botón *Siguiente paso* (`+1`): Avanza exactamente una transición algorítmica.
   - Botón *Paso anterior* (`-1`): Retrocede al estado inmediatamente previo para inspeccionar la decisión anterior.
3. **Control deslizante de velocidad**: Slider para regular el intervalo de transición (por ejemplo, desde 1500 ms por paso para explicaciones pausadas hasta 100 ms para ejecuciones rápidas).
4. **Línea de tiempo interactiva (Timeline Scrubber)**: Barra de progreso que muestra el paso actual sobre el total de pasos generados, permitiendo saltar instantáneamente a cualquier momento del proceso.
5. **Reinicio y Salto a Solución**: Botones para reiniciar la visualización al paso 0 o avanzar directamente al estado de solución final.

## Consecuencias
- La arquitectura del reproductor debe manejar una máquina de estados de tiempo desacoplada, donde cada paso es indexable por un índice entero `currentStepIndex`.
- Al pausar o avanzar manualmente, los temporizadores automáticos se cancelan limpiamente.
- Cumple con la regla de diseño de eventos en React: las transiciones de pasos y pausas se disparan directamente en los manejadores de eventos.
