// package:
// file: chat.proto

import * as jspb from 'google-protobuf';

export class ActionRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  hasData(): boolean;
  clearData(): void;
  getData(): ActionData | undefined;
  setData(value?: ActionData): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ActionRequest): ActionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: ActionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionRequest;
  static deserializeBinaryFromReader(message: ActionRequest, reader: jspb.BinaryReader): ActionRequest;
}

export namespace ActionRequest {
  export type AsObject = {
    token: string;
    data?: ActionData.AsObject;
  };
}

export class ActionResponse extends jspb.Message {
  clearDataList(): void;
  getDataList(): Array<ActionData>;
  setDataList(value: Array<ActionData>): void;
  addData(value?: ActionData, index?: number): ActionData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ActionResponse): ActionResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: ActionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionResponse;
  static deserializeBinaryFromReader(message: ActionResponse, reader: jspb.BinaryReader): ActionResponse;
}

export namespace ActionResponse {
  export type AsObject = {
    dataList: Array<ActionData.AsObject>;
  };
}

export class ActionData extends jspb.Message {
  getTopic(): number;
  setTopic(value: number): void;

  getServerid(): number;
  setServerid(value: number): void;

  getServerat(): number;
  setServerat(value: number): void;

  getAction(): ActionMap[keyof ActionMap];
  setAction(value: ActionMap[keyof ActionMap]): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionData.AsObject;
  static toObject(includeInstance: boolean, msg: ActionData): ActionData.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: ActionData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionData;
  static deserializeBinaryFromReader(message: ActionData, reader: jspb.BinaryReader): ActionData;
}

export namespace ActionData {
  export type AsObject = {
    topic: number;
    serverid: number;
    serverat: number;
    action: ActionMap[keyof ActionMap];
    data: string;
  };
}

export interface ActionMap {
  ACTION_OFFLINE: 0;
  ACTION_ONLINE: 1;
  ACTION_TOPIC_READ: 3;
  ACTION_TOPIC_EMPTY: 4;
  ACTION_TOPIC_FULL: 5;
  ACTION_TOPIC_MESSAGE: 6;
}

export const Action: ActionMap;
