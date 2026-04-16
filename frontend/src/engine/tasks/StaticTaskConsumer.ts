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
   *   - payload.config: { staticContent: string } (미리 입력된 고정 텍스트)
   */
  async execute(payload: NodeDataPayload): Promise<string> {
    const staticContent = payload.config?.staticContent || "";

    console.log(`[StaticTask] Execution Success: Outputting fixed string -> "${staticContent}"`);
    
    return staticContent;
  }
}
