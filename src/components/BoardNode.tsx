import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { BacktrackingNodeData, TreeNodeStatus } from '../types/backtracking';
import { MiniBoard } from './MiniBoard';

type CustomBoardNode = Node<BacktrackingNodeData, 'boardNode'>;

interface StatusVisualConfiguration {
  containerBorder: string;
  badgeClass: string;
  statusLabel: string;
}

const STATUS_VISUAL_LOOKUP: Record<TreeNodeStatus, StatusVisualConfiguration> = {
  ROOT: {
    containerBorder: 'border-slate-600 bg-slate-900/95',
    badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
    statusLabel: 'Raíz',
  },
  ACTIVE: {
    containerBorder: 'border-sky-400 bg-slate-900/95 ring-2 ring-sky-400/50 shadow-sky-500/20 shadow-lg',
    badgeClass: 'bg-sky-950 text-sky-200 border-sky-400',
    statusLabel: 'Evaluando',
  },
  PRUNED: {
    containerBorder: 'border-rose-500 bg-slate-900/95 shadow-rose-950/40 shadow-md',
    badgeClass: 'bg-rose-950 text-rose-300 border-rose-500',
    statusLabel: 'Podado',
  },
  CONFIRMED: {
    containerBorder: 'border-indigo-500 bg-slate-900/95 shadow-indigo-950/30 shadow-md',
    badgeClass: 'bg-indigo-950 text-indigo-300 border-indigo-500',
    statusLabel: 'Aceptado',
  },
  SOLUTION: {
    containerBorder: 'border-emerald-400 bg-emerald-950/60 ring-4 ring-emerald-400/40 shadow-emerald-500/30 shadow-xl',
    badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-400 font-bold',
    statusLabel: 'Solución',
  },
};

export function BoardNode({ data }: NodeProps<CustomBoardNode>) {
  const currentVisual = STATUS_VISUAL_LOOKUP[data.status] || STATUS_VISUAL_LOOKUP.ROOT;

  const nodeTitle =
    data.status === 'ROOT'
      ? 'Tablero Vacío'
      : `Fila ${data.depth}, Col ${data.columnAttempted + 1}`;

  return (
    <div
      className={`relative p-2.5 rounded-xl border-2 transition-all duration-200 flex flex-col items-center cursor-pointer select-none ${
        currentVisual.containerBorder
      } ${
        data.isCurrentlyActive
          ? 'ring-4 ring-amber-400 shadow-amber-400/40 scale-105 z-10'
          : 'hover:border-slate-400'
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5 !bg-slate-400 border border-slate-900"
      />

      <div className="flex items-center justify-between w-full mb-1.5 px-0.5 gap-2">
        <span className="text-[10px] font-mono font-medium text-slate-300 truncate max-w-[70px]">
          {nodeTitle}
        </span>
        <span
          className={`text-[9px] px-1.5 py-0.5 rounded-full border font-semibold ${currentVisual.badgeClass}`}
        >
          {currentVisual.statusLabel}
        </span>
      </div>

      <MiniBoard
        boardSize={data.boardSize}
        placedQueens={data.placedQueens}
        candidateQueen={data.candidateQueen}
        threatenedCoordinates={data.threatenedCoordinates}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5 h-2.5 !bg-slate-400 border border-slate-900"
      />
    </div>
  );
}
