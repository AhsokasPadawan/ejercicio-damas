import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generateBacktrackingSimulation } from './algorithm/backtrackingEngine';
import { ChessBoard } from './components/ChessBoard';
import { PlaybackControls } from './components/PlaybackControls';
import { TelemetryPanel } from './components/TelemetryPanel';
import { TreeGraphView } from './components/TreeGraphView';

export function App() {
  const [boardSize, setBoardSize] = useState<number>(4);
  const [simulationData, setSimulationData] = useState(() =>
    generateBacktrackingSimulation(4)
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeedMs, setPlaybackSpeedMs] = useState<number>(750);

  const playbackTimerRef = useRef<number | null>(null);

  const currentSnapshot = useMemo(() => {
    return (
      simulationData.snapshots[currentStepIndex] ||
      simulationData.snapshots[0]
    );
  }, [simulationData, currentStepIndex]);

  const totalSteps = simulationData.snapshots.length;

  function stopActivePlaybackTimer(): void {
    if (playbackTimerRef.current !== null) {
      window.clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    setIsPlaying(false);
  }

  function startPlaybackTimer(speedMs: number, initialStep: number): void {
    if (playbackTimerRef.current !== null) {
      window.clearInterval(playbackTimerRef.current);
    }

    setIsPlaying(true);

    let nextStep = initialStep;
    playbackTimerRef.current = window.setInterval(() => {
      nextStep += 1;

      if (nextStep >= simulationData.snapshots.length - 1) {
        setCurrentStepIndex(simulationData.snapshots.length - 1);
        stopActivePlaybackTimer();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        return;
      }

      setCurrentStepIndex(nextStep);
    }, speedMs);
  }

  function handleBoardSizeChange(newBoardSize: number): void {
    stopActivePlaybackTimer();
    const newSimulation = generateBacktrackingSimulation(newBoardSize);
    setBoardSize(newBoardSize);
    setSimulationData(newSimulation);
    setCurrentStepIndex(0);
  }

  function handlePlayToggle(): void {
    if (isPlaying) {
      stopActivePlaybackTimer();
      return;
    }

    const startingStep =
      currentStepIndex >= totalSteps - 1 ? 0 : currentStepIndex;

    setCurrentStepIndex(startingStep);
    startPlaybackTimer(playbackSpeedMs, startingStep);
  }

  function handleStepForward(): void {
    stopActivePlaybackTimer();
    if (currentStepIndex < totalSteps - 1) {
      const targetStep = currentStepIndex + 1;
      setCurrentStepIndex(targetStep);
      if (targetStep === totalSteps - 1) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }
  }

  function handleStepBackward(): void {
    stopActivePlaybackTimer();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }

  function handleReset(): void {
    stopActivePlaybackTimer();
    setCurrentStepIndex(0);
  }

  function handleJumpToSolution(): void {
    stopActivePlaybackTimer();
    const solutionStepIndex = totalSteps - 1;
    setCurrentStepIndex(solutionStepIndex);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function handleScrubberChange(targetStepIndex: number): void {
    stopActivePlaybackTimer();
    const clampedIndex = Math.max(0, Math.min(targetStepIndex, totalSteps - 1));
    setCurrentStepIndex(clampedIndex);
    if (clampedIndex === totalSteps - 1) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }

  function handleSpeedChange(newSpeedMs: number): void {
    setPlaybackSpeedMs(newSpeedMs);
    if (isPlaying) {
      startPlaybackTimer(newSpeedMs, currentStepIndex);
    }
  }

  function handleTreeNodeClick(nodeId: string): void {
    stopActivePlaybackTimer();
    const matchingSnapshotIndex = simulationData.snapshots.findIndex(
      (snapshot) => snapshot.currentNodeId === nodeId
    );

    if (matchingSnapshotIndex !== -1) {
      setCurrentStepIndex(matchingSnapshotIndex);
    }
  }

  useEffect(() => {
    return () => {
      if (playbackTimerRef.current !== null) {
        window.clearInterval(playbackTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Demostración de Backtracking: Problema de las N-Damas
            </h1>
            <p className="text-xs text-slate-400">
              Visualización interactiva del árbol de estados, podas por conflicto y amenazas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Primera solución garantizada
          </span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden">
        <section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1">
          <PlaybackControls
            boardSize={boardSize}
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            playbackSpeedMs={playbackSpeedMs}
            onBoardSizeChange={handleBoardSizeChange}
            onPlayToggle={handlePlayToggle}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onJumpToSolution={handleJumpToSolution}
            onScrubberChange={handleScrubberChange}
            onSpeedChange={handleSpeedChange}
          />

          <ChessBoard
            boardSize={boardSize}
            placedQueens={currentSnapshot.placedQueens}
            candidateQueen={currentSnapshot.candidateQueen}
            threatenedCoordinates={currentSnapshot.threatenedCoordinates}
            conflictCoordinate={currentSnapshot.conflictCoordinate}
          />

          <TelemetryPanel currentSnapshot={currentSnapshot} />
        </section>

        <section className="lg:col-span-7 xl:col-span-8 h-full flex flex-col">
          <TreeGraphView
            allTreeNodes={simulationData.allTreeNodes}
            allTreeEdges={simulationData.allTreeEdges}
            visibleNodeIds={currentSnapshot.visibleNodeIds}
            visibleEdgeIds={currentSnapshot.visibleEdgeIds}
            currentNodeId={currentSnapshot.currentNodeId}
            nodeStatusMap={currentSnapshot.nodeStatusMap}
            onNodeClick={handleTreeNodeClick}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
