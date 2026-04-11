import { ITaskConsumer } from './types';
import { NodeDataPayload } from '../schema/types';

/**
 * [Concat Task Consumer]
 * 리스트로 들어온 두 개의 문자열을 하나로 합칩니다.
 */
export class ConcatTaskConsumer implements ITaskConsumer {
  public targetNodeType = 'concat_node';

  /**
   * @param payload 
   *   - payload.inputStrings[0]: preposition (앞부분)
   *   - payload.inputStrings[1]: postposition (뒷부분)
   */
  async execute(payload: NodeDataPayload): Promise<any> {
    // 뼈대만 유지합니다.
    return null;
  }
}
