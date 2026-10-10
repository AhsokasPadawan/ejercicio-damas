import {
  Award,
  ChevronLeft,
  ChevronRight,
  FastForward,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { ChangeEvent } from 'react';

interface PlaybackControlsProps {
  boardSize: number;
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeedMs: number;
  onBoardSizeChange: (newBoardSize: number) => void;
  onPlayToggle: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onJumpToSolution: () => void;
  onScrubberChange: (targetStepIndex: number) => void;
  onSpeedChange: (newSpeedMs: number) => void;
}

const AVAILABLE_BOARD_SIZES = [4, 5, 6, 7, 8];

export function PlaybackControls({
  boardSize,
  currentStepIndex,
  totalSteps,
  isPlaying,
  playbackSpeedMs,
  onBoardSizeChange,
  onPlayToggle,
  onStepForward,
  onStepBackward,
  onReset,
  onJumpToSolution,
  onScrubberChange,
  onSpeedChange,
}: PlaybackControlsProps) {
  const isAtFirstStep = currentStepIndex <= 0;
  const isAtLastStep = currentStepIndex >= totalSteps - 1;

  function handleScrubberInput(event: ChangeEvent<HTMLInputElement>): void {
    const parsedStep = parseInt(event.target.value, 10);
    onScrubberChange(parsedStep);
  }

  function handleSpeedInput(event: ChangeEvent<HTMLInputElement>): void {
    const parsedSpeed = parseInt(event.target.value, 10);
    onSpeedChange(parsedSpeed);
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Tamaño N:
          </span>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            {AVAILABLE_BOARD_SIZES.map((sizeValue) => {
              const isSelected = sizeValue === boardSize;
              return (
                <button
                  key={`size-btn-${sizeValue}`}
                  onClick={() => onBoardSizeChange(sizeValue)}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {sizeValue}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Paso:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold border border-slate-700">
            {currentStepIndex + 1} / {totalSteps}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>Progreso</span>
          <span>
            {Math.round(((currentStepIndex + 1) / Math.max(1, totalSteps)) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={handleScrubberInput}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            title="Reiniciar al inicio"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onStepBackward}
            disabled={isAtFirstStep || isPlaying}
            title="Paso anterior (-1)"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onPlayToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Reproducir
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={isAtLastStep || isPlaying}
            title="Paso siguiente (+1)"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onJumpToSolution}
            disabled={isAtLastStep}
            title="Saltar a la solución"
            className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/80 border border-emerald-800 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Solución</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto text-xs text-slate-400">
          <span className="font-mono text-[11px]">Velocidad:</span>
          <input
            type="range"
            min={100}
            max={1500}
            step={50}
            value={1600 - playbackSpeedMs}
            onChange={handleSpeedInput}
            className="w-20 sm:w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
