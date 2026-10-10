import { BoardCoordinate } from '../types/backtracking';
import { QueenIcon } from './QueenIcon';

interface MiniBoardProps {
  boardSize: number;
  placedQueens: BoardCoordinate[];
  candidateQueen: BoardCoordinate | null;
  threatenedCoordinates: BoardCoordinate[];
}

export function MiniBoard({
  boardSize,
  placedQueens,
  candidateQueen,
  threatenedCoordinates,
}: MiniBoardProps) {
  const placedCoordinateSet = new Set(
    placedQueens.map((queen) => `${queen.row},${queen.col}`)
  );
  const threatenedCoordinateSet = new Set(
    threatenedCoordinates.map((coordinate) => `${coordinate.row},${coordinate.col}`)
  );
  const candidateCoordinateKey = candidateQueen
    ? `${candidateQueen.row},${candidateQueen.col}`
    : null;

  return (
    <div
      className="grid border border-slate-700 rounded overflow-hidden shadow bg-slate-950 w-24 h-24"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: boardSize }).map((_, rowIndex) =>
        Array.from({ length: boardSize }).map((_, columnIndex) => {
          const coordinateKey = `${rowIndex},${columnIndex}`;
          const isDarkSquare = (rowIndex + columnIndex) % 2 === 1;

          const isPlacedQueen = placedCoordinateSet.has(coordinateKey);
          const isCandidateQueen = candidateCoordinateKey === coordinateKey;
          const isThreatened = threatenedCoordinateSet.has(coordinateKey);

          const cellBg = isDarkSquare ? 'bg-slate-800' : 'bg-slate-700/60';

          return (
            <div
              key={coordinateKey}
              className={`relative flex items-center justify-center ${cellBg}`}
            >
              {isThreatened && !isPlacedQueen && !isCandidateQueen && (
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
              )}

              {isPlacedQueen && (
                <QueenIcon className="w-3.5 h-3.5" />
              )}

              {isCandidateQueen && (
                <div className="w-3.5 h-3.5 flex items-center justify-center ring-1 ring-amber-400 rounded-sm">
                  <QueenIcon className="w-3 h-3" isConflict={false} />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
