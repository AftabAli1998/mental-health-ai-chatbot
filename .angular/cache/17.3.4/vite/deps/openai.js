import {
  __async,
  __asyncGenerator,
  __await,
  __export,
  __forAwait,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-U7X665IQ.js";

// node_modules/openai/version.mjs
var VERSION = "4.36.0";

// node_modules/openai/_shims/registry.mjs
var auto = false;
var kind = void 0;
var fetch2 = void 0;
var Request2 = void 0;
var Response2 = void 0;
var Headers2 = void 0;
var FormData2 = void 0;
var Blob2 = void 0;
var File2 = void 0;
var ReadableStream2 = void 0;
var getMultipartRequestOptions = void 0;
var getDefaultAgent = void 0;
var fileFromPath = void 0;
var isFsReadStream = void 0;
function setShims(shims, options = { auto: false }) {
  if (auto) {
    throw new Error(`you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`);
  }
  if (kind) {
    throw new Error(`can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${kind}'\``);
  }
  auto = options.auto;
  kind = shims.kind;
  fetch2 = shims.fetch;
  Request2 = shims.Request;
  Response2 = shims.Response;
  Headers2 = shims.Headers;
  FormData2 = shims.FormData;
  Blob2 = shims.Blob;
  File2 = shims.File;
  ReadableStream2 = shims.ReadableStream;
  getMultipartRequestOptions = shims.getMultipartRequestOptions;
  getDefaultAgent = shims.getDefaultAgent;
  fileFromPath = shims.fileFromPath;
  isFsReadStream = shims.isFsReadStream;
}

// node_modules/openai/_shims/MultipartBody.mjs
var MultipartBody = class {
  constructor(body) {
    this.body = body;
  }
  get [Symbol.toStringTag]() {
    return "MultipartBody";
  }
};

// node_modules/openai/_shims/web-runtime.mjs
function getRuntime({ manuallyImported } = {}) {
  const recommendation = manuallyImported ? `You may need to use polyfills` : `Add one of these imports before your first \`import … from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
  let _fetch, _Request, _Response, _Headers;
  try {
    _fetch = fetch;
    _Request = Request;
    _Response = Response;
    _Headers = Headers;
  } catch (error) {
    throw new Error(`this environment is missing the following Web Fetch API type: ${error.message}. ${recommendation}`);
  }
  return {
    kind: "web",
    fetch: _fetch,
    Request: _Request,
    Response: _Response,
    Headers: _Headers,
    FormData: (
      // @ts-ignore
      typeof FormData !== "undefined" ? FormData : class FormData {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${recommendation}`);
        }
      }
    ),
    Blob: typeof Blob !== "undefined" ? Blob : class Blob {
      constructor() {
        throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${recommendation}`);
      }
    },
    File: (
      // @ts-ignore
      typeof File !== "undefined" ? File : class File {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${recommendation}`);
        }
      }
    ),
    ReadableStream: (
      // @ts-ignore
      typeof ReadableStream !== "undefined" ? ReadableStream : class ReadableStream {
        // @ts-ignore
        constructor() {
          throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${recommendation}`);
        }
      }
    ),
    getMultipartRequestOptions: (form, opts) => __async(this, null, function* () {
      return __spreadProps(__spreadValues({}, opts), {
        body: new MultipartBody(form)
      });
    }),
    getDefaultAgent: (url) => void 0,
    fileFromPath: () => {
      throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads");
    },
    isFsReadStream: (value) => false
  };
}

// node_modules/openai/_shims/index.mjs
if (!kind)
  setShims(getRuntime(), { auto: true });

// node_modules/openai/error.mjs
var error_exports = {};
__export(error_exports, {
  APIConnectionError: () => APIConnectionError,
  APIConnectionTimeoutError: () => APIConnectionTimeoutError,
  APIError: () => APIError,
  APIUserAbortError: () => APIUserAbortError,
  AuthenticationError: () => AuthenticationError,
  BadRequestError: () => BadRequestError,
  ConflictError: () => ConflictError,
  InternalServerError: () => InternalServerError,
  NotFoundError: () => NotFoundError,
  OpenAIError: () => OpenAIError,
  PermissionDeniedError: () => PermissionDeniedError,
  RateLimitError: () => RateLimitError,
  UnprocessableEntityError: () => UnprocessableEntityError
});
var OpenAIError = class extends Error {
};
var APIError = class _APIError extends OpenAIError {
  constructor(status, error, message, headers) {
    super(`${_APIError.makeMessage(status, error, message)}`);
    this.status = status;
    this.headers = headers;
    this.request_id = headers?.["x-request-id"];
    const data = error;
    this.error = data;
    this.code = data?.["code"];
    this.param = data?.["param"];
    this.type = data?.["type"];
  }
  static makeMessage(status, error, message) {
    const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
    if (status && msg) {
      return `${status} ${msg}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (msg) {
      return msg;
    }
    return "(no status code or body)";
  }
  static generate(status, errorResponse, message, headers) {
    if (!status) {
      return new APIConnectionError({ cause: castToError(errorResponse) });
    }
    const error = errorResponse?.["error"];
    if (status === 400) {
      return new BadRequestError(status, error, message, headers);
    }
    if (status === 401) {
      return new AuthenticationError(status, error, message, headers);
    }
    if (status === 403) {
      return new PermissionDeniedError(status, error, message, headers);
    }
    if (status === 404) {
      return new NotFoundError(status, error, message, headers);
    }
    if (status === 409) {
      return new ConflictError(status, error, message, headers);
    }
    if (status === 422) {
      return new UnprocessableEntityError(status, error, message, headers);
    }
    if (status === 429) {
      return new RateLimitError(status, error, message, headers);
    }
    if (status >= 500) {
      return new InternalServerError(status, error, message, headers);
    }
    return new _APIError(status, error, message, headers);
  }
};
var APIUserAbortError = class extends APIError {
  constructor({ message } = {}) {
    super(void 0, void 0, message || "Request was aborted.", void 0);
    this.status = void 0;
  }
};
var APIConnectionError = class extends APIError {
  constructor({ message, cause }) {
    super(void 0, void 0, message || "Connection error.", void 0);
    this.status = void 0;
    if (cause)
      this.cause = cause;
  }
};
var APIConnectionTimeoutError = class extends APIConnectionError {
  constructor({ message } = {}) {
    super({ message: message ?? "Request timed out." });
  }
};
var BadRequestError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 400;
  }
};
var AuthenticationError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 401;
  }
};
var PermissionDeniedError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 403;
  }
};
var NotFoundError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 404;
  }
};
var ConflictError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 409;
  }
};
var UnprocessableEntityError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 422;
  }
};
var RateLimitError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 429;
  }
};
var InternalServerError = class extends APIError {
};

