# Glosario del Proyecto: Visualizador de Backtracking (N-Damas)

Definiciones formales y vocabulario canónico del proyecto de visualización algorítmica.

## Términos

**Problema de las N-Damas (N-Queens)**:
Problema de optimización combinatoria y búsqueda que consiste en posicionar $N$ damas en un tablero de ajedrez de $N \times N$ casillas sin que ninguna dama amenace a otra (en su misma fila, columna o diagonal).
_Evitar_: Juego de damas, problema de ajedrez genérico.

**Backtracking (Búsqueda con Retroceso)**:
Estrategia algorítmica sistemática basada en recursión o pila que explora exhaustivamente el espacio de soluciones construyendo candidatos paso a paso y abandonando ("retrocediendo") inmediatamente una rama en cuanto se detecta que no puede conducir a una solución válida.
_Evitar_: Fuerza bruta pura, ensayo y error ciego.

**Poda (Pruning)**:
Descarte temprano de una rama del árbol de búsqueda en el momento en que una restricción se viola (por ejemplo, intentar colocar una dama en una casilla ya amenazada).
_Evitar_: Descarte tardío, fallo silencioso.

**Árbol de Soluciones / Árbol de Estados**:
Representación jerárquica en forma de árbol donde la raíz representa el tablero vacío, cada nivel corresponde a una fila (o intento de dama), cada arista representa una decisión de colocación y las hojas son soluciones válidas o podas por conflicto.
_Evitar_: Grafo cíclico, lista plana.

**Casilla Amenazada**:
Casilla del tablero que se encuentra bajo la línea de ataque (horizontal, vertical o diagonal) de una o más damas ya posicionadas.
_Evitar_: Casilla ocupada (la casilla puede estar libre pero no ser segura).

**Paso / Snapshot**:
Instantánea inmutable del estado del algoritmo en un momento temporal concreto, que contiene la configuración actual del tablero, las casillas amenazadas, el nodo actual en el árbol y la acción realizada (intento, poda, retroceso o solución encontrada).
_Evitar_: Mutación directa de estado.
