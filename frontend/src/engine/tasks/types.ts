/**
 * 비동기 Task Consumer 들의 기초 인터페이스 명세서입니다.
 */
import { NodeDataPayload } from '../schema/types';

/**
 * 모든 Task Consumer가 지켜야 하는 부모 인터페이스
 */
export interface ITaskConsumer {
  targetNodeType: string;
  
  /**
   * 작업 함수
   * @param inputs 입력 데이터
   */
  execute(inputs: NodeDataPayload): Promise<any>;
}

export interface ITaskConsumerRegistry {
  register(consumer: ITaskConsumer): void;
  getConsumer(nodeType: string): ITaskConsumer | undefined;
}
