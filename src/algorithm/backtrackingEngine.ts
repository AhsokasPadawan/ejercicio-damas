import {
  AlgorithmSnapshot,
  BoardCoordinate,
  InternalTreeNode,
  StepActionType,
  TreeEdgeData,
  TreeNodeStatus,
} from '../types/backtracking';
import {
  buildConflictDescriptionText,
  calculateThreatenedCoordinates,
  findConflictingQueenCoordinate,
} from './boardCalculations';

interface TreeLayoutComputationResult {
  nodesMap: Record<string, InternalTreeNode>;
  edgesList: TreeEdgeData[];
  rootNodeId: string;
}

const ACTION_TITLE_LOOKUP: Record<StepActionType, string> = {
  INITIAL: 'Estado Inicial',
  TRY_PLACE: 'Evaluando Casilla Tentativa',
  PRUNED_CONFLICT: 'Poda por Conflicto Detectado',
  CONFIRM_PLACE: 'Dama Fijada con Éxito',
  BACKTRACK: 'Retroceso (Backtracking)',
  SOLUTION_FOUND: '¡Primera Solución Encontrada!',
};

export function generateBacktrackingSimulation(boardSize: number): {
  snapshots: AlgorithmSnapshot[];
  allTreeNodes: Record<string, InternalTreeNode>;
  allTreeEdges: TreeEdgeData[];
} {
  let nextNodeIdentifierSequence = 0;
  let cumulativePruneCounter = 0;

  const treeNodesDictionary: Record<string, InternalTreeNode> = {};
  const treeEdgesCollection: TreeEdgeData[] = [];
  const generatedSnapshotsHistory: AlgorithmSnapshot[] = [];

  const visibleNodesOrder: string[] = [];
  const visibleEdgesOrder: string[] = [];
  const dynamicNodeStatusMap: Record<string, TreeNodeStatus> = {};

  const rootNodeId = `node-${nextNodeIdentifierSequence++}`;
  const rootEmptyPlacedQueens: BoardCoordinate[] = [];
  const rootThreatenedCoordinates = calculateThreatenedCoordinates(
    boardSize,
    rootEmptyPlacedQueens
  );

  const rootTreeNode: InternalTreeNode = {
    id: rootNodeId,
    parentId: null,
    depth: 0,
    columnAttempted: -1,
    boardSize,
    placedQueens: rootEmptyPlacedQueens,
    candidateQueen: null,
    threatenedCoordinates: rootThreatenedCoordinates,
    status: 'ROOT',
    conflictCoordinate: null,
    childrenIds: [],
    x: 0,
    y: 0,
  };

  treeNodesDictionary[rootNodeId] = rootTreeNode;
  visibleNodesOrder.push(rootNodeId);
  dynamicNodeStatusMap[rootNodeId] = 'ROOT';

  function appendSimulationSnapshot(parameters: {
    actionType: StepActionType;
    currentNodeId: string;
    currentPlacedQueens: BoardCoordinate[];
    candidateQueen: BoardCoordinate | null;
    threatenedCoordinates: BoardCoordinate[];
    conflictCoordinate: BoardCoordinate | null;
    depth: number;
    descriptionDetail: string;
  }): void {
    generatedSnapshotsHistory.push({
      stepIndex: generatedSnapshotsHistory.length,
      totalSteps: 0,
      boardSize,
      actionType: parameters.actionType,
      currentNodeId: parameters.currentNodeId,
      placedQueens: [...parameters.currentPlacedQueens],
      candidateQueen: parameters.candidateQueen ? { ...parameters.candidateQueen } : null,
      threatenedCoordinates: [...parameters.threatenedCoordinates],
      conflictCoordinate: parameters.conflictCoordinate
        ? { ...parameters.conflictCoordinate }
        : null,
      visibleNodeIds: [...visibleNodesOrder],
      visibleEdgeIds: [...visibleEdgesOrder],
      nodeStatusMap: { ...dynamicNodeStatusMap },
      pruneCount: cumulativePruneCounter,
      totalNodesGenerated: visibleNodesOrder.length,
      depth: parameters.depth,
      descriptionTitle: ACTION_TITLE_LOOKUP[parameters.actionType],
      descriptionDetail: parameters.descriptionDetail,
    });
  }

  appendSimulationSnapshot({
    actionType: 'INITIAL',
    currentNodeId: rootNodeId,
    currentPlacedQueens: rootEmptyPlacedQueens,
    candidateQueen: null,
    threatenedCoordinates: rootThreatenedCoordinates,
    conflictCoordinate: null,
    depth: 0,
    descriptionDetail: `Tablero vacío listo para iniciar la búsqueda sistemática para N = ${boardSize}.`,
  });

  function executeBacktrackingRecursiveSearch(
    currentRowIndex: number,
    parentNodeId: string,
    currentEstablishedQueens: BoardCoordinate[]
  ): boolean {
    if (currentRowIndex === boardSize) {
      return true;
    }

    for (let targetColumnIndex = 0; targetColumnIndex < boardSize; targetColumnIndex++) {
      const candidateCoordinate: BoardCoordinate = {
        row: currentRowIndex,
        col: targetColumnIndex,
      };

      const candidateNodeId = `node-${nextNodeIdentifierSequence++}`;
      const edgeId = `edge-${parentNodeId}-${candidateNodeId}`;

      const conflictingQueen = findConflictingQueenCoordinate(
        candidateCoordinate,
        currentEstablishedQueens
      );

      const candidateNodeThreatened = calculateThreatenedCoordinates(
        boardSize,
        currentEstablishedQueens
      );

      const isCandidatePruned = conflictingQueen !== null;
      const initialNodeStatus: TreeNodeStatus = isCandidatePruned ? 'PRUNED' : 'CONFIRMED';

      const childTreeNode: InternalTreeNode = {
        id: candidateNodeId,
        parentId: parentNodeId,
        depth: currentRowIndex + 1,
        columnAttempted: targetColumnIndex,
        boardSize,
        placedQueens: isCandidatePruned
          ? [...currentEstablishedQueens]
          : [...currentEstablishedQueens, candidateCoordinate],
        candidateQueen: candidateCoordinate,
        threatenedCoordinates: isCandidatePruned
          ? candidateNodeThreatened
          : calculateThreatenedCoordinates(boardSize, [
              ...currentEstablishedQueens,
              candidateCoordinate,
            ]),
        status: initialNodeStatus,
        conflictCoordinate: conflictingQueen,
        childrenIds: [],
        x: 0,
        y: 0,
      };

      treeNodesDictionary[parentNodeId].childrenIds.push(candidateNodeId);
      treeNodesDictionary[candidateNodeId] = childTreeNode;

      treeEdgesCollection.push({
        id: edgeId,
        source: parentNodeId,
        target: candidateNodeId,
        status: initialNodeStatus,
      });

      visibleNodesOrder.push(candidateNodeId);
      visibleEdgesOrder.push(edgeId);
      dynamicNodeStatusMap[candidateNodeId] = 'ACTIVE';

      appendSimulationSnapshot({
        actionType: 'TRY_PLACE',
        currentNodeId: candidateNodeId,
        currentPlacedQueens: currentEstablishedQueens,
        candidateQueen: candidateCoordinate,
        threatenedCoordinates: candidateNodeThreatened,
        conflictCoordinate: null,
        depth: currentRowIndex + 1,
        descriptionDetail: `Intentando posicionar dama en Fila ${currentRowIndex + 1}, Columna ${targetColumnIndex + 1}.`,
      });

      if (isCandidatePruned) {
        cumulativePruneCounter++;
        dynamicNodeStatusMap[candidateNodeId] = 'PRUNED';

        const conflictMessage = buildConflictDescriptionText(
          candidateCoordinate,
          conflictingQueen
        );

        appendSimulationSnapshot({
          actionType: 'PRUNED_CONFLICT',
          currentNodeId: candidateNodeId,
          currentPlacedQueens: currentEstablishedQueens,
          candidateQueen: candidateCoordinate,
          threatenedCoordinates: candidateNodeThreatened,
          conflictCoordinate: conflictingQueen,
          depth: currentRowIndex + 1,
          descriptionDetail: `${conflictMessage}. La rama queda podada inmediatamente.`,
        });

        appendSimulationSnapshot({
          actionType: 'BACKTRACK',
          currentNodeId: parentNodeId,
          currentPlacedQueens: currentEstablishedQueens,
          candidateQueen: null,
          threatenedCoordinates: candidateNodeThreatened,
          conflictCoordinate: null,
          depth: currentRowIndex,
          descriptionDetail: `Se retira la dama de (${currentRowIndex + 1}, ${targetColumnIndex + 1}) y se retrocede al nodo padre para explorar la siguiente columna.`,
        });

        continue;
      }

      const updatedQueensList = [...currentEstablishedQueens, candidateCoordinate];
      const updatedThreatsList = calculateThreatenedCoordinates(boardSize, updatedQueensList);

      dynamicNodeStatusMap[candidateNodeId] = 'CONFIRMED';

      appendSimulationSnapshot({
        actionType: 'CONFIRM_PLACE',
        currentNodeId: candidateNodeId,
        currentPlacedQueens: updatedQueensList,
        candidateQueen: null,
        threatenedCoordinates: updatedThreatsList,
        conflictCoordinate: null,
        depth: currentRowIndex + 1,
        descriptionDetail: `Posición segura confirmada en Fila ${currentRowIndex + 1}, Columna ${targetColumnIndex + 1}. Se actualizan las casillas amenazadas.`,
      });

      if (currentRowIndex + 1 === boardSize) {
        dynamicNodeStatusMap[candidateNodeId] = 'SOLUTION';
        childTreeNode.status = 'SOLUTION';

        appendSimulationSnapshot({
          actionType: 'SOLUTION_FOUND',
          currentNodeId: candidateNodeId,
          currentPlacedQueens: updatedQueensList,
          candidateQueen: null,
          threatenedCoordinates: updatedThreatsList,
          conflictCoordinate: null,
          depth: currentRowIndex + 1,
          descriptionDetail: `¡Se colocaron exitosamente las ${boardSize} damas sin conflictos! Se alcanza la primera solución válida.`,
        });

        return true;
      }

      const hasSubtreeFoundSolution = executeBacktrackingRecursiveSearch(
        currentRowIndex + 1,
        candidateNodeId,
        updatedQueensList
      );

      if (hasSubtreeFoundSolution) {
        return true;
      }

      appendSimulationSnapshot({
        actionType: 'BACKTRACK',
        currentNodeId: parentNodeId,
        currentPlacedQueens: currentEstablishedQueens,
        candidateQueen: null,
        threatenedCoordinates: candidateNodeThreatened,
        conflictCoordinate: null,
        depth: currentRowIndex,
        descriptionDetail: `Ninguna posición en la fila inferior condujo a solución. Retroceso a Fila ${currentRowIndex + 1} para probar la siguiente alternativa.`,
      });
    }

    return false;
  }

  executeBacktrackingRecursiveSearch(0, rootNodeId, rootEmptyPlacedQueens);

  const positionedLayout = computeHierarchicalTreeLayout(
    treeNodesDictionary,
    treeEdgesCollection,
    rootNodeId
  );

  const totalCalculatedSteps = generatedSnapshotsHistory.length;
  for (const snapshot of generatedSnapshotsHistory) {
    snapshot.totalSteps = totalCalculatedSteps;
  }

  return {
    snapshots: generatedSnapshotsHistory,
    allTreeNodes: positionedLayout.nodesMap,
    allTreeEdges: positionedLayout.edgesList,
  };
}

function computeHierarchicalTreeLayout(
  nodesMap: Record<string, InternalTreeNode>,
  edgesList: TreeEdgeData[],
  rootNodeId: string
): TreeLayoutComputationResult {
  const horizontalNodeSpacing = 160;
  const verticalLevelSpacing = 200;

  let globalLeafHorizontalPosition = 0;

  function assignPositionsRecursively(currentNodeId: string): void {
    const currentNode = nodesMap[currentNodeId];
    if (!currentNode) {
      return;
    }

    if (currentNode.childrenIds.length === 0) {
      currentNode.x = globalLeafHorizontalPosition;
      globalLeafHorizontalPosition += horizontalNodeSpacing;
    } else {
      for (const childNodeId of currentNode.childrenIds) {
        assignPositionsRecursively(childNodeId);
      }

      const firstChild = nodesMap[currentNode.childrenIds[0]];
      const lastChild =
        nodesMap[currentNode.childrenIds[currentNode.childrenIds.length - 1]];

      currentNode.x = (firstChild.x + lastChild.x) / 2;
    }

    currentNode.y = currentNode.depth * verticalLevelSpacing;
  }

  assignPositionsRecursively(rootNodeId);

  return {
    nodesMap,
    edgesList,
    rootNodeId,
  };
}
