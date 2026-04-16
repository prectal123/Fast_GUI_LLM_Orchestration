import { ITaskConsumer } from './types';
import { NodeDataPayload } from '../schema/types';

/**
 * [Static Task Consumer]
 * 고정된 문자열 스트링을 그대로 다음 노드로 전달합니다.
 */
export class StaticTaskConsumer implements ITaskConsumer {
  public targetNodeType = 'static_node';

  /**
   * @param payload 
   *   - payload.config: { staticType: DataType, staticContent: string }
   */
  async execute(payload: NodeDataPayload): Promise<string> {
    const { staticType, staticContent } = payload.config || {};
    const content = staticContent || "";

    console.log(`[StaticTask] Execution Success: Outputting ${staticType} data -> "${content.substring(0, 20)}..."`);
    
    // 단순하게 타입에 맞는 값을 반환합니다. 
    // 나중에 엔진(Orchestrator)이 이 노드의 staticType을 보고 
    // 문자열 리스트로 보낼지, 자산 ID 리스트로 보낼지 결정하게 됩니다.
    return content;
  }
}
