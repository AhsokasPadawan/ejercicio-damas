# Visualizador de Backtracking - Problema de las N-Damas

Aplicación interactiva desarrollada en React, TypeScript y Vite para demostrar y visualizar de forma pedagógica el algoritmo de backtracking para el problema de las $N$-Damas ($4 \le N \le 8$).

## Características Principales

- **Vista dual sincronizada**:
  - **Tablero principal**: Tablero en alta definición que visualiza las damas consolidadas, la dama candidata en evaluación y puntos circulares indicadores sobre todas las casillas amenazadas en horizontal, vertical y diagonales.
  - **Árbol de soluciones con React Flow**: Grafo interactivo en 2D que se construye progresivamente paso a paso, con mini-tableros en cada nodo conectados por flechas dirigidas y coloreadas según su estado (activo, podado, confirmado, solución).
- **Controles interactivos de reproducción**:
  - Play / Pausa para animación continua.
  - Paso siguiente (`+1`) y Paso anterior (`-1`).
  - Control deslizante de velocidad en milisegundos.
  - Línea de tiempo interactiva (scrubber) para saltar a cualquier momento del proceso.
  - Salto directo a la solución y reinicio.
- **Detección visual de conflictos**: Resaltado y advertencia en la dama candidata cuando colisiona con otra reina antes de podar la rama.
- **Panel didáctico de telemetría**: Explicación en lenguaje natural del paso actual, coordenadas evaluadas, motivo de conflicto y contadores en tiempo real (podas, nodos generados, profundidad de recursión).
- **Documentación de arquitectura**: Registro de Decisiones de Arquitectura (ADRs) en `docs/adr/` y Glosario de Dominio en `docs/GLOSSARY.md`.

## Ejecución Local

1. Instalar dependencias (ya instaladas):
   ```bash
   npm run dev
   ```
   *(En sistemas Windows con políticas de script de PowerShell restringidas, utilizar `npm.cmd run dev`).*

2. Abrir en el navegador la dirección local (por defecto `http://localhost:5173/`).
