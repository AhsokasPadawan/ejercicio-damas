# ADR 0002: Alcance de la búsqueda limitado a la primera solución

## Estado
Aceptado

## Contexto
El problema de las $N$-Damas puede resolverse buscando una única solución válida o buscando exhaustivamente todas las soluciones existentes. La búsqueda exhaustiva para valores crecientes de $N$ incrementa sustancialmente el número de nodos explorados y retrocesos, lo que puede sobrecargar la visualización pedagógica cuando el objetivo central es ilustrar la mecánica del backtracking (colocación, poda ante amenaza, retroceso y éxito).

## Decisión
El algoritmo detendrá la exploración y la generación de nuevos nodos del árbol de búsqueda en el instante en que se encuentre la **primera solución válida** completa (es decir, cuando se hayan colocado con éxito las $N$ damas sin amenazas mutuas).

## Consecuencias
- El árbol de búsqueda y la secuencia de animación representarán exclusivamente el camino exploratorio hasta alcanzar la primera solución.
- Se optimiza el tiempo de cálculo y el espacio visual ocupado por el árbol jerárquico.
- La condición de terminación del algoritmo es el hallazgo del primer estado hoja con $N$ damas colocadas.
