import { Moment } from 'moment';

export interface ITopicMessage {
  id?: number;
  content?: string;
  createdAt?: Moment;
  topicId?: number;
  participantId?: number;
}

export class TopicMessage implements ITopicMessage {
  constructor(
    public id?: number,
    public content?: string,
    public createdAt?: Moment,
    public topicId?: number,
    public participantId?: number
  ) {}
}