// node_modules/openai/streaming.mjs
var Stream = class _Stream {
  constructor(iterator, controller) {
    this.iterator = iterator;
    this.controller = controller;
  }
  static fromSSEResponse(response, controller) {
    let consumed = false;
    function iterator() {
      return __asyncGenerator(this, null, function* () {
        if (consumed) {
          throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        }
        consumed = true;
        let done = false;
        try {
          try {
            for (var iter = __forAwait(_iterSSEMessages(response, controller)), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
              const sse = temp.value;
              if (done)
                continue;
              if (sse.data.startsWith("[DONE]")) {
                done = true;
                continue;
              }
              if (sse.event === null) {
                let data;
                try {
                  data = JSON.parse(sse.data);
                } catch (e) {
                  console.error(`Could not parse message into JSON:`, sse.data);
                  console.error(`From chunk:`, sse.raw);
                  throw e;
                }
                if (data && data.error) {
                  throw new APIError(void 0, data.error, void 0, void 0);
                }
                yield data;
              } else {
                let data;
                try {
                  data = JSON.parse(sse.data);
                } catch (e) {
                  console.error(`Could not parse message into JSON:`, sse.data);
                  console.error(`From chunk:`, sse.raw);
                  throw e;
                }
                if (sse.event == "error") {
                  throw new APIError(void 0, data.error, data.message, void 0);
                }
                yield { event: sse.event, data };
              }
            }
          } catch (temp) {
            error = [temp];
          } finally {
            try {
              more && (temp = iter.return) && (yield new __await(temp.call(iter)));
            } finally {
              if (error)
                throw error[0];
            }
          }
          done = true;
        } catch (e) {
          if (e instanceof Error && e.name === "AbortError")
            return;
          throw e;
        } finally {
          if (!done)
            controller.abort();
        }
      });
    }
    return new _Stream(iterator, controller);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */
  static fromReadableStream(readableStream, controller) {
    let consumed = false;
    function iterLines() {
      return __asyncGenerator(this, null, function* () {
        const lineDecoder = new LineDecoder();
        const iter = readableStreamAsyncIterable(readableStream);
        try {
          for (var iter2 = __forAwait(iter), more, temp, error; more = !(temp = yield new __await(iter2.next())).done; more = false) {
            const chunk = temp.value;
            for (const line of lineDecoder.decode(chunk)) {
              yield line;
            }
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter2.return) && (yield new __await(temp.call(iter2)));
          } finally {
            if (error)
              throw error[0];
          }
        }
        for (const line of lineDecoder.flush()) {
          yield line;
        }
      });
    }
    function iterator() {
      return __asyncGenerator(this, null, function* () {
        if (consumed) {
          throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        }
        consumed = true;
        let done = false;
        try {
          try {
            for (var iter = __forAwait(iterLines()), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
              const line = temp.value;
              if (done)
                continue;
              if (line)
                yield JSON.parse(line);
            }
          } catch (temp) {
            error = [temp];
          } finally {
            try {
              more && (temp = iter.return) && (yield new __await(temp.call(iter)));
            } finally {
              if (error)
                throw error[0];
            }
          }
          done = true;
        } catch (e) {
          if (e instanceof Error && e.name === "AbortError")
            return;
          throw e;
        } finally {
          if (!done)
            controller.abort();
        }
      });
    }
    return new _Stream(iterator, controller);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const left = [];
    const right = [];
    const iterator = this.iterator();
    const teeIterator = (queue) => {
      return {
        next: () => {
          if (queue.length === 0) {
            const result = iterator.next();
            left.push(result);
            right.push(result);
          }
          return queue.shift();
        }
      };
    };
    return [
      new _Stream(() => teeIterator(left), this.controller),
      new _Stream(() => teeIterator(right), this.controller)
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const self = this;
    let iter;
    const encoder = new TextEncoder();
    return new ReadableStream2({
      start() {
        return __async(this, null, function* () {
          iter = self[Symbol.asyncIterator]();
        });
      },
      pull(ctrl) {
        return __async(this, null, function* () {
          try {
            const { value, done } = yield iter.next();
            if (done)
              return ctrl.close();
            const bytes = encoder.encode(JSON.stringify(value) + "\n");
            ctrl.enqueue(bytes);
          } catch (err) {
            ctrl.error(err);
          }
        });
      },
      cancel() {
        return __async(this, null, function* () {
          yield iter.return?.();
        });
      }
    });
  }
};
function _iterSSEMessages(response, controller) {
  return __asyncGenerator(this, null, function* () {
    if (!response.body) {
      controller.abort();
      throw new OpenAIError(`Attempted to iterate over a response with no body`);
    }
    const sseDecoder = new SSEDecoder();
    const lineDecoder = new LineDecoder();
    const iter = readableStreamAsyncIterable(response.body);
    try {
      for (var iter2 = __forAwait(iterSSEChunks(iter)), more, temp, error; more = !(temp = yield new __await(iter2.next())).done; more = false) {
        const sseChunk = temp.value;
        for (const line of lineDecoder.decode(sseChunk)) {
          const sse = sseDecoder.decode(line);
          if (sse)
            yield sse;
        }
      }
    } catch (temp) {
      error = [temp];
    } finally {
      try {
        more && (temp = iter2.return) && (yield new __await(temp.call(iter2)));
      } finally {
        if (error)
          throw error[0];
      }
    }
    for (const line of lineDecoder.flush()) {
      const sse = sseDecoder.decode(line);
      if (sse)
        yield sse;
    }
  });
}
function iterSSEChunks(iterator) {
  return __asyncGenerator(this, null, function* () {
    let data = new Uint8Array();
    try {
      for (var iter = __forAwait(iterator), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
        const chunk = temp.value;
        if (chunk == null) {
          continue;
        }
        const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
        let newData = new Uint8Array(data.length + binaryChunk.length);
        newData.set(data);
        newData.set(binaryChunk, data.length);
        data = newData;
        let patternIndex;
        while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
          yield data.slice(0, patternIndex);
          data = data.slice(patternIndex);
        }
      }
    } catch (temp) {
      error = [temp];
    } finally {
      try {
        more && (temp = iter.return) && (yield new __await(temp.call(iter)));
      } finally {
        if (error)
          throw error[0];
      }
    }
    if (data.length > 0) {
      yield data;
    }
  });
}
function findDoubleNewlineIndex(buffer) {
  const newline = 10;
  const carriage = 13;
  for (let i = 0; i < buffer.length - 2; i++) {
    if (buffer[i] === newline && buffer[i + 1] === newline) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === carriage) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === newline && i + 3 < buffer.length && buffer[i + 2] === carriage && buffer[i + 3] === newline) {
      return i + 4;
    }
  }
  return -1;
}
var SSEDecoder = class {
  constructor() {
    this.event = null;
    this.data = [];
    this.chunks = [];
  }
  decode(line) {
    if (line.endsWith("\r")) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      if (!this.event && !this.data.length)
        return null;
      const sse = {
        event: this.event,
        data: this.data.join("\n"),
        raw: this.chunks
      };
      this.event = null;
      this.data = [];
      this.chunks = [];
      return sse;
    }
    this.chunks.push(line);
    if (line.startsWith(":")) {
      return null;
    }
    let [fieldname, _, value] = partition(line, ":");
    if (value.startsWith(" ")) {
      value = value.substring(1);
    }
    if (fieldname === "event") {
      this.event = value;
    } else if (fieldname === "data") {
      this.data.push(value);
    }
    return null;
  }
};
var LineDecoder = class _LineDecoder {
  constructor() {
    this.buffer = [];
    this.trailingCR = false;
  }
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = "\r" + text;
      this.trailingCR = false;
    }
    if (text.endsWith("\r")) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) {
      return [];
    }
    const trailingNewline = _LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || "");
    let lines = text.split(_LineDecoder.NEWLINE_REGEXP);
    if (trailingNewline) {
      lines.pop();
    }
    if (lines.length === 1 && !trailingNewline) {
      this.buffer.push(lines[0]);
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer.join("") + lines[0], ...lines.slice(1)];
      this.buffer = [];
    }
    if (!trailingNewline) {
      this.buffer = [lines.pop() || ""];
    }
    return lines;
  }
  decodeText(bytes) {
    if (bytes == null)
      return "";
    if (typeof bytes === "string")
      return bytes;
    if (typeof Buffer !== "undefined") {
      if (bytes instanceof Buffer) {
        return bytes.toString();
      }
      if (bytes instanceof Uint8Array) {
        return Buffer.from(bytes).toString();
      }
      throw new OpenAIError(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
    }
    if (typeof TextDecoder !== "undefined") {
      if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
        this.textDecoder ?? (this.textDecoder = new TextDecoder("utf8"));
        return this.textDecoder.decode(bytes);
      }
      throw new OpenAIError(`Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`);
    }
    throw new OpenAIError(`Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`);
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR) {
      return [];
    }
    const lines = [this.buffer.join("")];
    this.buffer = [];
    this.trailingCR = false;
    return lines;
  }
};
LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function partition(str2, delimiter) {
  const index = str2.indexOf(delimiter);
  if (index !== -1) {
    return [str2.substring(0, index), delimiter, str2.substring(index + delimiter.length)];
  }
  return [str2, "", ""];
}
function readableStreamAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator])
    return stream;
  const reader = stream.getReader();
  return {
    next() {
      return __async(this, null, function* () {
        try {
          const result = yield reader.read();
          if (result?.done)
            reader.releaseLock();
          return result;
        } catch (e) {
          reader.releaseLock();
          throw e;
        }
      });
    },
    return() {
      return __async(this, null, function* () {
        const cancelPromise = reader.cancel();
        reader.releaseLock();
        yield cancelPromise;
        return { done: true, value: void 0 };
      });
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

// node_modules/openai/uploads.mjs
var isResponseLike = (value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function";
var isFileLike = (value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value);
var isBlobLike = (value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function";
var isUploadable = (value) => {
  return isFileLike(value) || isResponseLike(value) || isFsReadStream(value);
};
function toFile(value, name, options) {
  return __async(this, null, function* () {
    value = yield value;
    options ?? (options = isFileLike(value) ? { lastModified: value.lastModified, type: value.type } : {});
    if (isResponseLike(value)) {
      const blob = yield value.blob();
      name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
      return new File2([blob], name, options);
    }
    const bits = yield getBytes(value);
    name || (name = getName(value) ?? "unknown_file");
    if (!options.type) {
      const type = bits[0]?.type;
      if (typeof type === "string") {
        options = __spreadProps(__spreadValues({}, options), { type });
      }
    }
    return new File2(bits, name, options);
  });
}
function getBytes(value) {
  return __async(this, null, function* () {
    let parts = [];
    if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
    value instanceof ArrayBuffer) {
      parts.push(value);
    } else if (isBlobLike(value)) {
      parts.push(yield value.arrayBuffer());
    } else if (isAsyncIterableIterator(value)) {
      try {
        for (var iter = __forAwait(value), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const chunk = temp.value;
          parts.push(chunk);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
    } else {
      throw new Error(`Unexpected data type: ${typeof value}; constructor: ${value?.constructor?.name}; props: ${propsForError(value)}`);
    }
    return parts;
  });
}
function propsForError(value) {
  const props = Object.getOwnPropertyNames(value);
  return `[${props.map((p) => `"${p}"`).join(", ")}]`;
}
function getName(value) {
  return getStringFromMaybeBuffer(value.name) || getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
  getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop();
}
var getStringFromMaybeBuffer = (x) => {
  if (typeof x === "string")
    return x;
  if (typeof Buffer !== "undefined" && x instanceof Buffer)
    return String(x);
  return void 0;
};
var isAsyncIterableIterator = (value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function";
var isMultipartBody = (body) => body && typeof body === "object" && body.body && body[Symbol.toStringTag] === "MultipartBody";
var multipartFormRequestOptions = (opts) => __async(void 0, null, function* () {
  const form = yield createForm(opts.body);
  return getMultipartRequestOptions(form, opts);
});
var createForm = (body) => __async(void 0, null, function* () {
  const form = new FormData2();
  yield Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
  return form;
});
var addFormValue = (form, key, value) => __async(void 0, null, function* () {
  if (value === void 0)
    return;
  if (value == null) {
    throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    form.append(key, String(value));
  } else if (isUploadable(value)) {
    const file = yield toFile(value);
    form.append(key, file);
  } else if (Array.isArray(value)) {
    yield Promise.all(value.map((entry) => addFormValue(form, key + "[]", entry)));
  } else if (typeof value === "object") {
    yield Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)));
  } else {
    throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
  }
});

// node_modules/openai/core.mjs
var __classPrivateFieldSet = function(receiver, state, value, kind2, f) {
  if (kind2 === "m")
    throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractPage_client;
function defaultParseResponse(props) {
  return __async(this, null, function* () {
    const { response } = props;
    if (props.options.stream) {
      debug("response", response.status, response.url, response.headers, response.body);
      if (props.options.__streamClass) {
        return props.options.__streamClass.fromSSEResponse(response, props.controller);
      }
      return Stream.fromSSEResponse(response, props.controller);
    }
    if (response.status === 204) {
      return null;
    }
    if (props.options.__binaryResponse) {
      return response;
    }
    const contentType = response.headers.get("content-type");
    const isJSON = contentType?.includes("application/json") || contentType?.includes("application/vnd.api+json");
    if (isJSON) {
      const json = yield response.json();
      debug("response", response.status, response.url, response.headers, json);
      return json;
    }
    const text = yield response.text();
    debug("response", response.status, response.url, response.headers, text);
    return text;
  });
}
var APIPromise = class _APIPromise extends Promise {
  constructor(responsePromise, parseResponse = defaultParseResponse) {
    super((resolve) => {
      resolve(null);
    });
    this.responsePromise = responsePromise;
    this.parseResponse = parseResponse;
  }
  _thenUnwrap(transform) {
    return new _APIPromise(this.responsePromise, (props) => __async(this, null, function* () {
      return transform(yield this.parseResponse(props));
    }));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */
  asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */
  withResponse() {
    return __async(this, null, function* () {
      const [data, response] = yield Promise.all([this.parse(), this.asResponse()]);
      return { data, response };
    });
  }
  parse() {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then(this.parseResponse);
    }
    return this.parsedPromise;
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
};
var APIClient = class {
  constructor({
    baseURL,
    maxRetries = 2,
    timeout = 6e5,
    // 10 minutes
    httpAgent,
    fetch: overridenFetch
  }) {
    this.baseURL = baseURL;
    this.maxRetries = validatePositiveInteger("maxRetries", maxRetries);
    this.timeout = validatePositiveInteger("timeout", timeout);
    this.httpAgent = httpAgent;
    this.fetch = overridenFetch ?? fetch2;
  }
  authHeaders(opts) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(opts) {
    return __spreadValues(__spreadValues({
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": this.getUserAgent()
    }, getPlatformHeaders()), this.authHeaders(opts));
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(headers, customHeaders) {
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${uuid4()}`;
  }
  get(path, opts) {
    return this.methodRequest("get", path, opts);
  }
  post(path, opts) {
    return this.methodRequest("post", path, opts);
  }
  patch(path, opts) {
    return this.methodRequest("patch", path, opts);
  }
  put(path, opts) {
    return this.methodRequest("put", path, opts);
  }
  delete(path, opts) {
    return this.methodRequest("delete", path, opts);
  }
  methodRequest(method, path, opts) {
    return this.request(Promise.resolve(opts).then((opts2) => __spreadValues({ method, path }, opts2)));
  }
  getAPIList(path, Page2, opts) {
    return this.requestAPIList(Page2, __spreadValues({ method: "get", path }, opts));
  }
  calculateContentLength(body) {
    if (typeof body === "string") {
      if (typeof Buffer !== "undefined") {
        return Buffer.byteLength(body, "utf8").toString();
      }
      if (typeof TextEncoder !== "undefined") {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(body);
        return encoded.length.toString();
      }
    }
    return null;
  }
  buildRequest(options) {
    const { method, path, query, headers = {} } = options;
    const body = isMultipartBody(options.body) ? options.body.body : options.body ? JSON.stringify(options.body, null, 2) : null;
    const contentLength = this.calculateContentLength(body);
    const url = this.buildURL(path, query);
    if ("timeout" in options)
      validatePositiveInteger("timeout", options.timeout);
    const timeout = options.timeout ?? this.timeout;
    const httpAgent = options.httpAgent ?? this.httpAgent ?? getDefaultAgent(url);
    const minAgentTimeout = timeout + 1e3;
    if (typeof httpAgent?.options?.timeout === "number" && minAgentTimeout > (httpAgent.options.timeout ?? 0)) {
      httpAgent.options.timeout = minAgentTimeout;
    }
    if (this.idempotencyHeader && method !== "get") {
      if (!options.idempotencyKey)
        options.idempotencyKey = this.defaultIdempotencyKey();
      headers[this.idempotencyHeader] = options.idempotencyKey;
    }
    const reqHeaders = this.buildHeaders({ options, headers, contentLength });
    const req = __spreadProps(__spreadValues(__spreadProps(__spreadValues({
      method
    }, body && { body }), {
      headers: reqHeaders
    }), httpAgent && { agent: httpAgent }), {
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: options.signal ?? null
    });
    return { req, url, timeout };
  }
  buildHeaders({ options, headers, contentLength }) {
    const reqHeaders = {};
    if (contentLength) {
      reqHeaders["content-length"] = contentLength;
    }
    const defaultHeaders = this.defaultHeaders(options);
    applyHeadersMut(reqHeaders, defaultHeaders);
    applyHeadersMut(reqHeaders, headers);
    if (isMultipartBody(options.body) && kind !== "node") {
      delete reqHeaders["content-type"];
    }
    this.validateHeaders(reqHeaders, headers);
    return reqHeaders;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  prepareOptions(options) {
    return __async(this, null, function* () {
    });
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  prepareRequest(_0, _1) {
    return __async(this, arguments, function* (request, { url, options }) {
    });
  }
  parseHeaders(headers) {
    return !headers ? {} : Symbol.iterator in headers ? Object.fromEntries(Array.from(headers).map((header) => [...header])) : __spreadValues({}, headers);
  }
  makeStatusError(status, error, message, headers) {
    return APIError.generate(status, error, message, headers);
  }
  request(options, remainingRetries = null) {
    return new APIPromise(this.makeRequest(options, remainingRetries));
  }
  makeRequest(optionsInput, retriesRemaining) {
    return __async(this, null, function* () {
      const options = yield optionsInput;
      if (retriesRemaining == null) {
        retriesRemaining = options.maxRetries ?? this.maxRetries;
      }
      yield this.prepareOptions(options);
      const { req, url, timeout } = this.buildRequest(options);
      yield this.prepareRequest(req, { url, options });
      debug("request", url, options, req.headers);
      if (options.signal?.aborted) {
        throw new APIUserAbortError();
      }
      const controller = new AbortController();
      const response = yield this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
      if (response instanceof Error) {
        if (options.signal?.aborted) {
          throw new APIUserAbortError();
        }
        if (retriesRemaining) {
          return this.retryRequest(options, retriesRemaining);
        }
        if (response.name === "AbortError") {
          throw new APIConnectionTimeoutError();
        }
        throw new APIConnectionError({ cause: response });
      }
      const responseHeaders = createResponseHeaders(response.headers);
      if (!response.ok) {
        if (retriesRemaining && this.shouldRetry(response)) {
          const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
          debug(`response (error; ${retryMessage2})`, response.status, url, responseHeaders);
          return this.retryRequest(options, retriesRemaining, responseHeaders);
        }
        const errText = yield response.text().catch((e) => castToError(e).message);
        const errJSON = safeJSON(errText);
        const errMessage = errJSON ? void 0 : errText;
        const retryMessage = retriesRemaining ? `(error; no more retries left)` : `(error; not retryable)`;
        debug(`response (error; ${retryMessage})`, response.status, url, responseHeaders, errMessage);
        const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
        throw err;
      }
      return { response, options, controller };
    });
  }
  requestAPIList(Page2, options) {
    const request = this.makeRequest(options, null);
    return new PagePromise(this, request, Page2);
  }
  buildURL(path, query) {
    const url = isAbsoluteURL(path) ? new URL(path) : new URL(this.baseURL + (this.baseURL.endsWith("/") && path.startsWith("/") ? path.slice(1) : path));
    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = __spreadValues(__spreadValues({}, defaultQuery), query);
    }
    if (typeof query === "object" && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }
    return url.toString();
  }
  stringifyQuery(query) {
    return Object.entries(query).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      if (value === null) {
        return `${encodeURIComponent(key)}=`;
      }
      throw new OpenAIError(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  fetchWithTimeout(url, init, ms, controller) {
    return __async(this, null, function* () {
      const _a2 = init || {}, { signal } = _a2, options = __objRest(_a2, ["signal"]);
      if (signal)
        signal.addEventListener("abort", () => controller.abort());
      const timeout = setTimeout(() => controller.abort(), ms);
      return this.getRequestClient().fetch.call(void 0, url, __spreadValues({ signal: controller.signal }, options)).finally(() => {
        clearTimeout(timeout);
      });
    });
  }
  getRequestClient() {
    return { fetch: this.fetch };
  }
  shouldRetry(response) {
    const shouldRetryHeader = response.headers.get("x-should-retry");
    if (shouldRetryHeader === "true")
      return true;
    if (shouldRetryHeader === "false")
      return false;
    if (response.status === 408)
      return true;
    if (response.status === 409)
      return true;
    if (response.status === 429)
      return true;
    if (response.status >= 500)
      return true;
    return false;
  }
  retryRequest(options, retriesRemaining, responseHeaders) {
    return __async(this, null, function* () {
      let timeoutMillis;
      const retryAfterMillisHeader = responseHeaders?.["retry-after-ms"];
      if (retryAfterMillisHeader) {
        const timeoutMs = parseFloat(retryAfterMillisHeader);
        if (!Number.isNaN(timeoutMs)) {
          timeoutMillis = timeoutMs;
        }
      }
      const retryAfterHeader = responseHeaders?.["retry-after"];
      if (retryAfterHeader && !timeoutMillis) {
        const timeoutSeconds = parseFloat(retryAfterHeader);
        if (!Number.isNaN(timeoutSeconds)) {
          timeoutMillis = timeoutSeconds * 1e3;
        } else {
          timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
        }
      }
      if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1e3)) {
        const maxRetries = options.maxRetries ?? this.maxRetries;
        timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
      }
      yield sleep(timeoutMillis);
      return this.makeRequest(options, retriesRemaining - 1);
    });
  }
  calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8;
    const numRetries = maxRetries - retriesRemaining;
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
    const jitter = 1 - Math.random() * 0.25;
    return sleepSeconds * jitter * 1e3;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${VERSION}`;
  }
};
var AbstractPage = class {
  constructor(client, response, body, options) {
    _AbstractPage_client.set(this, void 0);
    __classPrivateFieldSet(this, _AbstractPage_client, client, "f");
    this.options = options;
    this.response = response;
    this.body = body;
  }
  hasNextPage() {
    const items = this.getPaginatedItems();
    if (!items.length)
      return false;
    return this.nextPageInfo() != null;
  }
  getNextPage() {
    return __async(this, null, function* () {
      const nextInfo = this.nextPageInfo();
      if (!nextInfo) {
        throw new OpenAIError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
      }
      const nextOptions = __spreadValues({}, this.options);
      if ("params" in nextInfo && typeof nextOptions.query === "object") {
        nextOptions.query = __spreadValues(__spreadValues({}, nextOptions.query), nextInfo.params);
      } else if ("url" in nextInfo) {
        const params = [...Object.entries(nextOptions.query || {}), ...nextInfo.url.searchParams.entries()];
        for (const [key, value] of params) {
          nextInfo.url.searchParams.set(key, value);
        }
        nextOptions.query = void 0;
        nextOptions.path = nextInfo.url.toString();
      }
      return yield __classPrivateFieldGet(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
    });
  }
  iterPages() {
    return __asyncGenerator(this, null, function* () {
      let page = this;
      yield page;
      while (page.hasNextPage()) {
        page = yield new __await(page.getNextPage());
        yield page;
      }
    });
  }
  [(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return __asyncGenerator(this, null, function* () {
      try {
        for (var iter = __forAwait(this.iterPages()), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
          const page = temp.value;
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield new __await(temp.call(iter)));
        } finally {
          if (error)
            throw error[0];
        }
      }
    });
  }
};
var PagePromise = class extends APIPromise {
  constructor(client, request, Page2) {
    super(request, (props) => __async(this, null, function* () {
      return new Page2(client, props.response, yield defaultParseResponse(props), props.options);
    }));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, null, function* () {
      const page = yield new __await(this);
      try {
        for (var iter = __forAwait(page), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
          const item = temp.value;
          yield item;
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield new __await(temp.call(iter)));
        } finally {
          if (error)
            throw error[0];
        }
      }
    });
  }
};
var createResponseHeaders = (headers) => {
  return new Proxy(Object.fromEntries(
    // @ts-ignore
    headers.entries()
  ), {
    get(target, name) {
      const key = name.toString();
      return target[key.toLowerCase()] || target[key];
    }
  });
};
var requestOptionsKeys = {
  method: true,
  path: true,
  query: true,
  body: true,
  headers: true,
  maxRetries: true,
  stream: true,
  timeout: true,
  httpAgent: true,
  signal: true,
  idempotencyKey: true,
  __binaryResponse: true,
  __streamClass: true
};
var isRequestOptions = (obj) => {
  return typeof obj === "object" && obj !== null && !isEmptyObj(obj) && Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k));
};
var getPlatformProperties = () => {
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(Deno.build.os),
      "X-Stainless-Arch": normalizeArch(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
  }
  if (typeof EdgeRuntime !== "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": process.version
    };
  }
  if (Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(process.platform),
      "X-Stainless-Arch": normalizeArch(process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": process.version
    };
  }
  const browserInfo = getBrowserInfo();
  if (browserInfo) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
      "X-Stainless-Runtime-Version": browserInfo.version
    };
  }
  return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": VERSION,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function getBrowserInfo() {
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }
  const browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
