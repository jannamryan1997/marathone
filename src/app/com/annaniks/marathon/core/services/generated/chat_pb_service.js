/* eslint-disable */
// package: 
// file: chat.proto

var chat_pb = require("./chat_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Chat = (function () {
  function Chat() {}
  Chat.serviceName = "Chat";
  return Chat;
}());

Chat.SingleUpStream = {
  methodName: "SingleUpStream",
  service: Chat,
  requestStream: false,
  responseStream: false,
  requestType: chat_pb.ActionRequest,
  responseType: chat_pb.ActionResponse
};

Chat.SingleDownStream = {
  methodName: "SingleDownStream",
  service: Chat,
  requestStream: false,
  responseStream: true,
  requestType: chat_pb.ActionRequest,
  responseType: chat_pb.ActionResponse
};

exports.Chat = Chat;

function ChatClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChatClient.prototype.singleUpStream = function singleUpStream(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Chat.SingleUpStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatClient.prototype.singleDownStream = function singleDownStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Chat.SingleDownStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ChatClient = ChatClient;

