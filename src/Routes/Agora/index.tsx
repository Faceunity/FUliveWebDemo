import classNames from "classnames";
import styles from "./index.module.less";
import { useUA } from "@/utils/hooks";
import { useTranslation } from "react-i18next";
import { Button, Input, message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import AgoraRTC, { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import NamaSDK from "@/utils/namaSDK";
import {
  agoraOptions,
  agoraRemoteUserDomWidth,
  localUser,
  remoteItemUser,
  remoteUser,
} from "@/common/global";
import { useGlobalStore } from "@/store";
import FanZhuan from "@/assets/turn-around.png";
import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { isIphone, isSafari, sleep, testUA } from "@/utils/tools";

const Agora: React.FC = () => {
  const { isPc } = useUA();

  const { t } = useTranslation();
  //   const location = useLocation();
  const [joined, setJoined] = useState<boolean>(false);
  const valRef = useRef<string>();
  const channelRef = useRef<string>();
  const {
    setGlobal,
    globalData: { switchingCamera },
  } = useGlobalStore();
  const [muted, setMuted] = useState<boolean>(false);
  const faceMode = useRef<VideoFacingModeEnum>("user");

  //   const navigateWithQuery = (p: string) => {
  //     // 获取当前所有的查询参数
  //     const currentSearchParams = new URLSearchParams(location.search);
  //     const newSearchString = currentSearchParams.toString();
  //     navigate(`${p}${newSearchString ? `?${newSearchString}` : ""}`);
  //   };
  //HACK: 反转摄像头会复用同一个stream 不会触发RemoteVideo SizeChanged
  const cacheRemoteUserVideoSize = useRef<{
    [k: string]: { width: number; height: number };
  }>({});
  const initremotePlayerUser = useCallback((user: IAgoraRTCRemoteUser) => {
    let remoteStyleWidth = agoraRemoteUserDomWidth[testUA() ? "h5" : "pc"]; // remotePlayerContainer css  width: 320px
    const remotePlayerContainer = document.getElementById(remoteUser);
    // if (document.querySelector(`#${user.uid}`)) {
    //   document.querySelector(`#${user.uid}`).remove();
    // }
    const remoteItemUserDom = document.createElement("div");
    remoteItemUserDom.className = remoteItemUser;
    remoteItemUserDom.id = user.uid.toString() || "";
    remotePlayerContainer.appendChild(remoteItemUserDom);
    const remoteVideoTrack = user.videoTrack;
    // 监听remoteVideoTrack 属性变化
    let WatchSize = {
      width: 0,
      height: 0,
    };
    var setStyle = async (WatchSize) => {
      console.log("WatchSize style", {
        WatchSize,
        uid: user.uid,
      });
      await sleep(100);
      const width = WatchSize.width;
      const height = WatchSize?.height;
      cacheRemoteUserVideoSize.current[user.uid] = WatchSize;
      let styleWidth = remoteStyleWidth;
      if (width < height) {
        styleWidth = styleWidth * 0.5;
      }
      remoteItemUserDom.style.width = `${styleWidth}px`;
      remoteItemUserDom.style.height = `${(styleWidth / width) * height}px`;
    };
    if (cacheRemoteUserVideoSize.current?.[user.uid]) {
      WatchSize = cacheRemoteUserVideoSize.current[user.uid];
      setStyle(WatchSize);
    } else {
      Object.defineProperty(remoteVideoTrack, "_videoWidth", {
        set(value) {
          if (value) {
            WatchSize.width = value;
            if (WatchSize.height) {
              setStyle(WatchSize);
            }
          }
        },
      });
      Object.defineProperty(remoteVideoTrack, "_videoHeight", {
        set(value) {
          if (value) {
            WatchSize.height = value;
            if (WatchSize.width) {
              setStyle(WatchSize);
            }
          }
        },
      });
    }
    return remoteItemUserDom;
  }, []);
  const initClient = () => {
    if (!window.rtc?.client) {
      window.rtc = {
        localAudioTrack: null,
        localVideoTrack: null,
        beautyVideoTrack: null,
        client: null,
      };
      window.rtc.client = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });
      AgoraRTC.setLogLevel(3);
      // Listen for the onUserPublished event.
      window.rtc.client.on("user-published", async (user, mediaType) => {
        await window.rtc.client.subscribe(user, mediaType);
        console.log("subscribe success", user, mediaType);
        // If the remote user publishes a video track.
        if (mediaType === "video") {
          // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
          const remoteVideoTrack = user.videoTrack;
          // Specify the ID of the DIV container. You can use the uid of the remote user.
          //   remotePlayerContainer.id = user.uid.toString();
          // const uidContainer =
          //   remotePlayerContainer.querySelector("#remoteUid");
          // uidContainer.textContent = "Remote user " + user.uid.toString();
          // Play the remote video track.
          // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
          const remoteItemUserDom = initremotePlayerUser(user);
          remoteVideoTrack.play(remoteItemUserDom);
        }

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
          // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
          const remoteAudioTrack = user.audioTrack;
          // Play the remote audio track. No need to pass any DOM element.
          remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        window.rtc.client.on("user-unpublished", (user, mediaType) => {
          console.log("user-unpublished", user, mediaType);
          if (mediaType !== "video") {
            return;
          }
          // Get the dynamically created DIV container.
          const remotePlayerContainer = document.getElementById(
            user.uid.toString(),
          );
          // Destroy the container.
          remotePlayerContainer?.remove();
        });
      });

      // Traverse all remote users.
      window.rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV containers.
        const playerContainer = document.getElementById(user.uid.toString());
        playerContainer && playerContainer.remove();
      });
    }
  };

  useEffect(() => {
    initClient();
    // if (
    //   location.pathname.includes("/agora/joined") &&
    //   valRef.current === undefined
    // ) {
    //   navigate("/agora", { replace: true });
    // }
    return () => {
      if (window.rtc?.client) {
        window.rtc.client.removeAllListeners();
      }
    };
  }, []);

  const removeChildOfLocalUser = () => {
    const localPlayerContainer = document.getElementById(localUser);
    if (localPlayerContainer) {
      localPlayerContainer
        .querySelectorAll("div")
        .forEach((d: HTMLDivElement) => d.remove());
    }
  };

  const updateStreams = ({ readableStream, writableStream }) => {
    NamaSDK.instance.setCanvasAndVideoStream(
      null,
      readableStream,
      writableStream,
    );
    // Dynamically create a container in the form of a DIV element for playing the local video track.
    const localPlayerContainer = document.getElementById(localUser);
    const uidCon = localPlayerContainer?.querySelector?.("#localUid");
    if (uidCon) {
      // Specify the ID of the DIV container. You can use the uid of the local user.
      uidCon.textContent = "Local user " + valRef.current;
    }
    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    window.rtc.beautyVideoTrack.play(localPlayerContainer);
  };

  const getSteams = async (isSwitch: boolean) => {
    try {
      const res = await joinAgora(
        valRef.current,
        channelRef.current,
        faceMode.current,
        isSwitch,
        (v) => {
          setGlobal({
            cameraSetting: {
              width: v.width,
              height: v.height,
            },
          });
        },
      );
      return res;
    } catch (e) {
      console.error("joinAgora error", e);
    }
  };

  const createTrack = async (isSwitch?: boolean) => {
    setGlobal({ resetInitAgoraloading: true });
    const { readableStream, writableStream } = await getSteams(isSwitch);
    setGlobal({ resetInitAgoraloading: false });
    updateStreams({ readableStream, writableStream });
  };

  const onJoin = useCallback(async () => {
    if (!channelRef.current) {
      message.error(t("请输入频道"));
      return;
    }
    if (!valRef.current) {
      message.error(t("请输入用户ID"));
      return;
    }
    console.log("joined", joined);
    if (!joined) {
      // 加入频道
      //   navigateWithQuery("/agora/joined");
      createTrack();
    } else {
      // 离开频道
      // Destroy the local audio and video tracks.
      window.rtc.localAudioTrack?.close?.();
      window.rtc.localVideoTrack?.close?.();
      window.rtc.beautyVideoTrack?.close?.();
      NamaSDK.instance.resetInit();
      // Leave the channel.
      await window.rtc.client?.leave?.();
      initClient();
      // 删除所有remoteItemUser
      const remotePlayerContainer = document.querySelectorAll(
        `#${remoteUser} .${remoteItemUser}`,
      );
      remotePlayerContainer.forEach((d: HTMLDivElement) => d.remove());
      removeChildOfLocalUser();
    }
    setJoined(!joined);
  }, [joined]);

  const handleMute = () => {
    if (window.rtc && window.rtc.localAudioTrack) {
      const isMuted = window.rtc.localAudioTrack.muted;
      window.rtc.localAudioTrack.setMuted(!isMuted);
      setMuted(!isMuted);
    }
  };

  const handleFanzhuan = useCallback(async () => {
    if (window.rtc && window.rtc.beautyVideoTrack && !switchingCamera) {
      setGlobal({
        switchingCamera: true,
      });
      // 先创建新的视频轨道
      // 拆开是减少中间黑屏的时间
      faceMode.current =
        faceMode.current === "environment" ? "user" : "environment";
      const oldBeaTrack = window.rtc.beautyVideoTrack;
      const oldVideoTrack = window.rtc.localVideoTrack;
      // 暂停旧的track
      await window.rtc.client.unpublish(oldBeaTrack);
      oldVideoTrack?.close?.();
      oldBeaTrack?.close?.();
      getSteams(true)
        .then(({ readableStream, writableStream }) => {
          // 推送新track
          window.rtc.client.publish([
            window.rtc.localAudioTrack,
            window.rtc.beautyVideoTrack,
          ]);
          NamaSDK.instance.resetInit();
          NamaSDK.instance.setFlip(faceMode.current !== "user");
          removeChildOfLocalUser();
          updateStreams({
            readableStream,
            writableStream,
          });
        })
        .finally(() => {
          setGlobal({
            switchingCamera: false,
          });
        });
    }
  }, [switchingCamera]);

  return (
    <div className={classNames(styles.agora, isPc ? styles.pc : styles.mobile)}>
      <Loading visible={switchingCamera} />
      <div className={classNames(styles.form, joined && styles.joined)}>
        {!joined && (
          <>
            <div>{t("请输入以下信息")}</div>
            <Input
              onChange={(e) => {
                channelRef.current = e.currentTarget.value;
              }}
              placeholder={t("请输入频道")}
            ></Input>
            <Input
              onChange={(e) => {
                valRef.current = e.currentTarget.value;
              }}
              placeholder={t("请输入用户ID")}
            ></Input>
          </>
        )}
        {joined && (
          <>
            {!isPc && (
              <img
                style={{ opacity: switchingCamera ? 0.5 : 1 }}
                onClick={handleFanzhuan}
                src={FanZhuan}
                className={styles.fanzhuan}
              />
            )}
            <Button type="primary" onClick={handleMute}>
              {muted ? "开启声音" : "静音"}
            </Button>
          </>
        )}
        <Button danger={joined} type="primary" onClick={onJoin}>
          {t(joined ? "退出" : "加入")}
        </Button>
      </div>
      <div style={{ display: joined ? "block" : "none", height: "100%" }}>
        <Layout />
      </div>
    </div>
  );
};

