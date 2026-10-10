# ADR 0003: Rango de valores permitido para N

## Estado
Aceptado

## Contexto
El problema de las $N$-Damas no tiene solución para $N=2$ ni $N=3$. El caso clásico comienza en $N=4$ (el tablero más pequeño no trivial con solución) y se extiende comúnmente hasta $N=8$ (tablero estándar de ajedrez). Para propósitos didácticos y de demostración fluida en el navegador, se requiere establecer un rango de configuración de entrada razonable.

## Decisión
Se implementará un selector interactivo que admita valores de $N$ entre **4 y 8** (inclusive), con un valor inicial por defecto fijado en **$N=4$**.

## Consecuencias
- Se asegura que cada instancia ejecutada tenga al menos una solución garantizada accesible.
- Se mantiene acotada la cantidad máxima de nodos generados en el árbol (el camino hasta la primera solución en $N=8$ toma aproximadamente 114 pasos de evaluación), preservando un rendimiento óptimo de renderizado en React.
- Facilita la comparación pedagógica del incremento del espacio de búsqueda a medida que $N$ aumenta.
