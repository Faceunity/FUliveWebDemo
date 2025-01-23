function CheckImageBitmapSupport() {
  if (typeof self !== "undefined" && "createImageBitmap" in self) {
    return true;
  }
  if (typeof window !== "undefined" && "createImageBitmap" in window) {
    return true;
  }
  return false;
}
function IsImageBitMap(input) {
  if (CheckImageBitmapSupport()) {
    return input instanceof ImageBitmap;
  }
  return false;
}

/*function CheckImageDataSupport() {
  if (typeof self !== "undefined" && "ImageData" in self) {
    return true;
  }
  if (typeof window !== "undefined" && "ImageData" in window) {
    return true;
  }
  return false;
}
 function IsImageData(input) {
  if (CheckImageDataSupport()) {
    return input instanceof ImageData;
  }
  return false;
} */
function CheckHTMLCanvasVideoSupport() {
  if (typeof self !== "undefined" && "HTMLVideoElement" in self) {
    return true;
  }
  if (typeof window !== "undefined" && "HTMLVideoElement" in window) {
    return true;
  }
  return false;
}
function IsHTMLVideoElement(input) {
  if (CheckHTMLCanvasVideoSupport()) {
    return input instanceof HTMLVideoElement;
  }
  return false;
}

if (!CheckImageBitmapSupport()) {
  // @ts-ignore
  class ImageBitmap {
    constructor() {
      throw new Error("ImageBitmap is not supported in this environment.");
    }
  }
}
class FPSMonitor {
  callingTime = 0;
  callingCount = 0;
  roundStartTime = 0;

  start = 0;
  end = 0;
  fps = 0;
  rtt = 0;
  OnFpsUpdate = undefined;
  constructor() {
    this.Reset();
  }
  Reset() {
    this.callingTime = 0;
    this.callingCount = 0;
    this.roundStartTime = Date.now();
  }
  Begin() {
    this.start = Date.now();
  }
  End() {
    this.end = Date.now();
    const UsedTime = this.end - this.start;
    this.callingTime += UsedTime;
    this.callingCount++;
    var duration = this.end - this.roundStartTime;
    if (duration >= 1000) {
      this.fps = (this.callingCount / duration) * 1000;
      this.rtt = this.callingTime / this.callingCount;
      this.Reset();
      if (this.OnFpsUpdate) {
        this.OnFpsUpdate(this.fps, this.rtt);
      }
    }
  }
}