var normalizeArch = (arch) => {
  if (arch === "x32")
    return "x32";
  if (arch === "x86_64" || arch === "x64")
    return "x64";
  if (arch === "arm")
    return "arm";
  if (arch === "aarch64" || arch === "arm64")
    return "arm64";
  if (arch)
    return `other:${arch}`;
  return "unknown";
};
var normalizePlatform = (platform) => {
  platform = platform.toLowerCase();
  if (platform.includes("ios"))
    return "iOS";
  if (platform === "android")
    return "Android";
  if (platform === "darwin")
    return "MacOS";
  if (platform === "win32")
    return "Windows";
  if (platform === "freebsd")
    return "FreeBSD";
  if (platform === "openbsd")
    return "OpenBSD";
  if (platform === "linux")
    return "Linux";
  if (platform)
    return `Other:${platform}`;
  return "Unknown";
};
var _platformHeaders;
var getPlatformHeaders = () => {
  return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
};
var safeJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return void 0;
  }
};
var startsWithSchemeRegexp = new RegExp("^(?:[a-z]+:)?//", "i");
var isAbsoluteURL = (url) => {
  return startsWithSchemeRegexp.test(url);
};
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var validatePositiveInteger = (name, n) => {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new OpenAIError(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new OpenAIError(`${name} must be a positive integer`);
  }
  return n;
};
var castToError = (err) => {
  if (err instanceof Error)
    return err;
  return new Error(err);
};
var readEnv = (env) => {
  if (typeof process !== "undefined") {
    return process.env?.[env]?.trim() ?? void 0;
  }
  if (typeof Deno !== "undefined") {
    return Deno.env?.get?.(env)?.trim();
  }
  return void 0;
};
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function applyHeadersMut(targetHeaders, newHeaders) {
  for (const k in newHeaders) {
    if (!hasOwn(newHeaders, k))
      continue;
    const lowerKey = k.toLowerCase();
    if (!lowerKey)
      continue;
    const val = newHeaders[k];
    if (val === null) {
      delete targetHeaders[lowerKey];
    } else if (val !== void 0) {
      targetHeaders[lowerKey] = val;
    }
  }
}
function debug(action, ...args) {
  if (typeof process !== "undefined" && process?.env?.["DEBUG"] === "true") {
    console.log(`OpenAI:DEBUG:${action}`, ...args);
  }
}
var uuid4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
var isRunningInBrowser = () => {
  return (
    // @ts-ignore
    typeof window !== "undefined" && // @ts-ignore
    typeof window.document !== "undefined" && // @ts-ignore
    typeof navigator !== "undefined"
  );
};
function isObj(obj) {
  return obj != null && typeof obj === "object" && !Array.isArray(obj);
}

// node_modules/openai/pagination.mjs
var Page = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
    this.object = body.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
};
var CursorPage = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const info = this.nextPageInfo();
    if (!info)
      return null;
    if ("params" in info)
      return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length)
      return null;
    return params;
  }
  nextPageInfo() {
    const data = this.getPaginatedItems();
    if (!data.length) {
      return null;
    }
    const id = data[data.length - 1]?.id;
    if (!id) {
      return null;
    }
    return { params: { after: id } };
  }
};

// node_modules/openai/resource.mjs
var APIResource = class {
  constructor(client) {
    this._client = client;
  }
};

// node_modules/openai/resources/chat/completions.mjs
var Completions = class extends APIResource {
  create(body, options) {
    return this._client.post("/chat/completions", __spreadProps(__spreadValues({ body }, options), { stream: body.stream ?? false }));
  }
};
/* @__PURE__ */ (function(Completions4) {
})(Completions || (Completions = {}));

// node_modules/openai/resources/chat/chat.mjs
var Chat = class extends APIResource {
  constructor() {
    super(...arguments);
    this.completions = new Completions(this._client);
  }
};
(function(Chat3) {
  Chat3.Completions = Completions;
})(Chat || (Chat = {}));

// node_modules/openai/resources/audio/speech.mjs
var Speech = class extends APIResource {
  /**
   * Generates audio from the input text.
   */
  create(body, options) {
    return this._client.post("/audio/speech", __spreadProps(__spreadValues({ body }, options), { __binaryResponse: true }));
  }
};
/* @__PURE__ */ (function(Speech2) {
})(Speech || (Speech = {}));

// node_modules/openai/resources/audio/transcriptions.mjs
var Transcriptions = class extends APIResource {
  /**
   * Transcribes audio into the input language.
   */
  create(body, options) {
    return this._client.post("/audio/transcriptions", multipartFormRequestOptions(__spreadValues({ body }, options)));
  }
};
/* @__PURE__ */ (function(Transcriptions2) {
})(Transcriptions || (Transcriptions = {}));

// node_modules/openai/resources/audio/translations.mjs
var Translations = class extends APIResource {
  /**
   * Translates audio into English.
   */
  create(body, options) {
    return this._client.post("/audio/translations", multipartFormRequestOptions(__spreadValues({ body }, options)));
  }
};
/* @__PURE__ */ (function(Translations2) {
})(Translations || (Translations = {}));

// node_modules/openai/resources/audio/audio.mjs
var Audio = class extends APIResource {
  constructor() {
    super(...arguments);
    this.transcriptions = new Transcriptions(this._client);
    this.translations = new Translations(this._client);
    this.speech = new Speech(this._client);
  }
};
(function(Audio2) {
  Audio2.Transcriptions = Transcriptions;
  Audio2.Translations = Translations;
  Audio2.Speech = Speech;
})(Audio || (Audio = {}));

// node_modules/openai/resources/batches.mjs
var Batches = class extends APIResource {
  /**
   * Creates and executes a batch from an uploaded file of requests
   */
  create(body, options) {
    return this._client.post("/batches", __spreadValues({ body }, options));
  }
  /**
   * Retrieves a batch.
   */
  retrieve(batchId, options) {
    return this._client.get(`/batches/${batchId}`, options);
  }
  /**
   * Cancels an in-progress batch.
   */
  cancel(batchId, options) {
    return this._client.post(`/batches/${batchId}/cancel`, options);
  }
};
/* @__PURE__ */ (function(Batches2) {
})(Batches || (Batches = {}));

