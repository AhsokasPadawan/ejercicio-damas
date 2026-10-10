# ADR 0005: Representación visual de casillas amenazadas y detección de conflictos

## Estado
Aceptado

## Contexto
El algoritmo de backtracking para el problema de las $N$-Damas evalúa si cada casilla tentativa es segura antes de fijar una dama. En una representación didáctica, es esencial que el usuario no solo vea dónde están las damas ya fijadas, sino también el mapa completo de influencia (casillas amenazadas en filas, columnas y diagonales) y qué ocurre cuando se intenta una posición inválida que conduce a una poda.

## Decisión
Se implementará el siguiente esquema visual en el tablero principal y en los mini-tableros del árbol:
1. **Casillas amenazadas**: Cada casilla bajo la línea de ataque (horizontal, vertical o diagonal) de una o más damas consolidadas mostrará un punto circular sutil y centrado (en tono carmesí/ámbar translúcido) que indica que dicha casilla no es apta para colocar otra dama.
2. **Damas consolidadas**: Representadas con el icono de la reina en estado sólido/firme.
3. **Dama candidata en evaluación**: Cuando el algoritmo prueba una casilla:
   - Si la casilla está amenazada, la dama candidata se muestra con un estilo de advertencia/conflicto (halo o borde rojizo resaltado) evidenciando el motivo inmediato de la poda antes del retroceso.
   - Si la casilla es segura, la dama se consolida y se actualiza el mapa de puntos de amenaza para el siguiente nivel.

## Consecuencias
- Proporciona retroalimentación visual inmediata sobre las restricciones del problema sin sobrecargar el tablero.
- Permite al usuario comprender de un vistazo por qué el algoritmo descarta ciertas ramas del árbol sin necesidad de cálculo mental auxiliar.
