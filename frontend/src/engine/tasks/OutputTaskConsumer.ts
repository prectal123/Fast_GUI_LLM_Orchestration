import { ITaskConsumer } from './types';
import { NodeDataPayload } from '../schema/types';

/**
 * [Output Task Consumer]
 * 화면에 최종 결과물을 렌더링하도록 명령합니다.
 */
export class OutputTaskConsumer implements ITaskConsumer {
  public targetNodeType = 'output_node';

  /**
   * @param payload 
   *   - payload.inputStrings[0]: 화면에 표시할 최종 결과 문자열
   */
  async execute(payload: NodeDataPayload): Promise<any> {
    // 뼈대만 유지합니다.
    return null;
  }
}
