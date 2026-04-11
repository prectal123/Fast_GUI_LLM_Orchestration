import { ITaskConsumer } from './types';
import { NodeDataPayload } from '../schema/types';

/**
 * [Static Task Consumer]
 * 고정된 문자열 스트링을 그대로 다음 노드로 전달합니다.
 */
export class StaticTaskConsumer implements ITaskConsumer {
  public targetNodeType = 'static_node';

  async execute(payload: NodeDataPayload): Promise<any> {
    // 뼈대만 유지합니다.
    return null;
  }
}
