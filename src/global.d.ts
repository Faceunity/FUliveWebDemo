import type { funamawebassemblyType } from "@/utils/namaSDK/funamawebassembly.d.ts";
import type { RTCType } from "@/utils/types";

declare global {
  interface Window {
    nama: funamawebassemblyType;
    rtc: RTCType;
  }
}

export {};