export default Agora;
// ios低版本旋转video画面
const rotateVideoSize = (originTrack, cb): Promise<any> => {
  return Promise.race([
    new Promise((resolve) => {
      // ios摄像机视频轨道出来的分辨率尺寸不会自动翻转，这个时候需要用video标签这种方式来过一遍就会获取到对应的尺寸了
      const video = document.createElement("video");
      video.srcObject = new MediaStream([originTrack]);
      //HACK: 部分低版本ios 相机onloadedmetadata后仍然是错误的，需要手动调整宽高
      const isIphoneBrowser = isIphone();
      video.onloadedmetadata = () => {
        console.log(
          "video loadedmetadata",
          video.videoWidth,
          video.videoHeight,
        );
        const size = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        if (isIphoneBrowser) {
          // 强制把更大的值给height
          size.width = Math.min(video.videoWidth, video.videoHeight);
          size.height = Math.max(video.videoWidth, video.videoHeight);
        }
        cb?.({ width: size.width, height: size.height });
        resolve(true);
        setTimeout(() => {
          video.remove();
        }, 500);
      };
    }),
    sleep(1500),
  ]);
};
const joinAgora = async (
  uid: string,
  channel: string,
  facingMode: VideoFacingModeEnum,
  isSwitch?: boolean,
  cb?: (v: { width: number; height: number }) => void,
) => {
  if (!isSwitch) {
    //检测如果agoraOptions.appId是undefined跳出弹窗，无法关闭的弹窗


    if (!agoraOptions.appId || !agoraOptions.token) {
      alert("请先配置agoraOptions.appId");
      return;
    }

    await window.rtc.client.join(
      agoraOptions.appId,
      channel,
      agoraOptions.token,
      uid,
    );

    // Create a local audio track from the audio sampled by a microphone.
    window.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  }
  const isSafariBrowser = isSafari();
  // Create a local video track from the video captured by a camera.
  window.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
    encoderConfig: isSafariBrowser ? "720p_auto" : "720p_3",
    // encoderConfig: {
    //   width: { max: 1280 },
    //   height: { max: 1280 },
    //   // width: 1280,
    //   // height: 720,
    // },
    facingMode,
  });
  // window.rtc.localVideoTrack.play("origin");
  const originTrack = window.rtc.localVideoTrack.getMediaStreamTrack();
  //@ts-ignore
  const msProcessor = new MediaStreamTrackProcessor(originTrack);
  let readableStream = msProcessor.readable;
  console.log("readableStream", readableStream, msProcessor);
  //@ts-ignore
  const trackGenerator = new MediaStreamTrackGenerator({ kind: "video" });
  let writable = trackGenerator.writable;
  const streamAfter = new MediaStream([trackGenerator]);
  let processed_track = streamAfter.getVideoTracks()[0];
  const settings = originTrack.getSettings();
  const rotateSize = {
    width: settings.width,
    height: settings.height,
  };
  console.log("joinAgora settings", settings);
  await rotateVideoSize(originTrack, (params) => {
    if (params.width && params.height) {
      rotateSize.width = params.width;
      rotateSize.height = params.height;
    }
  });
  cb?.(rotateSize);
  try {
    // @ts-ignore
    processed_track.width = originTrack.width ?? rotateSize.width;
    // @ts-ignore
    processed_track.height = originTrack.height ?? rotateSize.height;
    // @ts-ignore
    processed_track.frameRate = originTrack.frameRate ?? settings.frameRate;

    window.rtc.beautyVideoTrack = await AgoraRTC.createCustomVideoTrack({
      mediaStreamTrack: processed_track,
    });
  } catch (e) {
    console.error("new AgoraRTC.createCustomVideoTrack", e);
  }
  // Publish the local audio and video tracks to the RTC channel.
  if (!isSwitch) {
    await window.rtc.client.publish([
      window.rtc.localAudioTrack,
      window.rtc.beautyVideoTrack,
    ]);
  }
  console.log("publish success!");
  return {
    readableStream,
    writableStream: writable,
    settings,
  };
};