// node_modules/openai/resources/beta/assistants/files.mjs
var Files = class extends APIResource {
  /**
   * Create an assistant file by attaching a
   * [File](https://platform.openai.com/docs/api-reference/files) to an
   * [assistant](https://platform.openai.com/docs/api-reference/assistants).
   */
  create(assistantId, body, options) {
    return this._client.post(`/assistants/${assistantId}/files`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Retrieves an AssistantFile.
   */
  retrieve(assistantId, fileId, options) {
    return this._client.get(`/assistants/${assistantId}/files/${fileId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  list(assistantId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(assistantId, {}, query);
    }
    return this._client.getAPIList(`/assistants/${assistantId}/files`, AssistantFilesPage, __spreadProps(__spreadValues({
      query
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Delete an assistant file.
   */
  del(assistantId, fileId, options) {
    return this._client.delete(`/assistants/${assistantId}/files/${fileId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
};
var AssistantFilesPage = class extends CursorPage {
};
(function(Files4) {
  Files4.AssistantFilesPage = AssistantFilesPage;
})(Files || (Files = {}));

// node_modules/openai/resources/beta/assistants/assistants.mjs
var Assistants = class extends APIResource {
  constructor() {
    super(...arguments);
    this.files = new Files(this._client);
  }
  /**
   * Create an assistant with a model and instructions.
   */
  create(body, options) {
    return this._client.post("/assistants", __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Retrieves an assistant.
   */
  retrieve(assistantId, options) {
    return this._client.get(`/assistants/${assistantId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Modifies an assistant.
   */
  update(assistantId, body, options) {
    return this._client.post(`/assistants/${assistantId}`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/assistants", AssistantsPage, __spreadProps(__spreadValues({
      query
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Delete an assistant.
   */
  del(assistantId, options) {
    return this._client.delete(`/assistants/${assistantId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
};
var AssistantsPage = class extends CursorPage {
};
(function(Assistants2) {
  Assistants2.AssistantsPage = AssistantsPage;
  Assistants2.Files = Files;
  Assistants2.AssistantFilesPage = AssistantFilesPage;
})(Assistants || (Assistants = {}));

// node_modules/openai/lib/RunnableFunction.mjs
function isRunnableFunctionWithParse(fn) {
  return typeof fn.parse === "function";
}

// node_modules/openai/lib/chatCompletionUtils.mjs
var isAssistantMessage = (message) => {
  return message?.role === "assistant";
};
var isFunctionMessage = (message) => {
  return message?.role === "function";
};
var isToolMessage = (message) => {
  return message?.role === "tool";
};

// node_modules/openai/lib/AbstractChatCompletionRunner.mjs
var __classPrivateFieldSet2 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m")
    throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractChatCompletionRunner_instances;
var _AbstractChatCompletionRunner_connectedPromise;
var _AbstractChatCompletionRunner_resolveConnectedPromise;
var _AbstractChatCompletionRunner_rejectConnectedPromise;
var _AbstractChatCompletionRunner_endPromise;
var _AbstractChatCompletionRunner_resolveEndPromise;
var _AbstractChatCompletionRunner_rejectEndPromise;
var _AbstractChatCompletionRunner_listeners;
var _AbstractChatCompletionRunner_ended;
var _AbstractChatCompletionRunner_errored;
var _AbstractChatCompletionRunner_aborted;
var _AbstractChatCompletionRunner_catchingPromiseCreated;
var _AbstractChatCompletionRunner_getFinalContent;
var _AbstractChatCompletionRunner_getFinalMessage;
var _AbstractChatCompletionRunner_getFinalFunctionCall;
var _AbstractChatCompletionRunner_getFinalFunctionCallResult;
var _AbstractChatCompletionRunner_calculateTotalUsage;
var _AbstractChatCompletionRunner_handleError;
var _AbstractChatCompletionRunner_validateParams;
var _AbstractChatCompletionRunner_stringifyFunctionCallResult;
var DEFAULT_MAX_CHAT_COMPLETIONS = 10;
var AbstractChatCompletionRunner = class {
  constructor() {
    _AbstractChatCompletionRunner_instances.add(this);
    this.controller = new AbortController();
    _AbstractChatCompletionRunner_connectedPromise.set(this, void 0);
    _AbstractChatCompletionRunner_resolveConnectedPromise.set(this, () => {
    });
    _AbstractChatCompletionRunner_rejectConnectedPromise.set(this, () => {
    });
    _AbstractChatCompletionRunner_endPromise.set(this, void 0);
    _AbstractChatCompletionRunner_resolveEndPromise.set(this, () => {
    });
    _AbstractChatCompletionRunner_rejectEndPromise.set(this, () => {
    });
    _AbstractChatCompletionRunner_listeners.set(this, {});
    this._chatCompletions = [];
    this.messages = [];
    _AbstractChatCompletionRunner_ended.set(this, false);
    _AbstractChatCompletionRunner_errored.set(this, false);
    _AbstractChatCompletionRunner_aborted.set(this, false);
    _AbstractChatCompletionRunner_catchingPromiseCreated.set(this, false);
    _AbstractChatCompletionRunner_handleError.set(this, (error) => {
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_errored, true, "f");
      if (error instanceof Error && error.name === "AbortError") {
        error = new APIUserAbortError();
      }
      if (error instanceof APIUserAbortError) {
        __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_aborted, true, "f");
        return this._emit("abort", error);
      }
      if (error instanceof OpenAIError) {
        return this._emit("error", error);
      }
      if (error instanceof Error) {
        const openAIError = new OpenAIError(error.message);
        openAIError.cause = error;
        return this._emit("error", openAIError);
      }
      return this._emit("error", new OpenAIError(String(error)));
    });
    __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_connectedPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_resolveConnectedPromise, resolve, "f");
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_rejectConnectedPromise, reject, "f");
    }), "f");
    __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_endPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_resolveEndPromise, resolve, "f");
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_rejectEndPromise, reject, "f");
    }), "f");
    __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_connectedPromise, "f").catch(() => {
    });
    __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_endPromise, "f").catch(() => {
    });
  }
  _run(executor) {
    setTimeout(() => {
      executor().then(() => {
        this._emitFinal();
        this._emit("end");
      }, __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_handleError, "f"));
    }, 0);
  }
  _addChatCompletion(chatCompletion) {
    this._chatCompletions.push(chatCompletion);
    this._emit("chatCompletion", chatCompletion);
    const message = chatCompletion.choices[0]?.message;
    if (message)
      this._addMessage(message);
    return chatCompletion;
  }
  _addMessage(message, emit = true) {
    if (!("content" in message))
      message.content = null;
    this.messages.push(message);
    if (emit) {
      this._emit("message", message);
      if ((isFunctionMessage(message) || isToolMessage(message)) && message.content) {
        this._emit("functionCallResult", message.content);
      } else if (isAssistantMessage(message) && message.function_call) {
        this._emit("functionCall", message.function_call);
      } else if (isAssistantMessage(message) && message.tool_calls) {
        for (const tool_call of message.tool_calls) {
          if (tool_call.type === "function") {
            this._emit("functionCall", tool_call.function);
          }
        }
      }
    }
  }
  _connected() {
    if (this.ended)
      return;
    __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_resolveConnectedPromise, "f").call(this);
    this._emit("connect");
  }
  get ended() {
    return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_ended, "f");
  }
  get errored() {
    return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_errored, "f");
  }
  get aborted() {
    return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_aborted, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  on(event, listener) {
    const listeners = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event] || (__classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event] = []);
    listeners.push({ listener });
    return this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off(event, listener) {
    const listeners = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event];
    if (!listeners)
      return this;
    const index = listeners.findIndex((l) => l.listener === listener);
    if (index >= 0)
      listeners.splice(index, 1);
    return this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once(event, listener) {
    const listeners = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event] || (__classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event] = []);
    listeners.push({ listener, once: true });
    return this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(event) {
    return new Promise((resolve, reject) => {
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_catchingPromiseCreated, true, "f");
      if (event !== "error")
        this.once("error", reject);
      this.once(event, resolve);
    });
  }
  done() {
    return __async(this, null, function* () {
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_catchingPromiseCreated, true, "f");
      yield __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_endPromise, "f");
    });
  }
  /**
   * @returns a promise that resolves with the final ChatCompletion, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
   */
  finalChatCompletion() {
    return __async(this, null, function* () {
      yield this.done();
      const completion = this._chatCompletions[this._chatCompletions.length - 1];
      if (!completion)
        throw new OpenAIError("stream ended without producing a ChatCompletion");
      return completion;
    });
  }
  /**
   * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  finalContent() {
    return __async(this, null, function* () {
      yield this.done();
      return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
    });
  }
  /**
   * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
   * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  finalMessage() {
    return __async(this, null, function* () {
      yield this.done();
      return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
    });
  }
  /**
   * @returns a promise that resolves with the content of the final FunctionCall, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  finalFunctionCall() {
    return __async(this, null, function* () {
      yield this.done();
      return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
    });
  }
  finalFunctionCallResult() {
    return __async(this, null, function* () {
      yield this.done();
      return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
    });
  }
  totalUsage() {
    return __async(this, null, function* () {
      yield this.done();
      return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
    });
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emit(event, ...args) {
    if (__classPrivateFieldGet2(this, _AbstractChatCompletionRunner_ended, "f")) {
      return;
    }
    if (event === "end") {
      __classPrivateFieldSet2(this, _AbstractChatCompletionRunner_ended, true, "f");
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_resolveEndPromise, "f").call(this);
    }
    const listeners = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event];
    if (listeners) {
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_listeners, "f")[event] = listeners.filter((l) => !l.once);
      listeners.forEach(({ listener }) => listener(...args));
    }
    if (event === "abort") {
      const error = args[0];
      if (!__classPrivateFieldGet2(this, _AbstractChatCompletionRunner_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_rejectEndPromise, "f").call(this, error);
      this._emit("end");
      return;
    }
    if (event === "error") {
      const error = args[0];
      if (!__classPrivateFieldGet2(this, _AbstractChatCompletionRunner_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_rejectEndPromise, "f").call(this, error);
      this._emit("end");
    }
  }
  _emitFinal() {
    const completion = this._chatCompletions[this._chatCompletions.length - 1];
    if (completion)
      this._emit("finalChatCompletion", completion);
    const finalMessage = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
    if (finalMessage)
      this._emit("finalMessage", finalMessage);
    const finalContent = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
    if (finalContent)
      this._emit("finalContent", finalContent);
    const finalFunctionCall = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
    if (finalFunctionCall)
      this._emit("finalFunctionCall", finalFunctionCall);
    const finalFunctionCallResult = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
    if (finalFunctionCallResult != null)
      this._emit("finalFunctionCallResult", finalFunctionCallResult);
    if (this._chatCompletions.some((c) => c.usage)) {
      this._emit("totalUsage", __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
    }
  }
  _createChatCompletion(completions, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
      const chatCompletion = yield completions.create(__spreadProps(__spreadValues({}, params), { stream: false }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      return this._addChatCompletion(chatCompletion);
    });
  }
  _runChatCompletion(completions, params, options) {
    return __async(this, null, function* () {
      for (const message of params.messages) {
        this._addMessage(message, false);
      }
      return yield this._createChatCompletion(completions, params, options);
    });
  }
  _runFunctions(completions, params, options) {
    return __async(this, null, function* () {
      const role = "function";
      const _a2 = params, { function_call = "auto", stream } = _a2, restParams = __objRest(_a2, ["function_call", "stream"]);
      const singleFunctionToCall = typeof function_call !== "string" && function_call?.name;
      const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
      const functionsByName = {};
      for (const f of params.functions) {
        functionsByName[f.name || f.function.name] = f;
      }
      const functions = params.functions.map((f) => ({
        name: f.name || f.function.name,
        parameters: f.parameters,
        description: f.description
      }));
      for (const message of params.messages) {
        this._addMessage(message, false);
      }
      for (let i = 0; i < maxChatCompletions; ++i) {
        const chatCompletion = yield this._createChatCompletion(completions, __spreadProps(__spreadValues({}, restParams), {
          function_call,
          functions,
          messages: [...this.messages]
        }), options);
        const message = chatCompletion.choices[0]?.message;
        if (!message) {
          throw new OpenAIError(`missing message in ChatCompletion response`);
        }
        if (!message.function_call)
          return;
        const { name, arguments: args } = message.function_call;
        const fn = functionsByName[name];
        if (!fn) {
          const content2 = `Invalid function_call: ${JSON.stringify(name)}. Available options are: ${functions.map((f) => JSON.stringify(f.name)).join(", ")}. Please try again`;
          this._addMessage({ role, name, content: content2 });
          continue;
        } else if (singleFunctionToCall && singleFunctionToCall !== name) {
          const content2 = `Invalid function_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
          this._addMessage({ role, name, content: content2 });
          continue;
        }
        let parsed;
        try {
          parsed = isRunnableFunctionWithParse(fn) ? yield fn.parse(args) : args;
        } catch (error) {
          this._addMessage({
            role,
            name,
            content: error instanceof Error ? error.message : String(error)
          });
          continue;
        }
        const rawContent = yield fn.function(parsed, this);
        const content = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
        this._addMessage({ role, name, content });
        if (singleFunctionToCall)
          return;
      }
    });
  }
  _runTools(completions, params, options) {
    return __async(this, null, function* () {
      const role = "tool";
      const _a2 = params, { tool_choice = "auto", stream } = _a2, restParams = __objRest(_a2, ["tool_choice", "stream"]);
      const singleFunctionToCall = typeof tool_choice !== "string" && tool_choice?.function?.name;
      const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
      const functionsByName = {};
      for (const f of params.tools) {
        if (f.type === "function") {
          functionsByName[f.function.name || f.function.function.name] = f.function;
        }
      }
      const tools = "tools" in params ? params.tools.map((t) => t.type === "function" ? {
        type: "function",
        function: {
          name: t.function.name || t.function.function.name,
          parameters: t.function.parameters,
          description: t.function.description
        }
      } : t) : void 0;
      for (const message of params.messages) {
        this._addMessage(message, false);
      }
      for (let i = 0; i < maxChatCompletions; ++i) {
        const chatCompletion = yield this._createChatCompletion(completions, __spreadProps(__spreadValues({}, restParams), {
          tool_choice,
          tools,
          messages: [...this.messages]
        }), options);
        const message = chatCompletion.choices[0]?.message;
        if (!message) {
          throw new OpenAIError(`missing message in ChatCompletion response`);
        }
        if (!message.tool_calls) {
          return;
        }
        for (const tool_call of message.tool_calls) {
          if (tool_call.type !== "function")
            continue;
          const tool_call_id = tool_call.id;
          const { name, arguments: args } = tool_call.function;
          const fn = functionsByName[name];
          if (!fn) {
            const content2 = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${tools.map((f) => JSON.stringify(f.function.name)).join(", ")}. Please try again`;
            this._addMessage({ role, tool_call_id, content: content2 });
            continue;
          } else if (singleFunctionToCall && singleFunctionToCall !== name) {
            const content2 = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
            this._addMessage({ role, tool_call_id, content: content2 });
            continue;
          }
          let parsed;
          try {
            parsed = isRunnableFunctionWithParse(fn) ? yield fn.parse(args) : args;
          } catch (error) {
            const content2 = error instanceof Error ? error.message : String(error);
            this._addMessage({ role, tool_call_id, content: content2 });
            continue;
          }
          const rawContent = yield fn.function(parsed, this);
          const content = __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
          this._addMessage({ role, tool_call_id, content });
          if (singleFunctionToCall) {
            return;
          }
        }
      }
      return;
    });
  }
};
_AbstractChatCompletionRunner_connectedPromise = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_endPromise = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_listeners = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_ended = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_errored = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_aborted = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_handleError = /* @__PURE__ */ new WeakMap(), _AbstractChatCompletionRunner_instances = /* @__PURE__ */ new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = function _AbstractChatCompletionRunner_getFinalContent2() {
  return __classPrivateFieldGet2(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content ?? null;
}, _AbstractChatCompletionRunner_getFinalMessage = function _AbstractChatCompletionRunner_getFinalMessage2() {
  let i = this.messages.length;
  while (i-- > 0) {
    const message = this.messages[i];
    if (isAssistantMessage(message)) {
      return __spreadProps(__spreadValues({}, message), { content: message.content ?? null });
    }
  }
  throw new OpenAIError("stream ended without producing a ChatCompletionMessage with role=assistant");
}, _AbstractChatCompletionRunner_getFinalFunctionCall = function _AbstractChatCompletionRunner_getFinalFunctionCall2() {
  for (let i = this.messages.length - 1; i >= 0; i--) {
    const message = this.messages[i];
    if (isAssistantMessage(message) && message?.function_call) {
      return message.function_call;
    }
    if (isAssistantMessage(message) && message?.tool_calls?.length) {
      return message.tool_calls.at(-1)?.function;
    }
  }
  return;
}, _AbstractChatCompletionRunner_getFinalFunctionCallResult = function _AbstractChatCompletionRunner_getFinalFunctionCallResult2() {
  for (let i = this.messages.length - 1; i >= 0; i--) {
    const message = this.messages[i];
    if (isFunctionMessage(message) && message.content != null) {
      return message.content;
    }
    if (isToolMessage(message) && message.content != null && this.messages.some((x) => x.role === "assistant" && x.tool_calls?.some((y) => y.type === "function" && y.id === message.tool_call_id))) {
      return message.content;
    }
  }
  return;
}, _AbstractChatCompletionRunner_calculateTotalUsage = function _AbstractChatCompletionRunner_calculateTotalUsage2() {
  const total = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage } of this._chatCompletions) {
    if (usage) {
      total.completion_tokens += usage.completion_tokens;
      total.prompt_tokens += usage.prompt_tokens;
      total.total_tokens += usage.total_tokens;
    }
  }
  return total;
}, _AbstractChatCompletionRunner_validateParams = function _AbstractChatCompletionRunner_validateParams2(params) {
  if (params.n != null && params.n > 1) {
    throw new OpenAIError("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
  }
}, _AbstractChatCompletionRunner_stringifyFunctionCallResult = function _AbstractChatCompletionRunner_stringifyFunctionCallResult2(rawContent) {
  return typeof rawContent === "string" ? rawContent : rawContent === void 0 ? "undefined" : JSON.stringify(rawContent);
};

// node_modules/openai/lib/ChatCompletionRunner.mjs
var ChatCompletionRunner = class _ChatCompletionRunner extends AbstractChatCompletionRunner {
  /** @deprecated - please use `runTools` instead. */
  static runFunctions(completions, params, options) {
    const runner = new _ChatCompletionRunner();
    const opts = __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "runFunctions" })
    });
    runner._run(() => runner._runFunctions(completions, params, opts));
    return runner;
  }
  static runTools(completions, params, options) {
    const runner = new _ChatCompletionRunner();
    const opts = __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "runTools" })
    });
    runner._run(() => runner._runTools(completions, params, opts));
    return runner;
  }
  _addMessage(message) {
    super._addMessage(message);
    if (isAssistantMessage(message) && message.content) {
      this._emit("content", message.content);
    }
  }
};

