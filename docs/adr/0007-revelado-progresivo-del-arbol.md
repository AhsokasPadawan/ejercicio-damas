# ADR 0007: Revelado progresivo del árbol de decisiones durante la animación

## Estado
Aceptado

## Contexto
El objetivo central de la aplicación es permitir al usuario observar cómo se construye de forma dinámica el árbol de búsqueda y cómo opera la poda y el retroceso. Si el árbol completo se presentara visible desde el inicio, se perdería el impacto visual del proceso de descubrimiento algorítmico.

## Decisión
Se implementará un esquema de **revelado progresivo en vivo**:
1. Al iniciar o reiniciar la demostración (paso 0), el lienzo de React Flow contendrá únicamente el nodo raíz correspondiente al tablero vacío inicial.
2. En cada avance de la animación, el nuevo nodo evaluado se inserta en el grafo junto con su flecha conectora dirigida desde el nodo padre correspondiente.
3. El estado del nodo se actualizará según la acción algorítmica:
   - *Explorando / En evaluación*: Borde destacado activo.
   - *Podado (Pruned)*: Borde en tono carmesí/rojo al detectar conflicto de amenaza, indicando retroceso inminente.
   - *Solución alcanzada*: Borde en tono esmeralda/verde al completar satisfactoriamente las $N$ damas.
4. Si el usuario utiliza los controles de retroceso o el scrubber temporal, el subconjunto de nodos y aristas visibles en el árbol corresponderá exactamente a los generados hasta ese paso temporal.

## Consecuencias
- La representación refleja fielmente la evolución cronológica del algoritmo de backtracking.
- El usuario experimenta visualmente el concepto de expansión de frontera de búsqueda y retroceso al padre.
- Requiere que cada paso o snapshot contenga la lista de nodos y aristas revelados hasta ese momento temporal.
