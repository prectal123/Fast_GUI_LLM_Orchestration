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
   *   - payload.config: { apiKey: string, temperature: number, llmApiType: LLMApiType } 
   */
  async execute(payload: NodeDataPayload): Promise<string> {
    const prompt = payload.inputStrings[0] || "";
    const { apiKey, temperature, llmApiType } = payload.config || {};

    if (!apiKey) {
      throw new Error(`LLMTaskConsumer: Missing API Key for ${llmApiType}`);
    }

    /**
     * [OpenAI 호출 클로저]
     */
    const callOpenAI = async (text: string): Promise<string> => {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 혹은 설정에서 받음
          messages: [{ role: "user", content: text }],
          temperature: temperature ?? 0.7
        })
      });
      const data = await response.json();
      return data.choices[0].message.content;
    };

    /**
     * [Anthropic/Gemini 등은 향후 동일한 구조로 확장 가능]
     */

    console.log(`[LLMTask] Dispatching to ${llmApiType}... Prompt: "${prompt.substring(0, 30)}..."`);

    // 사용자의 제안대로 Switch-Case 핸들링
    switch (llmApiType) {
      case 'openai':
        return await callOpenAI(prompt);
      
      case 'anthropic':
        // return await callAnthropic(prompt); // TODO: 실물 구현 예정
        throw new Error("Anthropic is not implemented yet.");

      case 'gemini':
        // return await callGemini(prompt);     // TODO: 실물 구현 예정
        throw new Error("Gemini is not implemented yet.");

      default:
        throw new Error(`Unsupported LLM API Type: ${llmApiType}`);
    }
  }
}
