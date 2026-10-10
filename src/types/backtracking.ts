export interface BoardCoordinate {
  row: number;
  col: number;
}

export type StepActionType =
  | 'INITIAL'
  | 'TRY_PLACE'
  | 'PRUNED_CONFLICT'
  | 'CONFIRM_PLACE'
  | 'BACKTRACK'
  | 'SOLUTION_FOUND';

export type TreeNodeStatus =
  | 'ROOT'
  | 'ACTIVE'
  | 'PRUNED'
  | 'CONFIRMED'
  | 'SOLUTION';

export interface BacktrackingNodeData extends Record<string, unknown> {
  id: string;
  parentId: string | null;
  depth: number;
  columnAttempted: number;
  boardSize: number;
  placedQueens: BoardCoordinate[];
  candidateQueen: BoardCoordinate | null;
  threatenedCoordinates: BoardCoordinate[];
  status: TreeNodeStatus;
  conflictCoordinate?: BoardCoordinate | null;
  isCurrentlyActive: boolean;
}

export interface InternalTreeNode {
  id: string;
  parentId: string | null;
  depth: number;
  columnAttempted: number;
  boardSize: number;
  placedQueens: BoardCoordinate[];
  candidateQueen: BoardCoordinate | null;
  threatenedCoordinates: BoardCoordinate[];
  status: TreeNodeStatus;
  conflictCoordinate?: BoardCoordinate | null;
  childrenIds: string[];
  x: number;
  y: number;
}

export interface TreeEdgeData {
  id: string;
  source: string;
  target: string;
  status: TreeNodeStatus;
}

export interface AlgorithmSnapshot {
  stepIndex: number;
  totalSteps: number;
  boardSize: number;
  actionType: StepActionType;
  currentNodeId: string;
  placedQueens: BoardCoordinate[];
  candidateQueen: BoardCoordinate | null;
  threatenedCoordinates: BoardCoordinate[];
  conflictCoordinate: BoardCoordinate | null;
  visibleNodeIds: string[];
  visibleEdgeIds: string[];
  nodeStatusMap: Record<string, TreeNodeStatus>;
  pruneCount: number;
  totalNodesGenerated: number;
  depth: number;
  descriptionTitle: string;
  descriptionDetail: string;
}
