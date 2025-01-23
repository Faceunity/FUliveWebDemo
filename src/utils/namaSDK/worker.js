import SharedLogic from "./shared";

const shared = new SharedLogic(true);

self.addEventListener(
  "message",
  function (e) {
    var m = e.data;
    var cmd = m.cmd;
    var msg = m.msg;
    console.log("worker receive", cmd, msg);
    switch (cmd) {
      case "agora":
        console.log("更新agora", msg);
        shared.updateIsAgora(msg);
        break;
      case "prepare":
        console.log("msg", msg);
        Object.keys(msg).forEach((k) => {
          shared.getPrepare(k, msg[k]);
        });
        break;
      case "render":
        shared.BeginRender(msg);
        break;
      case "setParams":
        shared.setParams(msg);
        break;
      case "setStickers":
        shared.setStciker(msg);
        break;
      case "clearSticker":
        shared.clearSticker();
        break;
      case "setRenderEmpty":
        shared.setRenderEmpty(msg);
        break;
      case "getStatistics":
        console.log("statistic", msg);
        shared.statistic = msg;
        break;
      case "setFaceProcessor":
        shared.setFaceProcessor(msg);
        break;
      case "resetInit":
        shared.resetStream();
        break;
      case "auth":
        shared.loadModule(msg);
        break;
      case "setFlip":
        shared.setFlip(msg);
        break;
      case "destroy":
        shared.destroy();
        break;
      default:
        break;
    }
  },
  false,
);
