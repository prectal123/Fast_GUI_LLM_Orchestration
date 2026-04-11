import { ITaskConsumer } from './types';
import { NodeDataPayload, AllAgentNodes } from '../schema/types';
import { InputTaskConsumer } from './InputTaskConsumer';
import { StaticTaskConsumer } from './StaticTaskConsumer';
import { ConcatTaskConsumer } from './ConcatTaskConsumer';
import { LLMTaskConsumer } from './LLMTaskConsumer';
import { OutputTaskConsumer } from './OutputTaskConsumer';

/**
 * TaskOrchestrator
 * "Topic"을 수신하고, 적절한 Consumer 인스턴스를 생성하여 비동기로 실행합니다.
 */
export class TaskOrchestrator {
  /**
   * 특정 노드에 대한 실행 요청을 처리합니다.
   */
  async dispatchTopic(node: AllAgentNodes, payload: NodeDataPayload) {
    let consumer: ITaskConsumer;

    // 명시적인 타입 체크 및 인스턴스 생성
    switch (node.type) {
      case 'input_node':
        consumer = new InputTaskConsumer();
        break;
      case 'static_node':
        consumer = new StaticTaskConsumer();
        break;
      case 'concat_node':
        consumer = new ConcatTaskConsumer();
        break;
      case 'llm_node':
        consumer = new LLMTaskConsumer();
        break;
      case 'output_node':
        consumer = new OutputTaskConsumer();
        break;
      default:
        console.error(`Unknown node type: ${(node as any).type}`);
        return;
    }

    try {
      // 비동기 실행
      const result = await consumer.execute(payload);
      return result;
    } catch (error) {
      console.error(`Task execution failed for node ${node.id}:`, error);
      throw error;
    }
  }
}
