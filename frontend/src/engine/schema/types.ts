/**
 * 엔진의 뼈대(Schema)를 나타내는 공통 타입 정의 파일입니다.
 */

export interface NodeDataPayload {
  targetId: string;
  inputStrings: string[];
}

/**
 * 1. 단일 노드 인터페이스 (최소한의 식별자와 상태만 유지)
 */
export interface AgentNode {
  id: string;
  type: string;
  status: 'idle' | 'running' | 'completed' | 'error';
}

/**
 * 2. 엣지 인터페이스 (단순한 원천-타겟 연결선)
 */
export interface AgentEdge {
  id: string;
  sourceId: string;
  targetId: string;
}

/**
 * 3. 전체 워크플로우 맵 저장소 형태
 */
export interface WorkflowSchema {
  nodes: Record<string, AgentNode>;
  edges: AgentEdge[];
}
