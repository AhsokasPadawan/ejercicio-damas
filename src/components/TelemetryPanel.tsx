import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Compass,
  CornerUpLeft,
  Info,
} from 'lucide-react';
import { AlgorithmSnapshot, StepActionType } from '../types/backtracking';

interface TelemetryPanelProps {
  currentSnapshot: AlgorithmSnapshot;
}

interface ActionBadgeConfiguration {
  badgeColor: string;
  icon: typeof Info;
  actionLabel: string;
}

const ACTION_CONFIG_LOOKUP: Record<StepActionType, ActionBadgeConfiguration> = {
  INITIAL: {
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Compass,
    actionLabel: 'Inicio',
  },
  TRY_PLACE: {
    badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    icon: Compass,
    actionLabel: 'Evaluando',
  },
  PRUNED_CONFLICT: {
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
    icon: AlertTriangle,
    actionLabel: 'Poda',
  },
  CONFIRM_PLACE: {
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    icon: CheckCircle2,
    actionLabel: 'Confirmado',
  },
  BACKTRACK: {
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    icon: CornerUpLeft,
    actionLabel: 'Retroceso',
  },
  SOLUTION_FOUND: {
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    icon: Award,
    actionLabel: 'Solución',
  },
};

export function TelemetryPanel({ currentSnapshot }: TelemetryPanelProps) {
  const currentActionConfig =
    ACTION_CONFIG_LOOKUP[currentSnapshot.actionType] || ACTION_CONFIG_LOOKUP.INITIAL;
  const ActionIcon = currentActionConfig.icon;

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${currentActionConfig.badgeColor}`}
          >
            <ActionIcon className="w-3.5 h-3.5" />
            {currentActionConfig.actionLabel}
          </span>
          <h3 className="text-sm font-bold text-slate-200">
            {currentSnapshot.descriptionTitle}
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Profundidad: {currentSnapshot.depth} / {currentSnapshot.boardSize}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[40px] bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        {currentSnapshot.descriptionDetail}
      </p>

      <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
        <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
            Podas
          </span>
          <span className="text-base font-bold text-rose-400">
            {currentSnapshot.pruneCount}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
            Nodos en Árbol
          </span>
          <span className="text-base font-bold text-sky-400">
            {currentSnapshot.visibleNodeIds.length}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
            Damas Puestas
          </span>
          <span className="text-base font-bold text-emerald-400">
            {currentSnapshot.placedQueens.length} / {currentSnapshot.boardSize}
          </span>
        </div>
      </div>
    </div>
  );
}