// node_modules/openai/lib/ChatCompletionStream.mjs
var __classPrivateFieldGet3 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet3 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m")
    throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _ChatCompletionStream_instances;
var _ChatCompletionStream_currentChatCompletionSnapshot;
var _ChatCompletionStream_beginRequest;
var _ChatCompletionStream_addChunk;
var _ChatCompletionStream_endRequest;
var _ChatCompletionStream_accumulateChatCompletion;
var ChatCompletionStream = class _ChatCompletionStream extends AbstractChatCompletionRunner {
  constructor() {
    super(...arguments);
    _ChatCompletionStream_instances.add(this);
    _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
  }
  get currentChatCompletionSnapshot() {
    return __classPrivateFieldGet3(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(stream) {
    const runner = new _ChatCompletionStream();
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  static createChatCompletion(completions, params, options) {
    const runner = new _ChatCompletionStream();
    runner._run(() => runner._runChatCompletion(completions, __spreadProps(__spreadValues({}, params), { stream: true }), __spreadProps(__spreadValues({}, options), { headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "stream" }) })));
    return runner;
  }
  _createChatCompletion(completions, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      __classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
      const stream = yield completions.create(__spreadProps(__spreadValues({}, params), { stream: true }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      try {
        for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const chunk = temp.value;
          __classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      return this._addChatCompletion(__classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
    });
  }
  _fromReadableStream(readableStream, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      __classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
      this._connected();
      const stream = Stream.fromReadableStream(readableStream, this.controller);
      let chatId;
      try {
        for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const chunk = temp.value;
          if (chatId && chatId !== chunk.id) {
            this._addChatCompletion(__classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
          }
          __classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
          chatId = chunk.id;
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      return this._addChatCompletion(__classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
    });
  }
  [(_ChatCompletionStream_currentChatCompletionSnapshot = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_instances = /* @__PURE__ */ new WeakSet(), _ChatCompletionStream_beginRequest = function _ChatCompletionStream_beginRequest2() {
    if (this.ended)
      return;
    __classPrivateFieldSet3(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
  }, _ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk2(chunk) {
    if (this.ended)
      return;
    const completion = __classPrivateFieldGet3(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
    this._emit("chunk", chunk, completion);
    const delta = chunk.choices[0]?.delta?.content;
    const snapshot = completion.choices[0]?.message;
    if (delta != null && snapshot?.role === "assistant" && snapshot?.content) {
      this._emit("content", delta, snapshot.content);
    }
  }, _ChatCompletionStream_endRequest = function _ChatCompletionStream_endRequest2() {
    if (this.ended) {
      throw new OpenAIError(`stream has ended, this shouldn't happen`);
    }
    const snapshot = __classPrivateFieldGet3(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
    if (!snapshot) {
      throw new OpenAIError(`request ended without sending any chunks`);
    }
    __classPrivateFieldSet3(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
    return finalizeChatCompletion(snapshot);
  }, _ChatCompletionStream_accumulateChatCompletion = function _ChatCompletionStream_accumulateChatCompletion2(chunk) {
    var _a2, _b, _c;
    let snapshot = __classPrivateFieldGet3(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
    const _a3 = chunk, { choices } = _a3, rest = __objRest(_a3, ["choices"]);
    if (!snapshot) {
      snapshot = __classPrivateFieldSet3(this, _ChatCompletionStream_currentChatCompletionSnapshot, __spreadProps(__spreadValues({}, rest), {
        choices: []
      }), "f");
    } else {
      Object.assign(snapshot, rest);
    }
    for (const _f of chunk.choices) {
      const _g = _f, { delta, finish_reason, index, logprobs = null } = _g, other = __objRest(_g, ["delta", "finish_reason", "index", "logprobs"]);
      let choice = snapshot.choices[index];
      if (!choice) {
        choice = snapshot.choices[index] = __spreadValues({ finish_reason, index, message: {}, logprobs }, other);
      }
      if (logprobs) {
        if (!choice.logprobs) {
          choice.logprobs = Object.assign({}, logprobs);
        } else {
          const _b2 = logprobs, { content: content2 } = _b2, rest3 = __objRest(_b2, ["content"]);
          Object.assign(choice.logprobs, rest3);
          if (content2) {
            (_a2 = choice.logprobs).content ?? (_a2.content = []);
            choice.logprobs.content.push(...content2);
          }
        }
      }
      if (finish_reason)
        choice.finish_reason = finish_reason;
      Object.assign(choice, other);
      if (!delta)
        continue;
      const _c2 = delta, { content, function_call, role, tool_calls } = _c2, rest2 = __objRest(_c2, ["content", "function_call", "role", "tool_calls"]);
      Object.assign(choice.message, rest2);
      if (content)
        choice.message.content = (choice.message.content || "") + content;
      if (role)
        choice.message.role = role;
      if (function_call) {
        if (!choice.message.function_call) {
          choice.message.function_call = function_call;
        } else {
          if (function_call.name)
            choice.message.function_call.name = function_call.name;
          if (function_call.arguments) {
            (_b = choice.message.function_call).arguments ?? (_b.arguments = "");
            choice.message.function_call.arguments += function_call.arguments;
          }
        }
      }
      if (tool_calls) {
        if (!choice.message.tool_calls)
          choice.message.tool_calls = [];
        for (const _d of tool_calls) {
          const _e = _d, { index: index2, id, type, function: fn } = _e, rest3 = __objRest(_e, ["index", "id", "type", "function"]);
          const tool_call = (_c = choice.message.tool_calls)[index2] ?? (_c[index2] = {});
          Object.assign(tool_call, rest3);
          if (id)
            tool_call.id = id;
          if (type)
            tool_call.type = type;
          if (fn)
            tool_call.function ?? (tool_call.function = { arguments: "" });
          if (fn?.name)
            tool_call.function.name = fn.name;
          if (fn?.arguments)
            tool_call.function.arguments += fn.arguments;
        }
      }
    }
    return snapshot;
  }, Symbol.asyncIterator)]() {
    const pushQueue = [];
    const readQueue = [];
    let done = false;
    this.on("chunk", (chunk) => {
      const reader = readQueue.shift();
      if (reader) {
        reader.resolve(chunk);
      } else {
        pushQueue.push(chunk);
      }
    });
    this.on("end", () => {
      done = true;
      for (const reader of readQueue) {
        reader.resolve(void 0);
      }
      readQueue.length = 0;
    });
    this.on("abort", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    this.on("error", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    return {
      next: () => __async(this, null, function* () {
        if (!pushQueue.length) {
          if (done) {
            return { value: void 0, done: true };
          }
          return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
        }
        const chunk = pushQueue.shift();
        return { value: chunk, done: false };
      }),
      return: () => __async(this, null, function* () {
        this.abort();
        return { value: void 0, done: true };
      })
    };
  }
  toReadableStream() {
    const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
    return stream.toReadableStream();
  }
};
function finalizeChatCompletion(snapshot) {
  const _a2 = snapshot, { id, choices, created, model, system_fingerprint } = _a2, rest = __objRest(_a2, ["id", "choices", "created", "model", "system_fingerprint"]);
  return __spreadValues(__spreadProps(__spreadValues({}, rest), {
    id,
    choices: choices.map((_b) => {
      var _c = _b, { message, finish_reason, index, logprobs } = _c, choiceRest = __objRest(_c, ["message", "finish_reason", "index", "logprobs"]);
      if (!finish_reason)
        throw new OpenAIError(`missing finish_reason for choice ${index}`);
      const _a3 = message, { content = null, function_call, tool_calls } = _a3, messageRest = __objRest(_a3, ["content", "function_call", "tool_calls"]);
      const role = message.role;
      if (!role)
        throw new OpenAIError(`missing role for choice ${index}`);
      if (function_call) {
        const { arguments: args, name } = function_call;
        if (args == null)
          throw new OpenAIError(`missing function_call.arguments for choice ${index}`);
        if (!name)
          throw new OpenAIError(`missing function_call.name for choice ${index}`);
        return __spreadProps(__spreadValues({}, choiceRest), {
          message: { content, function_call: { arguments: args, name }, role },
          finish_reason,
          index,
          logprobs
        });
      }
      if (tool_calls) {
        return __spreadProps(__spreadValues({}, choiceRest), {
          index,
          finish_reason,
          logprobs,
          message: __spreadProps(__spreadValues({}, messageRest), {
            role,
            content,
            tool_calls: tool_calls.map((tool_call, i) => {
              const _a4 = tool_call, { function: fn, type, id: id2 } = _a4, toolRest = __objRest(_a4, ["function", "type", "id"]);
              const _b2 = fn || {}, { arguments: args, name } = _b2, fnRest = __objRest(_b2, ["arguments", "name"]);
              if (id2 == null)
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].id
${str(snapshot)}`);
              if (type == null)
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].type
${str(snapshot)}`);
              if (name == null)
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.name
${str(snapshot)}`);
              if (args == null)
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.arguments
${str(snapshot)}`);
              return __spreadProps(__spreadValues({}, toolRest), { id: id2, type, function: __spreadProps(__spreadValues({}, fnRest), { name, arguments: args }) });
            })
          })
        });
      }
      return __spreadProps(__spreadValues({}, choiceRest), {
        message: __spreadProps(__spreadValues({}, messageRest), { content, role }),
        finish_reason,
        index,
        logprobs
      });
    }),
    created,
    model,
    object: "chat.completion"
  }), system_fingerprint ? { system_fingerprint } : {});
}
function str(x) {
  return JSON.stringify(x);
}

// node_modules/openai/lib/ChatCompletionStreamingRunner.mjs
var ChatCompletionStreamingRunner = class _ChatCompletionStreamingRunner extends ChatCompletionStream {
  static fromReadableStream(stream) {
    const runner = new _ChatCompletionStreamingRunner();
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  /** @deprecated - please use `runTools` instead. */
  static runFunctions(completions, params, options) {
    const runner = new _ChatCompletionStreamingRunner();
    const opts = __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "runFunctions" })
    });
    runner._run(() => runner._runFunctions(completions, params, opts));
    return runner;
  }
  static runTools(completions, params, options) {
    const runner = new _ChatCompletionStreamingRunner();
    const opts = __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "runTools" })
    });
    runner._run(() => runner._runTools(completions, params, opts));
    return runner;
  }
};

// node_modules/openai/resources/beta/chat/completions.mjs
var Completions2 = class extends APIResource {
  runFunctions(body, options) {
    if (body.stream) {
      return ChatCompletionStreamingRunner.runFunctions(this._client.chat.completions, body, options);
    }
    return ChatCompletionRunner.runFunctions(this._client.chat.completions, body, options);
  }
  runTools(body, options) {
    if (body.stream) {
      return ChatCompletionStreamingRunner.runTools(this._client.chat.completions, body, options);
    }
    return ChatCompletionRunner.runTools(this._client.chat.completions, body, options);
  }
  /**
   * Creates a chat completion stream
   */
  stream(body, options) {
    return ChatCompletionStream.createChatCompletion(this._client.chat.completions, body, options);
  }
};

// node_modules/openai/resources/beta/chat/chat.mjs
var Chat2 = class extends APIResource {
  constructor() {
    super(...arguments);
    this.completions = new Completions2(this._client);
  }
};
(function(Chat3) {
  Chat3.Completions = Completions2;
})(Chat2 || (Chat2 = {}));

// node_modules/openai/lib/AbstractAssistantStreamRunner.mjs
var __classPrivateFieldSet4 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m")
    throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractAssistantStreamRunner_connectedPromise;
var _AbstractAssistantStreamRunner_resolveConnectedPromise;
var _AbstractAssistantStreamRunner_rejectConnectedPromise;
var _AbstractAssistantStreamRunner_endPromise;
var _AbstractAssistantStreamRunner_resolveEndPromise;
var _AbstractAssistantStreamRunner_rejectEndPromise;
var _AbstractAssistantStreamRunner_listeners;
var _AbstractAssistantStreamRunner_ended;
var _AbstractAssistantStreamRunner_errored;
var _AbstractAssistantStreamRunner_aborted;
var _AbstractAssistantStreamRunner_catchingPromiseCreated;
var _AbstractAssistantStreamRunner_handleError;
var AbstractAssistantStreamRunner = class {
  constructor() {
    this.controller = new AbortController();
    _AbstractAssistantStreamRunner_connectedPromise.set(this, void 0);
    _AbstractAssistantStreamRunner_resolveConnectedPromise.set(this, () => {
    });
    _AbstractAssistantStreamRunner_rejectConnectedPromise.set(this, () => {
    });
    _AbstractAssistantStreamRunner_endPromise.set(this, void 0);
    _AbstractAssistantStreamRunner_resolveEndPromise.set(this, () => {
    });
    _AbstractAssistantStreamRunner_rejectEndPromise.set(this, () => {
    });
    _AbstractAssistantStreamRunner_listeners.set(this, {});
    _AbstractAssistantStreamRunner_ended.set(this, false);
    _AbstractAssistantStreamRunner_errored.set(this, false);
    _AbstractAssistantStreamRunner_aborted.set(this, false);
    _AbstractAssistantStreamRunner_catchingPromiseCreated.set(this, false);
    _AbstractAssistantStreamRunner_handleError.set(this, (error) => {
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_errored, true, "f");
      if (error instanceof Error && error.name === "AbortError") {
        error = new APIUserAbortError();
      }
      if (error instanceof APIUserAbortError) {
        __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_aborted, true, "f");
        return this._emit("abort", error);
      }
      if (error instanceof OpenAIError) {
        return this._emit("error", error);
      }
      if (error instanceof Error) {
        const openAIError = new OpenAIError(error.message);
        openAIError.cause = error;
        return this._emit("error", openAIError);
      }
      return this._emit("error", new OpenAIError(String(error)));
    });
    __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_connectedPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_resolveConnectedPromise, resolve, "f");
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_rejectConnectedPromise, reject, "f");
    }), "f");
    __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_endPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_resolveEndPromise, resolve, "f");
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_rejectEndPromise, reject, "f");
    }), "f");
    __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_connectedPromise, "f").catch(() => {
    });
    __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_endPromise, "f").catch(() => {
    });
  }
  _run(executor) {
    setTimeout(() => {
      executor().then(() => {
        this._emit("end");
      }, __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_handleError, "f"));
    }, 0);
  }
  _addRun(run) {
    return run;
  }
  _connected() {
    if (this.ended)
      return;
    __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_resolveConnectedPromise, "f").call(this);
    this._emit("connect");
  }
  get ended() {
    return __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_ended, "f");
  }
  get errored() {
    return __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_errored, "f");
  }
  get aborted() {
    return __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_aborted, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  on(event, listener) {
    const listeners = __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event] || (__classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event] = []);
    listeners.push({ listener });
    return this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off(event, listener) {
    const listeners = __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event];
    if (!listeners)
      return this;
    const index = listeners.findIndex((l) => l.listener === listener);
    if (index >= 0)
      listeners.splice(index, 1);
    return this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once(event, listener) {
    const listeners = __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event] || (__classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event] = []);
    listeners.push({ listener, once: true });
    return this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(event) {
    return new Promise((resolve, reject) => {
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_catchingPromiseCreated, true, "f");
      if (event !== "error")
        this.once("error", reject);
      this.once(event, resolve);
    });
  }
  done() {
    return __async(this, null, function* () {
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_catchingPromiseCreated, true, "f");
      yield __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_endPromise, "f");
    });
  }
  _emit(event, ...args) {
    if (__classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_ended, "f")) {
      return;
    }
    if (event === "end") {
      __classPrivateFieldSet4(this, _AbstractAssistantStreamRunner_ended, true, "f");
      __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_resolveEndPromise, "f").call(this);
    }
    const listeners = __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event];
    if (listeners) {
      __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_listeners, "f")[event] = listeners.filter((l) => !l.once);
      listeners.forEach(({ listener }) => listener(...args));
    }
    if (event === "abort") {
      const error = args[0];
      if (!__classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_rejectEndPromise, "f").call(this, error);
      this._emit("end");
      return;
    }
    if (event === "error") {
      const error = args[0];
      if (!__classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet4(this, _AbstractAssistantStreamRunner_rejectEndPromise, "f").call(this, error);
      this._emit("end");
    }
  }
  _threadAssistantStream(body, thread, options) {
    return __async(this, null, function* () {
      return yield this._createThreadAssistantStream(thread, body, options);
    });
  }
  _runAssistantStream(threadId, runs, params, options) {
    return __async(this, null, function* () {
      return yield this._createAssistantStream(runs, threadId, params, options);
    });
  }
  _runToolAssistantStream(threadId, runId, runs, params, options) {
    return __async(this, null, function* () {
      return yield this._createToolAssistantStream(runs, threadId, runId, params, options);
    });
  }
  _createThreadAssistantStream(thread, body, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      const runResult = yield thread.createAndRun(__spreadProps(__spreadValues({}, body), { stream: false }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      return this._addRun(runResult);
    });
  }
  _createToolAssistantStream(run, threadId, runId, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      const runResult = yield run.submitToolOutputs(threadId, runId, __spreadProps(__spreadValues({}, params), { stream: false }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      return this._addRun(runResult);
    });
  }
  _createAssistantStream(run, threadId, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      const runResult = yield run.create(threadId, __spreadProps(__spreadValues({}, params), { stream: false }), __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      return this._addRun(runResult);
    });
  }
};
_AbstractAssistantStreamRunner_connectedPromise = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_endPromise = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_listeners = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_ended = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_errored = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_aborted = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _AbstractAssistantStreamRunner_handleError = /* @__PURE__ */ new WeakMap();

