# ADR 0001: Vista dual sincronizada para la visualización del Backtracking

## Estado
Aceptado

## Contexto
El algoritmo de backtracking para el problema de las $N$-Damas genera un espacio de estados en forma de árbol de búsqueda. Cada paso involucra la colocación de una dama, la verificación de restricciones (amenazas en filas, columnas y diagonales), y posibles retrocesos (backtracking) ante callejones sin salida o soluciones encontradas. Para propósitos pedagógicos, se requiere mostrar claramente tanto las amenazas locales en el tablero como la estructura global del árbol de decisiones.

## Decisión
Se implementará una **vista dual sincronizada**:
1. **Tablero principal destacado**: Muestra en gran escala y con alta nitidez la configuración actual del tablero, las damas posicionadas y los puntos indicadores en cada casilla amenazada.
2. **Árbol jerárquico interactivo**: Muestra la jerarquía de decisiones mediante nodos interconectados con flechas dirigidas. Cada nodo representa un estado (mini-tablero) con codificación visual de su estado (en exploración, podado/descartado o solución válida).
3. **Sincronización bidireccional**: Al reproducir la animación, el árbol resalta el nodo activo correspondiente al tablero principal; al interactuar o hacer clic en cualquier nodo del árbol, el tablero principal se actualiza automáticamente a ese estado.

## Consecuencias
- Facilita la comprensión tanto a nivel micro (análisis de conflictos en el tablero) como macro (estrategia de búsqueda y podas en el árbol).
- Requiere modelar el recorrido como una secuencia de instantáneas inmutables vinculadas a los identificadores de los nodos del árbol.