class NamaRendererBase {
  module = null;
  gl = undefined;
  renderList = undefined;
  onBeforeRender = undefined;
  onAfterRender = undefined;
  viewport = undefined;
  framId = 0;
  items_mask = new Int32Array(0);
  fpsMonitor = new FPSMonitor();
  width: number = 0;
  height: number = 0;
  requestAnimationId = undefined;
  timer = undefined;
  constructor(module) {
    this.module = module;
    this.gl = this.module.canvas.getContext("webgl2");
    if (!this.gl) {
      this.gl = this.module.canvas.getContext("webgl");
      if (!this.gl) {
        console.error("Renderer initialize failed! get context failed!");
      }
    }
  }
  destroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
      this.requestAnimationId = undefined;
    }

    this.fpsMonitor.Reset();
    this.width = 0;
    this.height = 0;
    this.framId = 0;
    this.onBeforeRender = undefined;
    this.onAfterRender = undefined;
    this.fpsMonitor.OnFpsUpdate = undefined;
    this.renderList = undefined;
    this.gl = undefined;
  }
  setViewport(x, y, width, height) {
    this.viewport = { x: x, y: y, w: width, h: height };
  }
  setRenderList(renderList: Int32Array) {
    this.renderList = renderList;
  }

  setOnBeforeRender(onBeforeRender) {
    this.onBeforeRender = onBeforeRender;
  }
  setOnFpsUpdate(onFpsUpdate) {
    this.fpsMonitor.OnFpsUpdate = onFpsUpdate;
  }
  setOnAfterRender(onAfterRender) {
    this.onAfterRender = onAfterRender;
  }
  readPixels() {
    let pixels = new Uint8Array(this.viewport.w * this.viewport.h * 4);
    this.gl.readPixels(
      this.viewport.x,
      this.viewport.y,
      this.viewport.w,
      this.viewport.h,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels,
    );
    return pixels;
  }
  UpdateInput() {}

  render(
    renderInput: number | Uint8Array | ArrayBuffer,
    bufferFormat, //only use for Uint8Array input
    recursive: boolean,
    interval: number,
  ) {
    if (renderInput == undefined) {
      console.error("renderInput is undefined!");
      return;
    }
    if (this.onBeforeRender) {
      this.onBeforeRender();
    }
    var viewport = new this.module.CanvasViewport(
      this.viewport.x,
      this.viewport.y,
      this.viewport.w,
      this.viewport.h,
    );
    var flag = new this.module.FURENDERFEATURE();
    flag.value =
      this.module.FURENDERFEATURE.RENDER_FEATURE_FULL.value |
      this.module.FURENDERFEATURE.RENDER_OPTION_FORCE_OUTPUT_ALPHA_ONE.value;
    this.UpdateInput();
    this.fpsMonitor.Begin();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    if (typeof renderInput == "number") {
      this.module.fuRenderTextureToCanvas(
        renderInput,
        this.module.FUFORMAT.FORMAT_RGBA_TEXTURE,
        this.width,
        this.height,
        this.framId++,
        this.renderList,
        flag,
        this.items_mask,
        viewport,
      );
    }
    if (
      renderInput instanceof Uint8Array ||
      renderInput instanceof ArrayBuffer
    ) {
      this.module.fuRenderBufferToCanvas(
        renderInput,
        bufferFormat ? bufferFormat : this.module.FUFORMAT.FORMAT_RGBA_BUFFER,
        this.width,
        this.height,
        this.framId++,
        this.renderList,
        flag,
        this.items_mask,
        viewport,
      );
    }
    this.fpsMonitor.End();

    viewport.delete();
    if (this.onAfterRender) {
      this.onAfterRender();
    }
    if (recursive) {
      const that = this;
      //this.timer=setTimeout(() => {
      // that.requestAnimationId = requestAnimationFrame(()=>{
      //     that.render(renderInput, recursive,interval);
      // });
      //}, interval);
      // this.timer = setTimeout(() => {
      //     that.render(renderInput, recursive,interval);
      // })
      let lastTime = Date.now();
      let accumulatedTime = 0;
      this.requestAnimationId = requestAnimationFrame(function animate() {
        that.requestAnimationId = requestAnimationFrame(animate);
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        accumulatedTime += deltaTime;

        if (accumulatedTime >= interval) {
          accumulatedTime -= interval;
          that.render(renderInput, bufferFormat, false, 0);
        } else {
          //console.log("Skipped a frame")
        }
      });
    }
  }
  clearCanvas() {
    if (this.gl) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }
}

class ImageRenderer extends NamaRendererBase {
  imageBuffer: ImageBitmap | Uint8Array | HTMLVideoElement | undefined =
    undefined;
  curTextureId = undefined;
  curTexture = undefined;
  fps = 30;
  constructor(module) {
    super(module);
  }
  destroy() {
    if (this.curTexture) {
      this.gl.deleteTexture(this.curTexture);
      this.module.fuUnRegisterNativeTexture(this.curTextureId);
      this.curTexture = undefined;
      this.curTextureId = undefined;
    }
    this.imageBuffer = undefined;
    super.destroy();
  }
  setImageBuffer(
    imageBuffer: ImageBitmap | Uint8Array | HTMLVideoElement,
    width: number,
    height: number,
    flip,
  ) {
    this.imageBuffer = imageBuffer;
    this.width = width;
    this.height = height;
    if (IsImageBitMap(imageBuffer) || imageBuffer instanceof HTMLVideoElement) {
      if (flip) {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0_FLIPHORIZONTAL,
        );
      } else {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0,
        );
      }
      this.module.fuSetInputCameraBufferMatrix(
        this.module.FUTRANSFORM.CCROT0_FLIPVERTICAL,
      );
      this.module.fuSetDefaultRotationMode(2);
    } else if (imageBuffer instanceof Uint8Array) {
      if (flip) {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0_FLIPHORIZONTAL,
        );
        this.module.fuSetInputCameraBufferMatrix(
          this.module.FUTRANSFORM.CCROT0_FLIPHORIZONTAL,
        );
      } else {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0,
        );
        this.module.fuSetInputCameraBufferMatrix(
          this.module.FUTRANSFORM.CCROT0,
        );
      }

      this.module.fuSetDefaultRotationMode(0);
    }
  }
  setFps(fps) {
    this.fps = fps;
  }
  UpdateInput() {
    if (this.imageBuffer instanceof HTMLVideoElement) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.curTexture);
      this.gl.texSubImage2D(
        this.gl.TEXTURE_2D,
        0,
        0,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        this.imageBuffer,
      );
    }
  }
  beginRender() {
    if (
      IsImageBitMap(this.imageBuffer) ||
      this.imageBuffer instanceof HTMLVideoElement
    ) {
      if (this.curTexture) {
        this.gl.deleteTexture(this.curTexture);
        this.module.fuUnregisterNativeTexture(this.curTextureId);
        this.curTexture = undefined;
        this.curTextureId = undefined;
      }

      this.curTexture = this.gl.createTexture();
      this.curTextureId = this.module.fuRegisterNativeTexture(this.curTexture);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.curTexture);
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_S,
        this.gl.CLAMP_TO_EDGE,
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_T,
        this.gl.CLAMP_TO_EDGE,
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MIN_FILTER,
        this.gl.LINEAR,
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MAG_FILTER,
        this.gl.LINEAR,
      );

      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        this.imageBuffer,
      );
    }
    this.framId = 0;
    this.fpsMonitor.Reset();
    if (
      IsImageBitMap(this.imageBuffer) ||
      this.imageBuffer instanceof HTMLVideoElement
    )
      super.render(this.curTextureId, undefined, true, 1000 / this.fps);
    else if (this.imageBuffer instanceof Uint8Array)
      super.render(this.imageBuffer, undefined, true, 1000 / this.fps);
  }
}

