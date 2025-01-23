
function supportOffscreenCanvas() {
  if (typeof self !== "undefined" && "OffscreenCanvas" in self) {
    return true;
  }
  if (typeof window !== "undefined" && "OffscreenCanvas" in window) {
    return true;
  }
  return false;
}
function MediaStreamTrackProcessorPollyfills(
  videoId,
  isWorker = false,
) {
    self.MediaStreamTrackProcessor = class MediaStreamTrackProcessor {
      constructor(track) {
        if (track.kind == "video") {
          this.readable = new ReadableStream({
            async start(controller) {
              this.video = document.getElementById(videoId);
              if (!this.video) {
                console.log("未找到视频标签，初始化失败");
              }
              this.video.srcObject = new MediaStream([track]);
              await Promise.all([
                new Promise((r) => (this.video.onloadedmetadata = r)),
              ]);
              this.track = track;
              console.log(
                "videoWh",
                this.video.videoWidth,
                this.video.videoHeight,
              );
              this.t1 = performance.now();
              
              this.interval = Math.round(1000 / track.getSettings().frameRate);
              this.buffer = undefined;
            },
            async pull(controller) {
              while (
                (performance.now()-this.t1)<(this.interval-1)
              ) {
                
                  await new Promise((r) => {
                  setTimeout(() => {
                    r()
                    },
                      this.interval-(performance.now()-this.t1)
                    );
                  });  
                
                
              }
              this.t1 = performance.now();
              var f = undefined;
              if (!isWorker) {
                f = this.video;
              } else {
                var videoframe = undefined;
                var retry_count = 10;
                while (!videoframe&& retry_count>0
                )
                {
                  try {
                    retry_count--;
                    videoframe = new VideoFrame(this.video);
                  } 
                  catch (e)
                  {
                    console.log("retry_count",retry_count); 
                    await new Promise((r) => {
                      requestAnimationFrame(r);  
                    });  
                  }
                }
                if (!videoframe && retry_count == 0)
                {
                  console.error("Start Stream failed!!");
                  return;
                }
                
                const videoRect = { x: 0, y: 0, width: this.video.videoWidth, height: this.video.videoHeight };
                const options = {
                  rect: videoRect,
                  format: "RGBX",
                }
                const size=videoframe.allocationSize(options);
                if (!this.buffer||this.buffer.length!=size)
                {
                  this.buffer = new ArrayBuffer(size);
                }
                var layout = await videoframe.copyTo(this.buffer, options);
                var format = "RGBA";
                // some brower not support copyTo with format, use layout to determine format
                if (layout.length == 2)
                {
                  format="NV12";
                }
                else if (layout.length==3)
                {
                  format = "I420";
                }
                f={buffer:this.buffer,format:format,width:this.video.videoWidth,height:this.video.videoHeight};
                videoframe.close();
              }
              controller.enqueue(f);
            },
          });
        } else if (track.kind == "audio") {
          this.readable = new ReadableStream({
            async start(controller) {
              this.ac = new AudioContext();
              this.arrays = [];
              function worklet() {
                registerProcessor(
                  "mstp-shim",
                  class Processor extends AudioWorkletProcessor {
                    process(input) {
                      this.port.postMessage(input);
                      return true;
                    }
                  },
                );
              }
              await this.ac.audioWorklet.addModule(
                `data:text/javascript,(${worklet.toString()})()`,
              );
              this.node = new AudioWorkletNode(this.ac, "mstp-shim");
              this.ac
                .createMediaStreamSource(new MediaStream([track]))
                .connect(this.node);
              this.node.port.addEventListener(
                "message",
                ({ data }) => data[0][0] && this.arrays.push(data),
              );
            },
            async pull(controller) {
              while (!this.arrays.length)
                await new Promise((r) => (this.node.port.onmessage = r));
              const [channels] = this.arrays.shift();
              const joined = new Float32Array(
                channels.reduce((a, b) => a + b.length, 0),
              );
              channels.reduce(
                (offset, a) => (joined.set(a, offset), offset + a.length),
                0,
              );
              controller.enqueue(
                new AudioData({
                  format: "f32-planar",
                  sampleRate: this.ac.sampleRate,
                  numberOfFrames: channels[0].length,
                  numberOfChannels: channels.length,
                  timestamp: (this.ac.currentTime * 1e6) | 0,
                  data: joined,
                  transfer: [joined.buffer],
                }),
              );
            },
          });
        }
      }
    };
  }

function MediaStreamTrackGeneratorPolyfills(
  canvasId,
  isWorker
) {
    window.MediaStreamTrackGenerator = class MediaStreamTrackGenerator {
      constructor({ kind }) {
        if (kind == "video") {
          // const canvas = document.getElementById(canvasId);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { desynchronized: true });
          const track = canvas.captureStream().getVideoTracks()[0];

          track.writable = new WritableStream({
            write(frame) {
              //worker 流程全部使用videoframe 写入流
              if (isWorker) {
                canvas.width = frame.displayWidth;
                canvas.height = frame.displayHeight;
                ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
                frame.close();
              } else {
                //canvas
                canvas.width = frame.width;
                canvas.height = frame.height;
                ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
              }
            },
          });
          return track;
        } else if (kind == "audio") {
          const ac = new AudioContext();
          const dest = ac.createMediaStreamDestination();
          const [track] = dest.stream.getAudioTracks();
          track.writable = new WritableStream({
            async start(controller) {
              this.arrays = [];
              function worklet() {
                registerProcessor(
                  "mstg-shim",
                  class Processor extends AudioWorkletProcessor {
                    constructor() {
                      super();
                      this.arrays = [];
                      this.arrayOffset = 0;
                      this.port.onmessage = ({ data }) =>
                        this.arrays.push(data);
                      this.emptyArray = new Float32Array(0);
                    }
                    process(inputs, [[output]]) {
                      for (let i = 0; i < output.length; i++) {
                        if (
                          !this.array ||
                          this.arrayOffset >= this.array.length
                        ) {
                          this.array = this.arrays.shift() || this.emptyArray;
                          this.arrayOffset = 0;
                        }
                        output[i] = this.array[this.arrayOffset++] || 0;
                      }
                      return true;
                    }
                  },
                );
              }
              await ac.audioWorklet.addModule(
                `data:text/javascript,(${worklet.toString()})()`,
              );
              this.node = new AudioWorkletNode(ac, "mstg-shim");
              this.node.connect(dest);
              return track;
            },
            write(audioData) {
              const array = new Float32Array(
                audioData.numberOfFrames * audioData.numberOfChannels,
              );
              audioData.copyTo(array, { planeIndex: 0 });
              this.node.port.postMessage(array, [array.buffer]);
              audioData.close();
            },
          });
          return track;
        }
      }
    };
  }

export {
  MediaStreamTrackProcessorPollyfills,
  MediaStreamTrackGeneratorPolyfills,
};
