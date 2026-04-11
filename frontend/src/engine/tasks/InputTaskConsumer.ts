import { ITaskConsumer } from './types';
import { NodeDataPayload } from '../schema/types';

/**
 * [Input Task Consumer]
 * 사용자가 UI에서 엔터를 쳤을 때 발생하는 시작점 태스크입니다.
 */
export class InputTaskConsumer implements ITaskConsumer {
  public targetNodeType = 'input_node';

  async execute(payload: NodeDataPayload): Promise<any> {
    // 뼈대만 유지합니다.
    return null;
  }
}