class StreamRenderer extends NamaRendererBase {
  inputStream = undefined;
  writerStream = undefined;
  renderInput = undefined;

  stop = true;
  writer = undefined;
  reader = undefined;
  needNamaProcess = true;
  curTextureId = undefined;
  curTexture = undefined;
  constructor(module) {
    super(module);
  }
  setStream(stream: ReadableStream, bufferInput: boolean, flip) {
    this.inputStream = stream;
    this.reader = stream.getReader();

    if (bufferInput) {
      if (flip) {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0_FLIPHORIZONTAL,
        );
        this.module.fuSetInputCameraBufferMatrix(
          this.module.FUTRANSFORM.CCROT0_FLIPHORIZONTAL,
        );
      } else {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0,
        );
        this.module.fuSetInputCameraBufferMatrix(
          this.module.FUTRANSFORM.CCROT0,
        );
      }
      this.module.fuSetDefaultRotationMode(0);
    } else {
      if (flip) {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0_FLIPHORIZONTAL,
        );
      } else {
        this.module.fuSetInputCameraTextureMatrix(
          this.module.FUTRANSFORM.CCROT0,
        );
      }

      this.module.fuSetInputCameraBufferMatrix(
        this.module.FUTRANSFORM.CCROT0_FLIPVERTICAL,
      );
      this.module.fuSetDefaultRotationMode(2);
    }
  }
  setWritableStream(writableStream: WritableStream, needNamaProcess: boolean) {
    this.writerStream = writableStream;
    this.writer = writableStream.getWriter();
    this.needNamaProcess = needNamaProcess;
  }
  destroy() {
    this.stop = true;
    if (this.writer) {
      this.writer.abort();
      this.writer = undefined;
    }
    if (this.reader) {
      this.reader = undefined;
    }
    this.inputStream = undefined;
    this.renderInput = undefined;
    this.writerStream = undefined;
    this.needNamaProcess = true;
    if (this.curTexture) {
      this.gl.deleteTexture(this.curTexture);
      this.module.fuUnRegisterNativeTexture(this.curTextureId);
      this.curTexture = undefined;
      this.curTextureId = undefined;
    }
    super.destroy();
  }

  beginRender() {
    this.stop = false;
    const reader = this.reader;
    if (this.curTexture) {
      this.gl.deleteTexture(this.curTexture);
      this.module.fuUnregisterNativeTexture(this.curTextureId);
      this.curTexture = undefined;
      this.curTextureId = undefined;
    }

    function VideoFrameFormatToFUFormat(format, module) {
      switch (format) {
        case "RGBA":
        case "RGBX":
          return module.FUFORMAT.FORMAT_RGBA_BUFFER;
        case "BGRA":
          return module.FUFORMAT.FORMAT_BGRA_BUFFER;
        case "I420":
          return module.FUFORMAT.FORMAT_I420_BUFFER;
        case "NV12":
          return module.FUFORMAT.FORMAT_NV12_BUFFER;
        default: {
          console.log("unsupported videoframe format", format);
          return module.FUFORMAT.FORMAT_RGBA_BUFFER;
        }
      }
    }
    const that = this;
    //var frame = undefined;
    reader.read().then(function ReadAndRender({ done, value }) {
      if (done || that.stop) {
        console.warn("Sorry ,Stream end");
        return;
      }
      var videoFrame = value;
      requestAnimationFrame(() => {
        if (that.stop) {
          return;
        }
        if (IsHTMLVideoElement(value)) {
          that.width = value.videoWidth;
          that.height = value.videoHeight;
        } else if (value != undefined) {
          that.width = value.width;
          that.height = value.height;
        } else {
          console.error("StreamRenderer:Not support input type");
          return;
        }

        if (!IsHTMLVideoElement(value)) {
          that.renderInput = value;
        } else {
          if (!that.curTexture) {
            that.curTexture = that.gl.createTexture();
            that.curTextureId = that.module.fuRegisterNativeTexture(
              that.curTexture,
            );
            that.gl.bindTexture(that.gl.TEXTURE_2D, that.curTexture);
            that.gl.texParameteri(
              that.gl.TEXTURE_2D,
              that.gl.TEXTURE_WRAP_S,
              that.gl.CLAMP_TO_EDGE,
            );
            that.gl.texParameteri(
              that.gl.TEXTURE_2D,
              that.gl.TEXTURE_WRAP_T,
              that.gl.CLAMP_TO_EDGE,
            );
            that.gl.texParameteri(
              that.gl.TEXTURE_2D,
              that.gl.TEXTURE_MIN_FILTER,
              that.gl.LINEAR,
            );
            that.gl.texParameteri(
              that.gl.TEXTURE_2D,
              that.gl.TEXTURE_MAG_FILTER,
              that.gl.LINEAR,
            );

            that.gl.texImage2D(
              that.gl.TEXTURE_2D,
              0,
              that.gl.RGBA,
              that.gl.RGBA,
              that.gl.UNSIGNED_BYTE,
              videoFrame,
            );
          } else {
            that.gl.bindTexture(that.gl.TEXTURE_2D, that.curTexture);
            that.gl.texSubImage2D(
              that.gl.TEXTURE_2D,
              0,
              0,
              0,
              that.gl.RGBA,
              that.gl.UNSIGNED_BYTE,
              videoFrame,
            );
          }
          that.renderInput = that.curTextureId;
        }
        if (that.needNamaProcess) {
          if (!IsHTMLVideoElement(value)) {
            that.render(
              that.renderInput.buffer,
              VideoFrameFormatToFUFormat(value.format, that.module),
              false,
              0,
            );
          } else {
            that.render(that.renderInput, undefined, false, 0);
          }
        }
        try {
          if (that.writerStream) {
            if (!that.stop) {
              let newFrame = undefined;
              if (!IsHTMLVideoElement(value)) {
                if (that.needNamaProcess) {
                  newFrame = new VideoFrame(that.module.canvas, {
                    format: "RGBA",
                    codedWidth: that.width,
                    codedHeight: that.height,
                    timestamp: Date.now(),
                  });
                } else {
                  var init = {
                    codedWidth: videoFrame.width,
                    codedHeight: videoFrame.height,
                    format: videoFrame.format,
                    timestamp: 0,
                    transfer: [videoFrame.buffer],
                  };
                  newFrame = new VideoFrame(videoFrame.buffer, init);
                }
                that.writer.write(newFrame).finally(() => {
                  newFrame.close();
                });
              } else {
                if (that.needNamaProcess) {
                  newFrame = that.module.canvas;
                } else {
                  newFrame = videoFrame;
                }
                that.writer.write(newFrame);
              }
            } else {
              that.writer.close();
            }
          }
        } catch (e) {
          console.error("videoFrame error", e);
        }

        if (!that.stop) {
          return reader.read().then(ReadAndRender);
        }
      });
    });
  }
}
export { ImageRenderer, StreamRenderer };
