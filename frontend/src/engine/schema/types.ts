/**
 * 엔진의 뼈대(Schema)를 나타내는 공통 타입 정의 파일입니다.
 */

/**
 * [Media 관련]
 * 무거운 미디어 자산을 중앙에서 관리하기 위한 규격
 */
export type MediaType = 'image' | 'video';

export interface MediaAsset {
  id: string;        // 고유 자산 ID
  type: MediaType;   // 자산의 종류
  blobUrl: string;   // 브라우저 메모리 상의 임시 주소 (URL.createObjectURL)
  fileName?: string; // 원본 파일명 (선택)
}

/**
 * [Payload 관련]
 * 노드 간 전달되는 실제 데이터 꾸러미
 */
export interface NodeDataPayload {
  targetId: string;
  inputStrings: string[];       // 텍스트 데이터 리스트
  inputAssetIds?: string[];     // 전달된 미디어 자산 ID 리스트
  config?: Record<string, any>; // 노드 제작 시 설정된 고유 세팅값들
}

export type DataType = 'string' | 'image' | 'video';

/**
 * 1. 단일 노드 인터페이스 (공통 조상)
 */
export interface AgentNode {
  id: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  
  inputEdges: string[];
  inputNum: number;
  inputTypes: DataType[]; // 입력 포트별 기대 데이터 타입
  outputEdges: string[];
  outputNum: number;
  outputTypes: DataType[]; // 출력 포트별 데이터 타입
}

/** [Node Type 1] Input 노드 */
export interface InputNode extends AgentNode {
  type: 'input_node';
  inputNum: 0;
  inputTypes: [];
  outputNum: 1;
  outputTypes: ['string'];
}

/** [Node Type 2] Static 노드 */
export interface StaticNode extends AgentNode {
  type: 'static_node';
  inputNum: 0;
  inputTypes: [];
  outputNum: 1;
  outputTypes: [DataType]; // staticType에 따라 string, image, video 중 하나가 됨
  staticType: DataType;    // 현재 노드가 다루는 데이터의 타입 (텍스트/이미지/영상)
  staticContent: string;   // 텍스트 내용 혹은 MediaAsset의 ID
}

/** [Node Type 3] Concat 노드 */
export interface ConcatNode extends AgentNode {
  type: 'concat_node';
  inputNum: 2;
  inputTypes: ['string', 'string'];
  outputNum: 1;
  outputTypes: ['string'];
}

/** [Node Type 4] LLM 노드 */
export enum LLMApiType { OpenAI = 'openai', Anthropic = 'anthropic', Gemini = 'gemini' }
export interface LLMNode extends AgentNode {
  type: 'llm_node';
  inputNum: 1;
  inputTypes: ['string'];
  outputNum: 1;
  outputTypes: ['string'];
  temperature: number;
  llmApiType: LLMApiType;
  apiKey: string;
}

/** [Node Type 5] Output 노드 */
export interface OutputNode extends AgentNode {
  type: 'output_node';
  inputNum: 1;
  inputTypes: [DataType]; // 모든 타입 수용 가능
  outputNum: 0;
  outputTypes: [];
}

/** 
 * [Node Type 6] Image2Text 노드 (추가)
 */
export interface Image2TextNode extends AgentNode {
  type: 'image2text_node';
  inputNum: 2; // 미디어 자산 + 텍스트 프롬프트
  inputTypes: ['image', 'string'];
  outputNum: 1;
  outputTypes: ['string'];
}

/** 
 * [Node Type 7] Video2Text 노드 (추가)
 */
export interface Video2TextNode extends AgentNode {
  type: 'video2text_node';
  inputNum: 2; // 미디어 자산 + 텍스트 프롬프트
  inputTypes: ['video', 'string'];
  outputNum: 1;
  outputTypes: ['string'];
}

/** 전체 노드 유니온 타입 */
export type AllAgentNodes = 
  | InputNode 
  | StaticNode 
  | ConcatNode 
  | LLMNode 
  | OutputNode
  | Image2TextNode
  | Video2TextNode;

/** 2. 엣지 인터페이스 */
export interface AgentEdge {
  id: string;
  sourceId: string;
  targetId: string;
}

/** 3. 전체 워크플로우 맵 저장소 형태 */
export interface WorkflowSchema {
  nodes: Record<string, AgentNode>;
  edges: AgentEdge[];
  assets: Record<string, MediaAsset>; // 미디어 자산 중앙 저장소 추가
}
