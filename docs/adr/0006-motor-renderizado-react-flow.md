# ADR 0006: Uso de React Flow (@xyflow/react) para el árbol interactivo de decisiones

## Estado
Aceptado

## Contexto
El árbol de soluciones del algoritmo de backtracking requiere representar una estructura jerárquica de nodos interconectados mediante flechas dirigidas. Cada nodo debe alojar un componente React personalizado (mini-tablero con estado de damas y amenazas), y el usuario debe poder explorar dicho árbol libremente mediante desplazamiento (pan), ampliación (zoom), navegación interactiva y seguimiento automático del nodo activo durante la animación.

## Decisión
Se adoptará **React Flow** (`@xyflow/react`) como motor de renderizado del grafo interactivo.
1. Se definirá un tipo de nodo personalizado (`BoardNode`) que renderizará el mini-tablero correspondiente al estado en ese punto del árbol.
2. Las aristas (edges) se representarán con marcadores de flecha dirigidos (`markerEnd: MarkerType.ArrowClosed`), con colores que distingan transiciones activas, caminos podados y el camino que conduce a la solución.
3. Se integrarán controles de vista (`Controls`), fondo de cuadrícula sutil (`Background`) y minimapa para facilitar la orientación espacial dentro de árboles más grandes ($N \ge 5$).

## Consecuencias
- Provee de fábrica capacidades de arrastre, paneo, zoom suave y accesibilidad.
- Permite vincular el clic sobre cualquier nodo para sincronizar el tablero principal de forma reactiva y sin fricciones.
- Se debe asegurar un diseño de layout jerárquico limpio (calculando las coordenadas de cada nodo en niveles por fila) para que las flechas no se superpongan indebidamente.
