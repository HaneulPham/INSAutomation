export interface TopicPublication<T> {
  topicArn: string;
  correlationId: string;
  payload: T;
}
