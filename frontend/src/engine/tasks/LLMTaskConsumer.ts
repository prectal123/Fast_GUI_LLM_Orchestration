import { ITaskConsumer } from './types';
import { NodeDataPayload } from '../schema/types';

/**
 * [LLM Task Consumer]
 * API를 호출하여 LLM 응답을 받아옵니다.
 */
export class LLMTaskConsumer implements ITaskConsumer {
  public targetNodeType = 'llm_node';

  /**
   * @param payload 
   *   - payload.inputStrings[0]: 모델에 전달할 메인 프롬프트
   *   - payload.config: { apiKey: string, temperature: number, llmApiType: string } 
   */
  async execute(payload: NodeDataPayload): Promise<any> {
    // 뼈대만 유지합니다.
    return null;
  }
}
