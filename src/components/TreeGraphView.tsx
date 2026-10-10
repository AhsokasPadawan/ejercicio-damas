import {
  Background,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Focus, Maximize2 } from 'lucide-react';
import { useMemo } from 'react';
import {
  BacktrackingNodeData,
  InternalTreeNode,
  TreeEdgeData,
  TreeNodeStatus,
} from '../types/backtracking';
import { BoardNode } from './BoardNode';

interface TreeGraphViewProps {
  allTreeNodes: Record<string, InternalTreeNode>;
  allTreeEdges: TreeEdgeData[];
  visibleNodeIds: string[];
  visibleEdgeIds: string[];
  currentNodeId: string;
  nodeStatusMap: Record<string, TreeNodeStatus>;
  onNodeClick: (nodeId: string) => void;
}

const EDGE_COLOR_LOOKUP: Record<TreeNodeStatus, string> = {
  ROOT: '#64748b',
  ACTIVE: '#38bdf8',
  PRUNED: '#f43f5e',
  CONFIRMED: '#818cf8',
  SOLUTION: '#34d399',
};

const NODE_TYPES = {
  boardNode: BoardNode,
};

function InnerTreeCanvas({
  allTreeNodes,
  allTreeEdges,
  visibleNodeIds,
  visibleEdgeIds,
  currentNodeId,
  nodeStatusMap,
  onNodeClick,
}: TreeGraphViewProps) {
  const { fitView, setCenter } = useReactFlow();

  const visibleNodeIdSet = useMemo(() => new Set(visibleNodeIds), [visibleNodeIds]);
  const visibleEdgeIdSet = useMemo(() => new Set(visibleEdgeIds), [visibleEdgeIds]);

  const flowNodes: Node<BacktrackingNodeData>[] = useMemo(() => {
    return visibleNodeIds.map((nodeId) => {
      const internalNode = allTreeNodes[nodeId];
      const dynamicStatus = nodeStatusMap[nodeId] || internalNode.status;
      const isCurrentlyActive = nodeId === currentNodeId;

      return {
        id: internalNode.id,
        type: 'boardNode',
        position: { x: internalNode.x, y: internalNode.y },
        data: {
          id: internalNode.id,
          parentId: internalNode.parentId,
          depth: internalNode.depth,
          columnAttempted: internalNode.columnAttempted,
          boardSize: internalNode.boardSize,
          placedQueens: internalNode.placedQueens,
          candidateQueen: internalNode.candidateQueen,
          threatenedCoordinates: internalNode.threatenedCoordinates,
          status: dynamicStatus,
          conflictCoordinate: internalNode.conflictCoordinate,
          isCurrentlyActive,
        },
      };
    });
  }, [allTreeNodes, visibleNodeIds, currentNodeId, nodeStatusMap]);

  const flowEdges: Edge[] = useMemo(() => {
    return allTreeEdges
      .filter((edge) => visibleEdgeIdSet.has(edge.id) && visibleNodeIdSet.has(edge.target))
      .map((edge) => {
        const targetStatus = nodeStatusMap[edge.target] || edge.status;
        const edgeColor = EDGE_COLOR_LOOKUP[targetStatus] || EDGE_COLOR_LOOKUP.ROOT;

        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: 'smoothstep',
          animated: targetStatus === 'ACTIVE',
          style: {
            stroke: edgeColor,
            strokeWidth: targetStatus === 'ACTIVE' || targetStatus === 'SOLUTION' ? 2.5 : 1.5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 14,
            height: 14,
            color: edgeColor,
          },
        };
      });
  }, [allTreeEdges, visibleEdgeIdSet, visibleNodeIdSet, nodeStatusMap]);

  function handleFocusActiveNode(): void {
    const activeNode = allTreeNodes[currentNodeId];
    if (activeNode) {
      setCenter(activeNode.x + 60, activeNode.y + 60, { zoom: 0.9, duration: 500 });
    }
  }

  function handleResetView(): void {
    fitView({ duration: 500, padding: 0.2 });
  }

  return (
    <div className="relative w-full h-full bg-slate-950/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button
          onClick={handleFocusActiveNode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 text-xs font-semibold backdrop-blur shadow-lg transition-colors"
          title="Centrar en el nodo actualmente activo"
        >
          <Focus className="w-3.5 h-3.5 text-amber-400" />
          Enfocar activo
        </button>
        <button
          onClick={handleResetView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 text-xs font-semibold backdrop-blur shadow-lg transition-colors"
          title="Ajustar vista completa del árbol"
        >
          <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
          Vista completa
        </button>
      </div>

      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={NODE_TYPES}
        onNodeClick={(_, node) => onNodeClick(node.id)}
        fitView
        minZoom={0.15}
        maxZoom={1.5}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={24} size={1} />
        <Controls
          className="!bg-slate-900 !border-slate-800 !rounded-xl !shadow-xl [&>button]:!bg-slate-800 [&>button]:!border-slate-700 [&>button]:!fill-slate-300 hover:[&>button]:!fill-white"
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(node) => {
            const nodeData = node.data as unknown as BacktrackingNodeData;
            return EDGE_COLOR_LOOKUP[nodeData.status] || '#64748b';
          }}
          className="!bg-slate-900/90 !border-slate-800 !rounded-xl !overflow-hidden"
          maskColor="rgba(2, 6, 23, 0.7)"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}

export function TreeGraphView(props: TreeGraphViewProps) {
  return (
    <ReactFlowProvider>
      <InnerTreeCanvas {...props} />
    </ReactFlowProvider>
  );
}
