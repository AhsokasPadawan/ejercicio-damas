import { BoardCoordinate } from '../types/backtracking';
import { QueenIcon } from './QueenIcon';

interface ChessBoardProps {
  boardSize: number;
  placedQueens: BoardCoordinate[];
  candidateQueen: BoardCoordinate | null;
  threatenedCoordinates: BoardCoordinate[];
  conflictCoordinate: BoardCoordinate | null;
}

export function ChessBoard({
  boardSize,
  placedQueens,
  candidateQueen,
  threatenedCoordinates,
  conflictCoordinate,
}: ChessBoardProps) {
  const placedQueensCoordinateMap = new Map<string, BoardCoordinate>();
  for (const queen of placedQueens) {
    placedQueensCoordinateMap.set(`${queen.row},${queen.col}`, queen);
  }

  const threatenedCoordinatesKeySet = new Set<string>();
  for (const coordinate of threatenedCoordinates) {
    threatenedCoordinatesKeySet.add(`${coordinate.row},${coordinate.col}`);
  }

  const candidateCoordinateKey = candidateQueen
    ? `${candidateQueen.row},${candidateQueen.col}`
    : null;

  const conflictCoordinateKey = conflictCoordinate
    ? `${conflictCoordinate.row},${conflictCoordinate.col}`
    : null;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md">
      <div className="flex mb-1 pl-6">
        {Array.from({ length: boardSize }).map((_, columnIndex) => (
          <div
            key={`col-header-${columnIndex}`}
            className="w-12 sm:w-14 md:w-16 text-center text-xs font-semibold text-slate-400 font-mono"
          >
            {columnIndex + 1}
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="flex flex-col justify-around pr-2 text-xs font-semibold text-slate-400 font-mono">
          {Array.from({ length: boardSize }).map((_, rowIndex) => (
            <div
              key={`row-header-${rowIndex}`}
              className="h-12 sm:h-14 md:h-16 flex items-center justify-center"
            >
              {rowIndex + 1}
            </div>
          ))}
        </div>

        <div
          className="grid border-2 border-slate-700/80 rounded-xl overflow-hidden shadow-inner bg-slate-950"
          style={{
            gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: boardSize }).map((_, rowIndex) =>
            Array.from({ length: boardSize }).map((_, columnIndex) => {
              const coordinateKey = `${rowIndex},${columnIndex}`;
              const isDarkSquare = (rowIndex + columnIndex) % 2 === 1;

              const isPlacedQueenHere = placedQueensCoordinateMap.has(coordinateKey);
              const isCandidateQueenHere = candidateCoordinateKey === coordinateKey;
              const isThreatenedSquare = threatenedCoordinatesKeySet.has(coordinateKey);
              const isConflictQueenHere = conflictCoordinateKey === coordinateKey;

              const squareBackgroundColor = isDarkSquare
                ? 'bg-slate-800/80'
                : 'bg-slate-700/40';

              return (
                <div
                  key={coordinateKey}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-colors duration-200 ${squareBackgroundColor} ${
                    isConflictQueenHere
                      ? 'ring-2 ring-inset ring-rose-500 bg-rose-950/40'
                      : ''
                  }`}
                >
                  {isThreatenedSquare && !isPlacedQueenHere && !isCandidateQueenHere && (
                    <div
                      className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.7)] animate-pulse"
                      title={`Amenazada: (${rowIndex + 1}, ${columnIndex + 1})`}
                    />
                  )}

                  {isPlacedQueenHere && (
                    <div className="transform hover:scale-110 transition-transform duration-150 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                      <QueenIcon
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11"
                        isConflict={isConflictQueenHere}
                      />
                    </div>
                  )}

                  {isCandidateQueenHere && (
                    <div
                      className={`animate-bounce transform drop-shadow-[0_0_12px_rgba(244,63,94,0.8)] ${
                        conflictCoordinate
                          ? 'ring-4 ring-rose-500 rounded-lg p-0.5 bg-rose-900/60'
                          : 'ring-2 ring-amber-400 rounded-lg p-0.5 bg-amber-900/40'
                      }`}
                    >
                      <QueenIcon
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11"
                        isConflict={conflictCoordinate !== null}
                      />
                    </div>
                  )}

                  <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-slate-500/40 select-none">
                    {rowIndex + 1},{columnIndex + 1}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
