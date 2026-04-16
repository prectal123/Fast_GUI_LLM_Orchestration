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
  async execute(payload: NodeDataPayload): Promise<string> {
    const { inputStrings } = payload;

    // 만약 데이터가 부족하다면 안전하게 빈 응답을 보내거나 에러 처리를 합니다.
    if (inputStrings.length < 2) {
      console.warn(`ConcatTaskConsumer: Expected 2 inputs, but received ${inputStrings.length}`);
      return inputStrings[0] || ""; // 혹은 빈 문자열
    }

    const preposition = inputStrings[0];
    const postposition = inputStrings[1];

    // 두 문자열을 명시적으로 결합 (중간에 공백 하나 추가 여부는 선택적이나, 지금은 단순 병합)
    const result = `${preposition}${postposition}`;

    console.log(`[ConcatTask] Execution Success: "${preposition}" + "${postposition}" = "${result}"`);
    
    return result; 
  }
}
