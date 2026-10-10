# ADR 0009: Disposición en pantalla y tema visual en modo oscuro

## Estado
Aceptado

## Contexto
La aplicación se utilizará para exposiciones, clases y análisis minucioso de algoritmos. Se requiere una disposición ergonómica que permita ver simultáneamente el tablero en detalle y el árbol global, con una paleta cromática de alto contraste que resalte amenazas, retrocesos y soluciones.

## Decisión
Se implementará una **disposición en dos columnas en Modo Oscuro (Dark Theme)**:
1. **Columna Izquierda (Panel de Control y Tablero)**:
   - Cabecera con selector de $N$ ($4 \le N \le 8$).
   - Barra de control de reproducción (Play/Pausa, Step -/+, Scrubber, Velocidad, Reinicio).
   - Tablero principal interactivo de gran tamaño con damas vectoriales y puntos de amenaza translúcidos de alto contraste.
   - Panel de estado y telemetría explicativo en lenguaje natural con métricas en tiempo real.
2. **Columna Derecha (Lienzo interactivo del Árbol)**:
   - Lienzo expansivo de React Flow para visualizar la construcción jerárquica del árbol de estados.
   - Nodos personalizados (*mini-tableros*) con etiquetas de nivel y estado.
   - Flechas dirigidas coloreadas según el estado (activo, podado, solución).
   - Minimapa y controles de zoom y centrado.
3. **Paleta cromática**:
   - Fondo: Tonos oscuros de `slate-900`/`slate-950`.
   - Amenazas: Rojo carmesí / ámbar de alta visibilidad.
   - Solución: Verde esmeralda brillante.
   - Casillas del tablero: Contraste optimizado para no interferir con las marcas de amenaza.

## Consecuencias
- Excelente legibilidad en monitores y proyectores.
- La pantalla no requiere desplazamientos verticales excesivos; ambos focos de atención están visibles al mismo tiempo.
