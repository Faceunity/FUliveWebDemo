import { CDNBase } from "@/common/global";

export const fetchBundle = (name: string) => {
  return fetch(CDNBase + `/bundles/${name}?t=${Date.now()}`, {
    method: "get",
  }).then(async (res) => new Uint8Array(await res.arrayBuffer()));
};

export const fetchCert = () => {
  return fetch(CDNBase + `/authpack.bin?t=${Date.now()}`, {
    method: "get",
  }).then(async (res) => new Uint8Array(await res.arrayBuffer()));
};
