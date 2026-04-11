/**
 * 엔진의 뼈대(Schema)를 나타내는 공통 타입 정의 파일입니다.
 */

export interface NodeDataPayload {
  targetId: string;
  inputStrings: string[];
}

/**
 * 1. 단일 노드 인터페이스 (식별자, 상태 및 Edge 배열 정보 유지)
 */
export interface AgentNode {
  id: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  
  // 노드에 직접 연결된 엣지(데이터 통로) 정보 (ID의 List 및 엣지 개수)
  inputEdges: string[];
  inputNum: number;
  outputEdges: string[];
  outputNum: number;
}

/**
 * [Node Type 1] Input 노드
 * 사용자가 화면 하단의 UI에서 텍스트를 입력하고 전송 시 String을 생성하는 시작점 노드입니다.
 */
export interface InputNode extends AgentNode {
  type: 'input_node';
  inputNum: 0;  // 시작점이므로 외부에서 들어오는 Input Edge는 없음
  outputNum: 1; // 생성된 텍스트 리스트를 내보낼 단 1개의 Output Edge만 허용
}

/**
 * [Node Type 2] Static 노드
 * 미리 입력된 고정된 문자열을 실행 즉시 Output으로 내보내는 노드입니다.
 */
export interface StaticNode extends AgentNode {
  type: 'static_node';
  inputNum: 0;
  outputNum: 1;
  staticContent: string;
}

/**
 * [Node Type 3] Concat 노드
 * 입력으로 받은 두 개의 문자열을 연결하여 하나의 Output으로 내보내는 노드입니다.
 */
export interface ConcatNode extends AgentNode {
  type: 'concat_node';
  inputNum: 2;
  outputNum: 1;
}

export enum LLMApiType {
  OpenAI = 'openai',
  Anthropic = 'anthropic',
  Gemini = 'gemini'
}

/**
 * [Node Type 4] LLM 노드
 * 설정된 API 정보를 바탕으로 입력을 LLM 모델에 전달하고 결과를 출력하는 노드입니다.
 */
export interface LLMNode extends AgentNode {
  type: 'llm_node';
  inputNum: 1;
  outputNum: 1;
  temperature: number;
  llmApiType: LLMApiType;
  apiKey: string;
}

/**
 * [Node Type 5] Output 노드
 * 최종 결과를 받아 사용자 UI의 결과창이나 로그 등에 출력하는 종착점 노드입니다.
 */
export interface OutputNode extends AgentNode {
  type: 'output_node';
  inputNum: 1;
  outputNum: 0;
}

/**
 * 전체 에이전트 노드들을 포함하는 유니온 타입
 */
export type AllAgentNodes = 
  | InputNode 
  | StaticNode 
  | ConcatNode 
  | LLMNode 
  | OutputNode;

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
