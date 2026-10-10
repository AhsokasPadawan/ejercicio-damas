# ADR 0008: Panel didáctico de explicación y métricas algorítmicas

## Estado
Aceptado

## Contexto
En un entorno universitario o formativo de Análisis de Algoritmos, la visualización puramente gráfica se enriquece notablemente si se acompaña de una descripción semántica de la decisión tomada y de indicadores cuantitativos del esfuerzo de búsqueda del algoritmo de backtracking.

## Decisión
Se incorporará un **panel didáctico de telemetría y explicación**:
1. **Explicación contextual del paso actual**:
   - Tipo de evento (Intento de colocación, Detección de conflicto / Poda, Retroceso al nivel superior, Fijación exitosa de dama, Solución completada).
   - Detalle de la coordenada evaluada `(fila, columna)`.
   - Causa específica de la poda cuando corresponda (por ejemplo: *"Conflicto en diagonal con Dama en (0, 1)"*).
2. **Métricas en tiempo real**:
   - Contador de pasos: `Paso X de Y`.
   - Nivel / Profundidad actual de recursión: `Fila K de N`.
   - Total de podas (caminos inviables descartados hasta el momento).
   - Total de nodos generados en el árbol.

## Consecuencias
- Conecta directamente la representación visual con la fundamentación matemática y algorítmica de la poda de ramas.
- Cada snapshot del algoritmo debe contener un objeto con los metadatos explicativos (`actionType`, `description`, `conflictReason`, `pruneCount`, `depth`).
- La UI organizará este panel de forma clara y accesible junto al tablero principal y los controles.
