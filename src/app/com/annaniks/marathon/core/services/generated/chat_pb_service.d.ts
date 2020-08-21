// package:
// file: chat.proto

import * as chat_pb from './chat_pb';
import { grpc } from '@improbable-eng/grpc-web';

type ChatSingleUpStream = {
  readonly methodName: string;
  readonly service: typeof Chat;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof chat_pb.ActionRequest;
  readonly responseType: typeof chat_pb.ActionResponse;
};

type ChatSingleDownStream = {
  readonly methodName: string;
  readonly service: typeof Chat;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof chat_pb.ActionRequest;
  readonly responseType: typeof chat_pb.ActionResponse;
};

export class Chat {
  static readonly serviceName: string;
  static readonly SingleUpStream: ChatSingleUpStream;
  static readonly SingleDownStream: ChatSingleDownStream;
}

export type ServiceError = { message: string; code: number; metadata: grpc.Metadata };
export type Status = { details: string; code: number; metadata: grpc.Metadata };

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  singleUpStream(
    requestMessage: chat_pb.ActionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError | null, responseMessage: chat_pb.ActionResponse | null) => void
  ): UnaryResponse;
  singleUpStream(
    requestMessage: chat_pb.ActionRequest,
    callback: (error: ServiceError | null, responseMessage: chat_pb.ActionResponse | null) => void
  ): UnaryResponse;
  singleDownStream(requestMessage: chat_pb.ActionRequest, metadata?: grpc.Metadata): ResponseStream<chat_pb.ActionResponse>;
}
