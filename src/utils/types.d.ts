import {
  ILocalAudioTrack,
  ILocalVideoTrack,
  IAgoraRTCClient,
} from "agora-rtc-sdk-ng";

export interface RTCType {
  localAudioTrack: ILocalAudioTrack;
  localVideoTrack: ILocalVideoTrack;
  beautyVideoTrack: any;
  client: IAgoraRTCClient;
}