// node_modules/openai/lib/AssistantStream.mjs
var __classPrivateFieldGet5 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet5 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m")
    throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _AssistantStream_instances;
var _AssistantStream_events;
var _AssistantStream_runStepSnapshots;
var _AssistantStream_messageSnapshots;
var _AssistantStream_messageSnapshot;
var _AssistantStream_finalRun;
var _AssistantStream_currentContentIndex;
var _AssistantStream_currentContent;
var _AssistantStream_currentToolCallIndex;
var _AssistantStream_currentToolCall;
var _AssistantStream_currentEvent;
var _AssistantStream_currentRunSnapshot;
var _AssistantStream_currentRunStepSnapshot;
var _AssistantStream_addEvent;
var _AssistantStream_endRequest;
var _AssistantStream_handleMessage;
var _AssistantStream_handleRunStep;
var _AssistantStream_handleEvent;
var _AssistantStream_accumulateRunStep;
var _AssistantStream_accumulateMessage;
var _AssistantStream_accumulateContent;
var _AssistantStream_handleRun;
var AssistantStream = class _AssistantStream extends AbstractAssistantStreamRunner {
  constructor() {
    super(...arguments);
    _AssistantStream_instances.add(this);
    _AssistantStream_events.set(this, []);
    _AssistantStream_runStepSnapshots.set(this, {});
    _AssistantStream_messageSnapshots.set(this, {});
    _AssistantStream_messageSnapshot.set(this, void 0);
    _AssistantStream_finalRun.set(this, void 0);
    _AssistantStream_currentContentIndex.set(this, void 0);
    _AssistantStream_currentContent.set(this, void 0);
    _AssistantStream_currentToolCallIndex.set(this, void 0);
    _AssistantStream_currentToolCall.set(this, void 0);
    _AssistantStream_currentEvent.set(this, void 0);
    _AssistantStream_currentRunSnapshot.set(this, void 0);
    _AssistantStream_currentRunStepSnapshot.set(this, void 0);
  }
  [(_AssistantStream_events = /* @__PURE__ */ new WeakMap(), _AssistantStream_runStepSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_finalRun = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContentIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCallIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCall = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentEvent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunStepSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const pushQueue = [];
    const readQueue = [];
    let done = false;
    this.on("event", (event) => {
      const reader = readQueue.shift();
      if (reader) {
        reader.resolve(event);
      } else {
        pushQueue.push(event);
      }
    });
    this.on("end", () => {
      done = true;
      for (const reader of readQueue) {
        reader.resolve(void 0);
      }
      readQueue.length = 0;
    });
    this.on("abort", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    this.on("error", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    return {
      next: () => __async(this, null, function* () {
        if (!pushQueue.length) {
          if (done) {
            return { value: void 0, done: true };
          }
          return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
        }
        const chunk = pushQueue.shift();
        return { value: chunk, done: false };
      }),
      return: () => __async(this, null, function* () {
        this.abort();
        return { value: void 0, done: true };
      })
    };
  }
  static fromReadableStream(stream) {
    const runner = new _AssistantStream();
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  _fromReadableStream(readableStream, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      this._connected();
      const stream = Stream.fromReadableStream(readableStream, this.controller);
      try {
        for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const event = temp.value;
          __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      return this._addRun(__classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    });
  }
  toReadableStream() {
    const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
    return stream.toReadableStream();
  }
  static createToolAssistantStream(threadId, runId, runs, body, options) {
    const runner = new _AssistantStream();
    runner._run(() => runner._runToolAssistantStream(threadId, runId, runs, body, __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "stream" })
    })));
    return runner;
  }
  _createToolAssistantStream(run, threadId, runId, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      const body = __spreadProps(__spreadValues({}, params), { stream: true });
      const stream = yield run.submitToolOutputs(threadId, runId, body, __spreadProps(__spreadValues({}, options), {
        signal: this.controller.signal
      }));
      this._connected();
      try {
        for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const event = temp.value;
          __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      return this._addRun(__classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    });
  }
  static createThreadAssistantStream(body, thread, options) {
    const runner = new _AssistantStream();
    runner._run(() => runner._threadAssistantStream(body, thread, __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "stream" })
    })));
    return runner;
  }
  static createAssistantStream(threadId, runs, params, options) {
    const runner = new _AssistantStream();
    runner._run(() => runner._runAssistantStream(threadId, runs, params, __spreadProps(__spreadValues({}, options), {
      headers: __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Helper-Method": "stream" })
    })));
    return runner;
  }
  currentEvent() {
    return __classPrivateFieldGet5(this, _AssistantStream_currentEvent, "f");
  }
  currentRun() {
    return __classPrivateFieldGet5(this, _AssistantStream_currentRunSnapshot, "f");
  }
  currentMessageSnapshot() {
    return __classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f");
  }
  currentRunStepSnapshot() {
    return __classPrivateFieldGet5(this, _AssistantStream_currentRunStepSnapshot, "f");
  }
  finalRunSteps() {
    return __async(this, null, function* () {
      yield this.done();
      return Object.values(__classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f"));
    });
  }
  finalMessages() {
    return __async(this, null, function* () {
      yield this.done();
      return Object.values(__classPrivateFieldGet5(this, _AssistantStream_messageSnapshots, "f"));
    });
  }
  finalRun() {
    return __async(this, null, function* () {
      yield this.done();
      if (!__classPrivateFieldGet5(this, _AssistantStream_finalRun, "f"))
        throw Error("Final run was not received.");
      return __classPrivateFieldGet5(this, _AssistantStream_finalRun, "f");
    });
  }
  _createThreadAssistantStream(thread, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      const body = __spreadProps(__spreadValues({}, params), { stream: true });
      const stream = yield thread.createAndRun(body, __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      try {
        for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const event = temp.value;
          __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      return this._addRun(__classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    });
  }
  _createAssistantStream(run, threadId, params, options) {
    return __async(this, null, function* () {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted)
          this.controller.abort();
        signal.addEventListener("abort", () => this.controller.abort());
      }
      const body = __spreadProps(__spreadValues({}, params), { stream: true });
      const stream = yield run.create(threadId, body, __spreadProps(__spreadValues({}, options), { signal: this.controller.signal }));
      this._connected();
      try {
        for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const event = temp.value;
          __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      return this._addRun(__classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    });
  }
  static accumulateDelta(acc, delta) {
    for (const [key, deltaValue] of Object.entries(delta)) {
      if (!acc.hasOwnProperty(key)) {
        acc[key] = deltaValue;
        continue;
      }
      let accValue = acc[key];
      if (accValue === null || accValue === void 0) {
        acc[key] = deltaValue;
        continue;
      }
      if (key === "index" || key === "type") {
        acc[key] = deltaValue;
        continue;
      }
      if (typeof accValue === "string" && typeof deltaValue === "string") {
        accValue += deltaValue;
      } else if (typeof accValue === "number" && typeof deltaValue === "number") {
        accValue += deltaValue;
      } else if (isObj(accValue) && isObj(deltaValue)) {
        accValue = this.accumulateDelta(accValue, deltaValue);
      } else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
        if (accValue.every((x) => typeof x === "string" || typeof x === "number")) {
          accValue.push(...deltaValue);
          continue;
        }
      } else {
        throw Error(`Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`);
      }
      acc[key] = accValue;
    }
    return acc;
  }
};
_AssistantStream_addEvent = function _AssistantStream_addEvent2(event) {
  if (this.ended)
    return;
  __classPrivateFieldSet5(this, _AssistantStream_currentEvent, event, "f");
  __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_handleEvent).call(this, event);
  switch (event.event) {
    case "thread.created":
      break;
    case "thread.run.created":
    case "thread.run.queued":
    case "thread.run.in_progress":
    case "thread.run.requires_action":
    case "thread.run.completed":
    case "thread.run.failed":
    case "thread.run.cancelling":
    case "thread.run.cancelled":
    case "thread.run.expired":
      __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_handleRun).call(this, event);
      break;
    case "thread.run.step.created":
    case "thread.run.step.in_progress":
    case "thread.run.step.delta":
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_handleRunStep).call(this, event);
      break;
    case "thread.message.created":
    case "thread.message.in_progress":
    case "thread.message.delta":
    case "thread.message.completed":
    case "thread.message.incomplete":
      __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_handleMessage).call(this, event);
      break;
    case "error":
      throw new Error("Encountered an error event in event processing - errors should be processed earlier");
  }
}, _AssistantStream_endRequest = function _AssistantStream_endRequest2() {
  if (this.ended) {
    throw new OpenAIError(`stream has ended, this shouldn't happen`);
  }
  if (!__classPrivateFieldGet5(this, _AssistantStream_finalRun, "f"))
    throw Error("Final run has not been received");
  return __classPrivateFieldGet5(this, _AssistantStream_finalRun, "f");
}, _AssistantStream_handleMessage = function _AssistantStream_handleMessage2(event) {
  const [accumulatedMessage, newContent] = __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_accumulateMessage).call(this, event, __classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f"));
  __classPrivateFieldSet5(this, _AssistantStream_messageSnapshot, accumulatedMessage, "f");
  __classPrivateFieldGet5(this, _AssistantStream_messageSnapshots, "f")[accumulatedMessage.id] = accumulatedMessage;
  for (const content of newContent) {
    const snapshotContent = accumulatedMessage.content[content.index];
    if (snapshotContent?.type == "text") {
      this._emit("textCreated", snapshotContent.text);
    }
  }
  switch (event.event) {
    case "thread.message.created":
      this._emit("messageCreated", event.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      this._emit("messageDelta", event.data.delta, accumulatedMessage);
      if (event.data.delta.content) {
        for (const content of event.data.delta.content) {
          if (content.type == "text" && content.text) {
            let textDelta = content.text;
            let snapshot = accumulatedMessage.content[content.index];
            if (snapshot && snapshot.type == "text") {
              this._emit("textDelta", textDelta, snapshot.text);
            } else {
              throw Error("The snapshot associated with this text delta is not text or missing");
            }
          }
          if (content.index != __classPrivateFieldGet5(this, _AssistantStream_currentContentIndex, "f")) {
            if (__classPrivateFieldGet5(this, _AssistantStream_currentContent, "f")) {
              switch (__classPrivateFieldGet5(this, _AssistantStream_currentContent, "f").type) {
                case "text":
                  this._emit("textDone", __classPrivateFieldGet5(this, _AssistantStream_currentContent, "f").text, __classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f"));
                  break;
                case "image_file":
                  this._emit("imageFileDone", __classPrivateFieldGet5(this, _AssistantStream_currentContent, "f").image_file, __classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f"));
                  break;
              }
            }
            __classPrivateFieldSet5(this, _AssistantStream_currentContentIndex, content.index, "f");
          }
          __classPrivateFieldSet5(this, _AssistantStream_currentContent, accumulatedMessage.content[content.index], "f");
        }
      }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (__classPrivateFieldGet5(this, _AssistantStream_currentContentIndex, "f") !== void 0) {
        const currentContent = event.data.content[__classPrivateFieldGet5(this, _AssistantStream_currentContentIndex, "f")];
        if (currentContent) {
          switch (currentContent.type) {
            case "image_file":
              this._emit("imageFileDone", currentContent.image_file, __classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f"));
              break;
            case "text":
              this._emit("textDone", currentContent.text, __classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f"));
              break;
          }
        }
      }
      if (__classPrivateFieldGet5(this, _AssistantStream_messageSnapshot, "f")) {
        this._emit("messageDone", event.data);
      }
      __classPrivateFieldSet5(this, _AssistantStream_messageSnapshot, void 0, "f");
  }
}, _AssistantStream_handleRunStep = function _AssistantStream_handleRunStep2(event) {
  const accumulatedRunStep = __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_accumulateRunStep).call(this, event);
  __classPrivateFieldSet5(this, _AssistantStream_currentRunStepSnapshot, accumulatedRunStep, "f");
  switch (event.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", event.data);
      break;
    case "thread.run.step.delta":
      const delta = event.data.delta;
      if (delta.step_details && delta.step_details.type == "tool_calls" && delta.step_details.tool_calls && accumulatedRunStep.step_details.type == "tool_calls") {
        for (const toolCall of delta.step_details.tool_calls) {
          if (toolCall.index == __classPrivateFieldGet5(this, _AssistantStream_currentToolCallIndex, "f")) {
            this._emit("toolCallDelta", toolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index]);
          } else {
            if (__classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f")) {
              this._emit("toolCallDone", __classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f"));
            }
            __classPrivateFieldSet5(this, _AssistantStream_currentToolCallIndex, toolCall.index, "f");
            __classPrivateFieldSet5(this, _AssistantStream_currentToolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index], "f");
            if (__classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f"))
              this._emit("toolCallCreated", __classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f"));
          }
        }
      }
      this._emit("runStepDelta", event.data.delta, accumulatedRunStep);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      __classPrivateFieldSet5(this, _AssistantStream_currentRunStepSnapshot, void 0, "f");
      const details = event.data.step_details;
      if (details.type == "tool_calls") {
        if (__classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f")) {
          this._emit("toolCallDone", __classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f"));
          __classPrivateFieldSet5(this, _AssistantStream_currentToolCall, void 0, "f");
        }
      }
      this._emit("runStepDone", event.data, accumulatedRunStep);
      break;
    case "thread.run.step.in_progress":
      break;
  }
}, _AssistantStream_handleEvent = function _AssistantStream_handleEvent2(event) {
  __classPrivateFieldGet5(this, _AssistantStream_events, "f").push(event);
  this._emit("event", event);
}, _AssistantStream_accumulateRunStep = function _AssistantStream_accumulateRunStep2(event) {
  switch (event.event) {
    case "thread.run.step.created":
      __classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
      return event.data;
    case "thread.run.step.delta":
      let snapshot = __classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
      if (!snapshot) {
        throw Error("Received a RunStepDelta before creation of a snapshot");
      }
      let data = event.data;
      if (data.delta) {
        const accumulated = AssistantStream.accumulateDelta(snapshot, data.delta);
        __classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = accumulated;
      }
      return __classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      __classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
      break;
  }
  if (__classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id])
    return __classPrivateFieldGet5(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
  throw new Error("No snapshot available");
}, _AssistantStream_accumulateMessage = function _AssistantStream_accumulateMessage2(event, snapshot) {
  let newContent = [];
  switch (event.event) {
    case "thread.message.created":
      return [event.data, newContent];
    case "thread.message.delta":
      if (!snapshot) {
        throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      }
      let data = event.data;
      if (data.delta.content) {
        for (const contentElement of data.delta.content) {
          if (contentElement.index in snapshot.content) {
            let currentContent = snapshot.content[contentElement.index];
            snapshot.content[contentElement.index] = __classPrivateFieldGet5(this, _AssistantStream_instances, "m", _AssistantStream_accumulateContent).call(this, contentElement, currentContent);
          } else {
            snapshot.content[contentElement.index] = contentElement;
            newContent.push(contentElement);
          }
        }
      }
      return [snapshot, newContent];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (snapshot) {
        return [snapshot, newContent];
      } else {
        throw Error("Received thread message event with no existing snapshot");
      }
  }
  throw Error("Tried to accumulate a non-message event");
}, _AssistantStream_accumulateContent = function _AssistantStream_accumulateContent2(contentElement, currentContent) {
  return AssistantStream.accumulateDelta(currentContent, contentElement);
}, _AssistantStream_handleRun = function _AssistantStream_handleRun2(event) {
  __classPrivateFieldSet5(this, _AssistantStream_currentRunSnapshot, event.data, "f");
  switch (event.event) {
    case "thread.run.created":
      break;
    case "thread.run.queued":
      break;
    case "thread.run.in_progress":
      break;
    case "thread.run.requires_action":
    case "thread.run.cancelled":
    case "thread.run.failed":
    case "thread.run.completed":
    case "thread.run.expired":
      __classPrivateFieldSet5(this, _AssistantStream_finalRun, event.data, "f");
      if (__classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f")) {
        this._emit("toolCallDone", __classPrivateFieldGet5(this, _AssistantStream_currentToolCall, "f"));
        __classPrivateFieldSet5(this, _AssistantStream_currentToolCall, void 0, "f");
      }
      break;
    case "thread.run.cancelling":
      break;
  }
};

// node_modules/openai/resources/beta/threads/messages/files.mjs
var Files2 = class extends APIResource {
  /**
   * Retrieves a message file.
   */
  retrieve(threadId, messageId, fileId, options) {
    return this._client.get(`/threads/${threadId}/messages/${messageId}/files/${fileId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  list(threadId, messageId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, messageId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/messages/${messageId}/files`, MessageFilesPage, __spreadProps(__spreadValues({
      query
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
};
var MessageFilesPage = class extends CursorPage {
};
(function(Files4) {
  Files4.MessageFilesPage = MessageFilesPage;
})(Files2 || (Files2 = {}));

// node_modules/openai/resources/beta/threads/messages/messages.mjs
var Messages = class extends APIResource {
  constructor() {
    super(...arguments);
    this.files = new Files2(this._client);
  }
  /**
   * Create a message.
   */
  create(threadId, body, options) {
    return this._client.post(`/threads/${threadId}/messages`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Retrieve a message.
   */
  retrieve(threadId, messageId, options) {
    return this._client.get(`/threads/${threadId}/messages/${messageId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Modifies a message.
   */
  update(threadId, messageId, body, options) {
    return this._client.post(`/threads/${threadId}/messages/${messageId}`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  list(threadId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/messages`, MessagesPage, __spreadProps(__spreadValues({
      query
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
};
var MessagesPage = class extends CursorPage {
};
(function(Messages2) {
  Messages2.MessagesPage = MessagesPage;
  Messages2.Files = Files2;
  Messages2.MessageFilesPage = MessageFilesPage;
})(Messages || (Messages = {}));

// node_modules/openai/resources/beta/threads/runs/steps.mjs
var Steps = class extends APIResource {
  /**
   * Retrieves a run step.
   */
  retrieve(threadId, runId, stepId, options) {
    return this._client.get(`/threads/${threadId}/runs/${runId}/steps/${stepId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  list(threadId, runId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, runId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/runs/${runId}/steps`, RunStepsPage, __spreadProps(__spreadValues({
      query
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
};
var RunStepsPage = class extends CursorPage {
};
(function(Steps2) {
  Steps2.RunStepsPage = RunStepsPage;
})(Steps || (Steps = {}));

// node_modules/openai/resources/beta/threads/runs/runs.mjs
var Runs = class extends APIResource {
  constructor() {
    super(...arguments);
    this.steps = new Steps(this._client);
  }
  create(threadId, body, options) {
    return this._client.post(`/threads/${threadId}/runs`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers),
      stream: body.stream ?? false
    }));
  }
  /**
   * Retrieves a run.
   */
  retrieve(threadId, runId, options) {
    return this._client.get(`/threads/${threadId}/runs/${runId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Modifies a run.
   */
  update(threadId, runId, body, options) {
    return this._client.post(`/threads/${threadId}/runs/${runId}`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  list(threadId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/runs`, RunsPage, __spreadProps(__spreadValues({
      query
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Cancels a run that is `in_progress`.
   */
  cancel(threadId, runId, options) {
    return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * A helper to create a run an poll for a terminal state. More information on Run
   * lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  createAndPoll(threadId, body, options) {
    return __async(this, null, function* () {
      const run = yield this.create(threadId, body, options);
      return yield this.poll(threadId, run.id, options);
    });
  }
  /**
   * Create a Run stream
   *
   * @deprecated use `stream` instead
   */
  createAndStream(threadId, body, options) {
    return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
  }
  /**
   * A helper to poll a run status until it reaches a terminal state. More
   * information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  poll(threadId, runId, options) {
    return __async(this, null, function* () {
      const headers = __spreadProps(__spreadValues({}, options?.headers), { "X-Stainless-Poll-Helper": "true" });
      if (options?.pollIntervalMs) {
        headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
      }
      while (true) {
        const { data: run, response } = yield this.retrieve(threadId, runId, __spreadProps(__spreadValues({}, options), {
          headers: __spreadValues(__spreadValues({}, options?.headers), headers)
        })).withResponse();
        switch (run.status) {
          case "queued":
          case "in_progress":
          case "cancelling":
            let sleepInterval = 5e3;
            if (options?.pollIntervalMs) {
              sleepInterval = options.pollIntervalMs;
            } else {
              const headerInterval = response.headers.get("openai-poll-after-ms");
              if (headerInterval) {
                const headerIntervalMs = parseInt(headerInterval);
                if (!isNaN(headerIntervalMs)) {
                  sleepInterval = headerIntervalMs;
                }
              }
            }
            yield sleep(sleepInterval);
            break;
          case "requires_action":
          case "cancelled":
          case "completed":
          case "failed":
          case "expired":
            return run;
        }
      }
    });
  }
  /**
   * Create a Run stream
   */
  stream(threadId, body, options) {
    return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
  }
  submitToolOutputs(threadId, runId, body, options) {
    return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers),
      stream: body.stream ?? false
    }));
  }
  /**
   * A helper to submit a tool output to a run and poll for a terminal run state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  submitToolOutputsAndPoll(threadId, runId, body, options) {
    return __async(this, null, function* () {
      const run = yield this.submitToolOutputs(threadId, runId, body, options);
      return yield this.poll(threadId, run.id, options);
    });
  }
  /**
   * Submit the tool outputs from a previous run and stream the run to a terminal
   * state. More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  submitToolOutputsStream(threadId, runId, body, options) {
    return AssistantStream.createToolAssistantStream(threadId, runId, this._client.beta.threads.runs, body, options);
  }
};
var RunsPage = class extends CursorPage {
};
(function(Runs2) {
  Runs2.RunsPage = RunsPage;
  Runs2.Steps = Steps;
  Runs2.RunStepsPage = RunStepsPage;
})(Runs || (Runs = {}));

// node_modules/openai/resources/beta/threads/threads.mjs
var Threads = class extends APIResource {
  constructor() {
    super(...arguments);
    this.runs = new Runs(this._client);
    this.messages = new Messages(this._client);
  }
  create(body = {}, options) {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post("/threads", __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Retrieves a thread.
   */
  retrieve(threadId, options) {
    return this._client.get(`/threads/${threadId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Modifies a thread.
   */
  update(threadId, body, options) {
    return this._client.post(`/threads/${threadId}`, __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  /**
   * Delete a thread.
   */
  del(threadId, options) {
    return this._client.delete(`/threads/${threadId}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers)
    }));
  }
  createAndRun(body, options) {
    return this._client.post("/threads/runs", __spreadProps(__spreadValues({
      body
    }, options), {
      headers: __spreadValues({ "OpenAI-Beta": "assistants=v1" }, options?.headers),
      stream: body.stream ?? false
    }));
  }
  /**
   * A helper to create a thread, start a run and then poll for a terminal state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  createAndRunPoll(body, options) {
    return __async(this, null, function* () {
      const run = yield this.createAndRun(body, options);
      return yield this.runs.poll(run.thread_id, run.id, options);
    });
  }
  /**
   * Create a thread and stream the run back
   */
  createAndRunStream(body, options) {
    return AssistantStream.createThreadAssistantStream(body, this._client.beta.threads, options);
  }
};
(function(Threads2) {
  Threads2.Runs = Runs;
  Threads2.RunsPage = RunsPage;
  Threads2.Messages = Messages;
  Threads2.MessagesPage = MessagesPage;
})(Threads || (Threads = {}));

// node_modules/openai/resources/beta/beta.mjs
var Beta = class extends APIResource {
  constructor() {
    super(...arguments);
    this.chat = new Chat2(this._client);
    this.assistants = new Assistants(this._client);
    this.threads = new Threads(this._client);
  }
};
(function(Beta2) {
  Beta2.Chat = Chat2;
  Beta2.Assistants = Assistants;
  Beta2.AssistantsPage = AssistantsPage;
  Beta2.Threads = Threads;
})(Beta || (Beta = {}));

// node_modules/openai/resources/completions.mjs
var Completions3 = class extends APIResource {
  create(body, options) {
    return this._client.post("/completions", __spreadProps(__spreadValues({ body }, options), { stream: body.stream ?? false }));
  }
};
/* @__PURE__ */ (function(Completions4) {
})(Completions3 || (Completions3 = {}));

// node_modules/openai/resources/embeddings.mjs
var Embeddings = class extends APIResource {
  /**
   * Creates an embedding vector representing the input text.
   */
  create(body, options) {
    return this._client.post("/embeddings", __spreadValues({ body }, options));
  }
};
/* @__PURE__ */ (function(Embeddings2) {
})(Embeddings || (Embeddings = {}));

// node_modules/openai/resources/files.mjs
var Files3 = class extends APIResource {
  /**
   * Upload a file that can be used across various endpoints. The size of all the
   * files uploaded by one organization can be up to 100 GB.
   *
   * The size of individual files can be a maximum of 512 MB or 2 million tokens for
   * Assistants. See the
   * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) to
   * learn more about the types of files supported. The Fine-tuning API only supports
   * `.jsonl` files.
   *
   * Please [contact us](https://help.openai.com/) if you need to increase these
   * storage limits.
   */
  create(body, options) {
    return this._client.post("/files", multipartFormRequestOptions(__spreadValues({ body }, options)));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(fileId, options) {
    return this._client.get(`/files/${fileId}`, options);
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/files", FileObjectsPage, __spreadValues({ query }, options));
  }
  /**
   * Delete a file.
   */
  del(fileId, options) {
    return this._client.delete(`/files/${fileId}`, options);
  }
  /**
   * Returns the contents of the specified file.
   */
  content(fileId, options) {
    return this._client.get(`/files/${fileId}/content`, __spreadProps(__spreadValues({}, options), { __binaryResponse: true }));
  }
  /**
   * Returns the contents of the specified file.
   *
   * @deprecated The `.content()` method should be used instead
   */
  retrieveContent(fileId, options) {
    return this._client.get(`/files/${fileId}/content`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues({ Accept: "application/json" }, options?.headers)
    }));
  }
  /**
   * Waits for the given file to be processed, default timeout is 30 mins.
   */
  waitForProcessing(_0) {
    return __async(this, arguments, function* (id, { pollInterval = 5e3, maxWait = 30 * 60 * 1e3 } = {}) {
      const TERMINAL_STATES = /* @__PURE__ */ new Set(["processed", "error", "deleted"]);
      const start = Date.now();
      let file = yield this.retrieve(id);
      while (!file.status || !TERMINAL_STATES.has(file.status)) {
        yield sleep(pollInterval);
        file = yield this.retrieve(id);
        if (Date.now() - start > maxWait) {
          throw new APIConnectionTimeoutError({
            message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`
          });
        }
      }
      return file;
    });
  }
};
var FileObjectsPage = class extends Page {
};
(function(Files4) {
  Files4.FileObjectsPage = FileObjectsPage;
})(Files3 || (Files3 = {}));

// node_modules/openai/resources/fine-tuning/jobs/checkpoints.mjs
var Checkpoints = class extends APIResource {
  list(fineTuningJobId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(fineTuningJobId, {}, query);
    }
    return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/checkpoints`, FineTuningJobCheckpointsPage, __spreadValues({ query }, options));
  }
};
var FineTuningJobCheckpointsPage = class extends CursorPage {
};
(function(Checkpoints2) {
  Checkpoints2.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;
})(Checkpoints || (Checkpoints = {}));

// node_modules/openai/resources/fine-tuning/jobs/jobs.mjs
var Jobs = class extends APIResource {
  constructor() {
    super(...arguments);
    this.checkpoints = new Checkpoints(this._client);
  }
  /**
   * Creates a fine-tuning job which begins the process of creating a new model from
   * a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  create(body, options) {
    return this._client.post("/fine_tuning/jobs", __spreadValues({ body }, options));
  }
  /**
   * Get info about a fine-tuning job.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  retrieve(fineTuningJobId, options) {
    return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/fine_tuning/jobs", FineTuningJobsPage, __spreadValues({ query }, options));
  }
  /**
   * Immediately cancel a fine-tune job.
   */
  cancel(fineTuningJobId, options) {
    return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
  }
  listEvents(fineTuningJobId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.listEvents(fineTuningJobId, {}, query);
    }
    return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, __spreadValues({
      query
    }, options));
  }
};
var FineTuningJobsPage = class extends CursorPage {
};
var FineTuningJobEventsPage = class extends CursorPage {
};
(function(Jobs2) {
  Jobs2.FineTuningJobsPage = FineTuningJobsPage;
  Jobs2.FineTuningJobEventsPage = FineTuningJobEventsPage;
  Jobs2.Checkpoints = Checkpoints;
  Jobs2.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;
})(Jobs || (Jobs = {}));

// node_modules/openai/resources/fine-tuning/fine-tuning.mjs
var FineTuning = class extends APIResource {
  constructor() {
    super(...arguments);
    this.jobs = new Jobs(this._client);
  }
};
(function(FineTuning2) {
  FineTuning2.Jobs = Jobs;
  FineTuning2.FineTuningJobsPage = FineTuningJobsPage;
  FineTuning2.FineTuningJobEventsPage = FineTuningJobEventsPage;
})(FineTuning || (FineTuning = {}));

// node_modules/openai/resources/images.mjs
var Images = class extends APIResource {
  /**
   * Creates a variation of a given image.
   */
  createVariation(body, options) {
    return this._client.post("/images/variations", multipartFormRequestOptions(__spreadValues({ body }, options)));
  }
  /**
   * Creates an edited or extended image given an original image and a prompt.
   */
  edit(body, options) {
    return this._client.post("/images/edits", multipartFormRequestOptions(__spreadValues({ body }, options)));
  }
  /**
   * Creates an image given a prompt.
   */
  generate(body, options) {
    return this._client.post("/images/generations", __spreadValues({ body }, options));
  }
};
/* @__PURE__ */ (function(Images2) {
})(Images || (Images = {}));

// node_modules/openai/resources/models.mjs
var Models = class extends APIResource {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(model, options) {
    return this._client.get(`/models/${model}`, options);
  }
  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(options) {
    return this._client.getAPIList("/models", ModelsPage, options);
  }
  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization to
   * delete a model.
   */
  del(model, options) {
    return this._client.delete(`/models/${model}`, options);
  }
};
var ModelsPage = class extends Page {
};
(function(Models2) {
  Models2.ModelsPage = ModelsPage;
})(Models || (Models = {}));

// node_modules/openai/resources/moderations.mjs
var Moderations = class extends APIResource {
  /**
   * Classifies if text is potentially harmful.
   */
  create(body, options) {
    return this._client.post("/moderations", __spreadValues({ body }, options));
  }
};
/* @__PURE__ */ (function(Moderations2) {
})(Moderations || (Moderations = {}));

// node_modules/openai/index.mjs
var _a;
var OpenAI = class extends APIClient {
  /**
   * API Client for interfacing with the OpenAI API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
   * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
   * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor(_a2 = {}) {
    var _b = _a2, { baseURL = readEnv("OPENAI_BASE_URL"), apiKey = readEnv("OPENAI_API_KEY"), organization = readEnv("OPENAI_ORG_ID") ?? null, project = readEnv("OPENAI_PROJECT_ID") ?? null } = _b, opts = __objRest(_b, ["baseURL", "apiKey", "organization", "project"]);
    if (apiKey === void 0) {
      throw new OpenAIError("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
    }
    const options = __spreadProps(__spreadValues({
      apiKey,
      organization,
      project
    }, opts), {
      baseURL: baseURL || `https://api.openai.com/v1`
    });
    if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
      throw new OpenAIError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
    }
    super({
      baseURL: options.baseURL,
      timeout: options.timeout ?? 6e5,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch
    });
    this.completions = new Completions3(this);
    this.chat = new Chat(this);
    this.embeddings = new Embeddings(this);
    this.files = new Files3(this);
    this.images = new Images(this);
    this.audio = new Audio(this);
    this.moderations = new Moderations(this);
    this.models = new Models(this);
    this.fineTuning = new FineTuning(this);
    this.beta = new Beta(this);
    this.batches = new Batches(this);
    this._options = options;
    this.apiKey = apiKey;
    this.organization = organization;
    this.project = project;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(opts) {
    return __spreadValues(__spreadProps(__spreadValues({}, super.defaultHeaders(opts)), {
      "OpenAI-Organization": this.organization,
      "OpenAI-Project": this.project
    }), this._options.defaultHeaders);
  }
  authHeaders(opts) {
    return { Authorization: `Bearer ${this.apiKey}` };
  }
};
_a = OpenAI;
OpenAI.OpenAI = _a;
OpenAI.OpenAIError = OpenAIError;
OpenAI.APIError = APIError;
OpenAI.APIConnectionError = APIConnectionError;
OpenAI.APIConnectionTimeoutError = APIConnectionTimeoutError;
OpenAI.APIUserAbortError = APIUserAbortError;
OpenAI.NotFoundError = NotFoundError;
OpenAI.ConflictError = ConflictError;
OpenAI.RateLimitError = RateLimitError;
OpenAI.BadRequestError = BadRequestError;
OpenAI.AuthenticationError = AuthenticationError;
OpenAI.InternalServerError = InternalServerError;
OpenAI.PermissionDeniedError = PermissionDeniedError;
OpenAI.UnprocessableEntityError = UnprocessableEntityError;
var { OpenAIError: OpenAIError2, APIError: APIError2, APIConnectionError: APIConnectionError2, APIConnectionTimeoutError: APIConnectionTimeoutError2, APIUserAbortError: APIUserAbortError2, NotFoundError: NotFoundError2, ConflictError: ConflictError2, RateLimitError: RateLimitError2, BadRequestError: BadRequestError2, AuthenticationError: AuthenticationError2, InternalServerError: InternalServerError2, PermissionDeniedError: PermissionDeniedError2, UnprocessableEntityError: UnprocessableEntityError2 } = error_exports;
var toFile2 = toFile;
var fileFromPath2 = fileFromPath;
(function(OpenAI2) {
  OpenAI2.toFile = toFile;
  OpenAI2.fileFromPath = fileFromPath;
  OpenAI2.Page = Page;
  OpenAI2.CursorPage = CursorPage;
  OpenAI2.Completions = Completions3;
  OpenAI2.Chat = Chat;
  OpenAI2.Embeddings = Embeddings;
  OpenAI2.Files = Files3;
  OpenAI2.FileObjectsPage = FileObjectsPage;
  OpenAI2.Images = Images;
  OpenAI2.Audio = Audio;
  OpenAI2.Moderations = Moderations;
  OpenAI2.Models = Models;
  OpenAI2.ModelsPage = ModelsPage;
  OpenAI2.FineTuning = FineTuning;
  OpenAI2.Beta = Beta;
  OpenAI2.Batches = Batches;
})(OpenAI || (OpenAI = {}));
var openai_default = OpenAI;
export {
  APIConnectionError2 as APIConnectionError,
  APIConnectionTimeoutError2 as APIConnectionTimeoutError,
  APIError2 as APIError,
  APIUserAbortError2 as APIUserAbortError,
  AuthenticationError2 as AuthenticationError,
  BadRequestError2 as BadRequestError,
  ConflictError2 as ConflictError,
  InternalServerError2 as InternalServerError,
  NotFoundError2 as NotFoundError,
  OpenAI,
  OpenAIError2 as OpenAIError,
  PermissionDeniedError2 as PermissionDeniedError,
  RateLimitError2 as RateLimitError,
  UnprocessableEntityError2 as UnprocessableEntityError,
  openai_default as default,
  fileFromPath2 as fileFromPath,
  toFile2 as toFile
};
//# sourceMappingURL=openai.js.map
