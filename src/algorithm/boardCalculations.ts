import { BoardCoordinate } from '../types/backtracking';

export function calculateThreatenedCoordinates(
  boardSize: number,
  placedQueens: BoardCoordinate[]
): BoardCoordinate[] {
  const threatenedCoordinatesList: BoardCoordinate[] = [];
  const threatenedCoordinateKeySet = new Set<string>();

  for (const queen of placedQueens) {
    threatenedCoordinateKeySet.add(`${queen.row},${queen.col}`);
  }

  for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
    for (let columnIndex = 0; columnIndex < boardSize; columnIndex++) {
      const coordinateKey = `${rowIndex},${columnIndex}`;

      if (threatenedCoordinateKeySet.has(coordinateKey)) {
        continue;
      }

      const isThreatenedByAnyQueen = placedQueens.some((queen) => {
        const isSameRow = queen.row === rowIndex;
        const isSameColumn = queen.col === columnIndex;
        const isSameDiagonal =
          Math.abs(queen.row - rowIndex) === Math.abs(queen.col - columnIndex);

        return isSameRow || isSameColumn || isSameDiagonal;
      });

      if (isThreatenedByAnyQueen) {
        threatenedCoordinatesList.push({
          row: rowIndex,
          col: columnIndex,
        });
      }
    }
  }

  return threatenedCoordinatesList;
}

export function findConflictingQueenCoordinate(
  candidateCoordinate: BoardCoordinate,
  placedQueens: BoardCoordinate[]
): BoardCoordinate | null {
  for (const existingQueen of placedQueens) {
    const isSameColumn = existingQueen.col === candidateCoordinate.col;
    const isSameDiagonal =
      Math.abs(existingQueen.row - candidateCoordinate.row) ===
      Math.abs(existingQueen.col - candidateCoordinate.col);

    if (isSameColumn || isSameDiagonal) {
      return existingQueen;
    }
  }

  return null;
}

export function buildConflictDescriptionText(
  candidateCoordinate: BoardCoordinate,
  conflictingQueen: BoardCoordinate
): string {
  const isSameColumn = conflictingQueen.col === candidateCoordinate.col;
  const conflictTypeLabel = isSameColumn ? 'columna' : 'diagonal';

  return `Conflicto en ${conflictTypeLabel} con Dama en (${conflictingQueen.row + 1}, ${conflictingQueen.col + 1})`;
}
