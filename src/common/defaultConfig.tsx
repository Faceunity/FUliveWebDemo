import { ReactNode } from "react";
import {
  Changbi,
  Dayan,
  Duanlian,
  Etou,
  Hongrun,
  Kaiyanjiao,
  Liangyan,
  Meibai,
  Meijianju,
  Meimaocuxi,
  Meimaoshangxia,
  Meiya,
  PcMopi,
  Qingxi,
  // Qubanqudou,
  Qufalingwen,
  Quheiyanquan,
  Ruihua,
  Shoubi,
  Shouegu,
  Shouxiaegu,
  Suorenzhong,
  Vlian,
  Weixiaozuijiao,
  Wuguanliti,
  Xiaba,
  Xiaolian,
  Yanjianxiazhi,
  Yanjingjiaodu,
  Yanjingweizhi,
  Yanju,
  Yuanyan,
  Zhailian,
  Zuibahoudu,
  Zuixing,
} from "@/assets/PcSvg";
import MobCb from "@/assets/mobIcons/MobCb.png";
import MobCbActive from "@/assets/mobIcons/MobCbActive.png";
import MobCbChanges from "@/assets/mobIcons/MobCbChanges.png";
import MobCbChangesActive from "@/assets/mobIcons/MobCbChangesActive.png";
import MobDayan from "@/assets/mobIcons/MobDayan.png";
import MobDayanActive from "@/assets/mobIcons/MobDayanActive.png";
import MobDayanChangeActive from "@/assets/mobIcons/MobDayanChangeActive.png";
import MobDayanChanges from "@/assets/mobIcons/MobDayanChanges.png";
import MobDuanlian from "@/assets/mobIcons/MobDuanlian.png";
import MobDuanlianActive from "@/assets/mobIcons/MobDuanlianActive.png";
import MobDuanlianChanges from "@/assets/mobIcons/MobDuanlianChanges.png";
import MobDuanlianChangesActive from "@/assets/mobIcons/MobDuanlianChangesActive.png";
import MobEt from "@/assets/mobIcons/MobEt.png";
import MobEtActive from "@/assets/mobIcons/MobEtActive.png";
import MobEtChanges from "@/assets/mobIcons/MobEtChanges.png";
import MobEtChangesActive from "@/assets/mobIcons/MobEtChangesActive.png";
import MobHongrun from "@/assets/mobIcons/MobHongrun.png";
import MobHongrunActive from "@/assets/mobIcons/MobHongrunActive.png";
import MobHongrunChanges from "@/assets/mobIcons/MobHongrunChanges.png";
import MobHongrunChangesActive from "@/assets/mobIcons/MobHongrunChangesActive.png";
import MobKyj from "@/assets/mobIcons/MobKyj.png";
import MobKyjActive from "@/assets/mobIcons/MobKyjActive.png";
import MobKyjChanges from "@/assets/mobIcons/MobKyjChanges.png";
import MobKyjChangesActive from "@/assets/mobIcons/MobKyjChangesActive.png";
import MobLy from "@/assets/mobIcons/MobLy.png";
import MobLyActive from "@/assets/mobIcons/MobLyActive.png";
import MobLyChanges from "@/assets/mobIcons/MobLyChanges.png";
import MobLyChangesActive from "@/assets/mobIcons/MobLyChangesActive.png";
import MobMeibai from "@/assets/mobIcons/MobMeibai.png";
import MobMeibaiActive from "@/assets/mobIcons/MobMeibaiActive.png";
import MobMeibaiChanges from "@/assets/mobIcons/MobMeibaiChanges.png";
import MobMeibaiChangesActive from "@/assets/mobIcons/MobMeibaiChangesActive.png";
import MobMeiya from "@/assets/mobIcons/MobMeiya.png";
import MobMeiyaActive from "@/assets/mobIcons/MobMeiyaActive.png";
import MobMeiyaChanges from "@/assets/mobIcons/MobMeiyaChanges.png";
import MobMeiyaChangesActive from "@/assets/mobIcons/MobMeiyaChangesActive.png";
import MobMjj from "@/assets/mobIcons/MobMjj.png";
import MobMjjActive from "@/assets/mobIcons/MobMjjActive.png";
import MobMjjChanges from "@/assets/mobIcons/MobMjjChanges.png";
import MobMjjChangesActive from "@/assets/mobIcons/MobMjjChangesActive.png";
import MobMmcx from "@/assets/mobIcons/MobMmcx.png";
import MobMmcxActive from "@/assets/mobIcons/MobMmcxActive.png";
import MobMmcxChanges from "@/assets/mobIcons/MobMmcxChanges.png";
import MobMmcxChangesActive from "@/assets/mobIcons/MobMmcxChangesActive.png";
import MobMmsx from "@/assets/mobIcons/MobMmsx.png";
import MobMmsxActive from "@/assets/mobIcons/MobMmsxActive.png";
import MobMmsxChanges from "@/assets/mobIcons/MobMmsxChanges.png";
import MobMmsxChangesActive from "@/assets/mobIcons/MobMmsxChangesActive.png";
import MobMopi from "@/assets/mobIcons/MobMopi.png";
import MobMopiActive from "@/assets/mobIcons/MobMopiActive.png";
import MobMopiChanges from "@/assets/mobIcons/MobMopiChanges.png";
import MobMopiChangesActive from "@/assets/mobIcons/MobMopiChangesActive.png";
// import MobQbqd from "@/assets/mobIcons/MobQbqd.png";
// import MobQbqdActive from "@/assets/mobIcons/MobQbqdActive.png";
// import MobQbqdChanges from "@/assets/mobIcons/MobQbqdChanges.png";
// import MobQbqdChangesActive from "@/assets/mobIcons/MobQbqdChangesActive.png";
import MobQflw from "@/assets/mobIcons/MobQflw.png";
import MobQflwActive from "@/assets/mobIcons/MobQflwActive.png";
import MobQflwChanges from "@/assets/mobIcons/MobQflwChanges.png";
import MobQflwChangesActive from "@/assets/mobIcons/MobQflwChangesActive.png";
import MobQhyq from "@/assets/mobIcons/MobQhyq.png";
import MobQhyqActive from "@/assets/mobIcons/MobQhyqActive.png";
import MobQhyqChanges from "@/assets/mobIcons/MobQhyqChanges.png";
import MobQhyqChangesActive from "@/assets/mobIcons/MobQhyqChangesActive.png";
import MobQingxi from "@/assets/mobIcons/MobQingxi.png";
import MobQingxiActive from "@/assets/mobIcons/MobQingxiActive.png";
import MobQingxiChanges from "@/assets/mobIcons/MobQingxiChanges.png";
import MobQingxiChangesActive from "@/assets/mobIcons/MobQingxiChangesActive.png";
import MobRuihua from "@/assets/mobIcons/MobRuihua.png";
import MobRuihuaActive from "@/assets/mobIcons/MobRuihuaActive.png";
import MobRuihuaChanges from "@/assets/mobIcons/MobRuihuaChanges.png";
import MobRuihuaChangesActive from "@/assets/mobIcons/MobRuihuaChangesActive.png";
import MobSb from "@/assets/mobIcons/MobSb.png";
import MobSbActive from "@/assets/mobIcons/MobSbActive.png";
import MobSbChanges from "@/assets/mobIcons/MobSbChanges.png";
import MobSbChangesActive from "@/assets/mobIcons/MobSbChangesActive.png";
import MobShoueg from "@/assets/mobIcons/MobShoueg.png";
import MobShouegActive from "@/assets/mobIcons/MobShouegActive.png";
import MobShouegChange from "@/assets/mobIcons/MobShouegChange.png";
import MobShouegChangesActive from "@/assets/mobIcons/MobShouegChangesActive.png";
import MobShoulian from "@/assets/mobIcons/MobShoulian.png";
import MobShoulianActive from "@/assets/mobIcons/MobShoulianActive.png";
import MobShoulianChanges from "@/assets/mobIcons/MobShoulianChanges.png";
import MobShoulianChangesActive from "@/assets/mobIcons/MobShoulianChangesActive.png";
import MobShouxeg from "@/assets/mobIcons/MobShouxeg.png";
import MobShouxegActive from "@/assets/mobIcons/MobShouxegActive.png";
import MobShouxegChanges from "@/assets/mobIcons/MobShouxegChanges.png";
import MobShouxegChangesActive from "@/assets/mobIcons/MobShouxegChangesActive.png";
import MobSrz from "@/assets/mobIcons/MobSrz.png";
import MobSrzActive from "@/assets/mobIcons/MobSrzActive.png";
import MobSrzChanges from "@/assets/mobIcons/MobSrzChanges.png";
import MobSrzChangesActive from "@/assets/mobIcons/MobSrzChangesActive.png";
import MobVlian from "@/assets/mobIcons/MobVlian.png";
import MobVlianActive from "@/assets/mobIcons/MobVlianActive.png";
import MobVlianChanges from "@/assets/mobIcons/MobVlianChanges.png";
import MobVlianChangesActive from "@/assets/mobIcons/MobVlianChangesActive.png";
import MobWglt from "@/assets/mobIcons/MobWglt.png";
import MobWgltActive from "@/assets/mobIcons/MobWgltActive.png";
import MobWgltChanges from "@/assets/mobIcons/MobWgltChanges.png";
import MobWgltChangesActive from "@/assets/mobIcons/MobWgltChangesActive.png";
import MobWxzj from "@/assets/mobIcons/MobWxzj.png";
import MobWxzjActive from "@/assets/mobIcons/MobWxzjActive.png";
import MobWxzjChanges from "@/assets/mobIcons/MobWxzjChanges.png";
import MobWxzjChangesActive from "@/assets/mobIcons/MobWxzjChangesActive.png";
import MobXb from "@/assets/mobIcons/MobXb.png";
import MobXbActive from "@/assets/mobIcons/MobXbActive.png";
import MobXbChangeActive from "@/assets/mobIcons/MobXbChangeActive.png";
import MobXbChanges from "@/assets/mobIcons/MobXbChanges.png";
import MobXianlianChanges from "@/assets/mobIcons/MobXianlianChanges.png";
import MobXiaolian from "@/assets/mobIcons/MobXiaolian.png";
import MobXiaolianActive from "@/assets/mobIcons/MobXiaolianActive.png";
import MobXiaolianChangesActive from "@/assets/mobIcons/MobXiaolianChangesActive.png";
import MobYj from "@/assets/mobIcons/MobYj.png";
import MobYjActive from "@/assets/mobIcons/MobYjActive.png";
import MobYjChanges from "@/assets/mobIcons/MobYjChanges.png";
import MobYjChangesActive from "@/assets/mobIcons/MobYjChangesActive.png";
import MobYjjd from "@/assets/mobIcons/MobYjjd.png";
import MobYjjdActive from "@/assets/mobIcons/MobYjjdActive.png";
import MobYjjdChanges from "@/assets/mobIcons/MobYjjdChanges.png";
import MobYjjdChangesActive from "@/assets/mobIcons/MobYjjdChangesActive.png";
import MobYjwz from "@/assets/mobIcons/MobYjwz.png";
import MobYjwzActive from "@/assets/mobIcons/MobYjwzActive.png";
import MobYjwzChanges from "@/assets/mobIcons/MobYjwzChanges.png";
import MobYjwzChangesActive from "@/assets/mobIcons/MobYjwzChangesActive.png";
import MobYjxz from "@/assets/mobIcons/MobYjxz.png";
import MobYjxzActive from "@/assets/mobIcons/MobYjxzActive.png";
import MobYjxzChanges from "@/assets/mobIcons/MobYjxzChanges.png";
import MobYjxzChangesActive from "@/assets/mobIcons/MobYjxzChangesActive.png";
import MobYuanyan from "@/assets/mobIcons/MobYuanyan.png";
import MobYuanyanActive from "@/assets/mobIcons/MobYuanyanActive.png";
import MobYuanyanChangeActive from "@/assets/mobIcons/MobYuanyanChangeActive.png";
import MobYuanyanChanges from "@/assets/mobIcons/MobYuanyanChanges.png";
import MobZchd from "@/assets/mobIcons/MobZchd.png";
import MobZchdActive from "@/assets/mobIcons/MobZchdActive.png";
import MobZchdChanges from "@/assets/mobIcons/MobZchdChanges.png";
import MobZchdChangesActive from "@/assets/mobIcons/MobZchdChangesActive.png";
import MobZhailian from "@/assets/mobIcons/MobZhailian.png";
import MobZhailianActive from "@/assets/mobIcons/MobZhailianActive.png";
import MobZhailianChanges from "@/assets/mobIcons/MobZhailianChanges.png";
import MobZhalianChangesActive from "@/assets/mobIcons/MobZhalianChangesActive.png";
import MobZx from "@/assets/mobIcons/MobZx.png";
import MobZxActive from "@/assets/mobIcons/MobZxActive.png";
import MobZxChanges from "@/assets/mobIcons/MobZxChanges.png";
import MobZxChangesActive from "@/assets/mobIcons/MobZxChangesActive.png";
import shoulian from "@/assets/shoulian.png";

export interface TabOptionItem {
  key: string;
  label: string;
  PcIcon?: ReactNode;
  MobIcons?: string[];
  range?: [number, number];
  rawRange?: [number, number];
  rawInitValue?: number;
  index?: number;
  fuKey: string;
  reflexType?: 1 | 2 | 3;
  value?: number;
  initValue?: number; // 记录换算后的原始值
}

export enum menuKey {
  beauty,
  sticker,
  effects,
  shaping,
  filter,
}

export enum BundleEnum {
  face_beautification = "face_beautification.bundle",
  ai_face_processor_pc = "ai_face_processor_pc.bundle",
  ai_face_processor = "ai_face_processor.bundle",
  ShiShangCWei = "ShiShangCWei.bundle",
  XingGanHuZi = "XingGanHuZi.bundle",
  HuDiePianPian = "HuDiePianPian.bundle",
  BlueMask = "BlueMask.bundle",
  XiaRiJiaoYou = "XiaRiJiaoYou.bundle",
  HappyNewYear2 = "HappyNewYear2.bundle",
  Christmas = "Christmas.bundle",
  sdlr = "sdlr.bundle",
  DaisyPig = "DaisyPig.bundle",
  newy1 = "newy1.bundle",
  CatSparks = "CatSparks.bundle",
  zaoAn = "zaoAn.bundle",
  HeartEyes = "HeartEyes.bundle",
  HolidayDevils = "HolidayDevils.bundle",
}

const effectsList: TabOptionItem[] = [
  {
    key: "磨皮",
    label: "磨皮",
    range: [0, 100],
    PcIcon: <PcMopi />,
    MobIcons: [MobMopi, MobMopiChanges, MobMopiActive, MobMopiChangesActive],
    fuKey: "blur_level",
    rawInitValue: 6,
    rawRange: [0, 6],
    reflexType: 3,
    initValue: 55,
  },
  // {
  //   key: "祛斑祛痘",
  //   label: "祛斑祛痘",
  //   range: [0, 100],
  //   PcIcon: <Qubanqudou />,
  //   MobIcons: [MobQbqd, MobQbqdChanges, MobQbqdActive, MobQbqdChangesActive],
  //   fuKey: "delspot_level",
  //   rawInitValue: 0,
  //   rawRange: [0, 1],
  //   initValue: 0,
  // },
  {
    key: "美白",
    label: "美白",
    range: [0, 100],
    PcIcon: <Meibai />,
    MobIcons: [
      MobMeibai,
      MobMeibaiChanges,
      MobMeibaiActive,
      MobMeibaiChangesActive,
    ],
    fuKey: "color_level_mode2",
    rawInitValue: 0.2,
    rawRange: [0, 1],
    initValue: 40,
  },
  {
    key: "红润",
    label: "红润",
    range: [0, 100],
    PcIcon: <Hongrun />,
    MobIcons: [
      MobHongrun,
      MobHongrunChanges,
      MobHongrunActive,
      MobHongrunChangesActive,
    ],
    fuKey: "red_level",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    initValue: 30,
  },
  {
    key: "清晰",
    label: "清晰",
    range: [0, 100],
    PcIcon: <Qingxi />,
    MobIcons: [
      MobQingxi,
      MobQingxiChanges,
      MobQingxiActive,
      MobQingxiChangesActive,
    ],
    fuKey: "clarity",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "锐化",
    label: "锐化",
    range: [0, 100],
    PcIcon: <Ruihua />,
    MobIcons: [
      MobRuihua,
      MobRuihuaChanges,
      MobRuihuaActive,
      MobRuihuaChangesActive,
    ],
    fuKey: "sharpen",
    rawInitValue: 0.2,
    rawRange: [0, 1],
    initValue: 60,
  },
  {
    key: "五官立体",
    label: "五官立体",
    range: [0, 100],
    PcIcon: <Wuguanliti />,
    MobIcons: [MobWglt, MobWgltChanges, MobWgltActive, MobWgltChangesActive],
    fuKey: "face_threed",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 40,
  },
  {
    key: "亮眼",
    label: "亮眼",
    range: [0, 100],
    PcIcon: <Liangyan />,
    MobIcons: [MobLy, MobLyChanges, MobLyActive, MobLyChangesActive],
    fuKey: "eye_bright",
    rawInitValue: 1,
    rawRange: [0, 1],
    initValue: 30,
  },
  {
    key: "美牙",
    label: "美牙",
    range: [0, 100],
    PcIcon: <Meiya />,
    MobIcons: [
      MobMeiya,
      MobMeiyaChanges,
      MobMeiyaActive,
      MobMeiyaChangesActive,
    ],
    fuKey: "tooth_whiten",
    rawInitValue: 1,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "去黑眼圈",
    label: "去黑眼圈",
    range: [0, 100],
    PcIcon: <Quheiyanquan />,
    MobIcons: [MobQhyq, MobQhyqChanges, MobQhyqActive, MobQhyqChangesActive],
    fuKey: "",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 40,
  },
  {
    key: "去法令纹",
    label: "去法令纹",
    range: [0, 100],
    PcIcon: <Qufalingwen />,
    MobIcons: [MobQflw, MobQflwChanges, MobQflwActive, MobQflwChangesActive],
    fuKey: "",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 80,
  },
];

const shapingList: TabOptionItem[] = [
  {
    key: "瘦脸",
    label: "瘦脸",
    range: [0, 100],
    PcIcon: (
      <img
        src={shoulian}
        style={{ width: 28, height: 28, objectFit: "cover" }}
      />
    ),
    MobIcons: [
      MobShoulian,
      MobShoulianChanges,
      MobShoulianActive,
      MobShoulianChangesActive,
    ],
    fuKey: "cheek_thinning_mode2",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "V脸",
    label: "V脸",
    range: [0, 100],
    PcIcon: <Vlian />,
    MobIcons: [
      MobVlian,
      MobVlianChanges,
      MobVlianActive,
      MobVlianChangesActive,
    ],
    fuKey: "cheek_v",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 50,
  },
  {
    key: "窄脸",
    label: "窄脸",
    range: [0, 100],
    PcIcon: <Zhailian />,
    MobIcons: [
      MobZhailian,
      MobZhailianChanges,
      MobZhailianActive,
      MobZhalianChangesActive,
    ],
    fuKey: "cheek_narrow_mode2",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "短脸",
    label: "短脸",
    range: [0, 100],
    PcIcon: <Duanlian />,
    MobIcons: [
      MobDuanlian,
      MobDuanlianChanges,
      MobDuanlianActive,
      MobDuanlianChangesActive,
    ],
    fuKey: "cheek_short",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "小脸",
    label: "小脸",
    range: [0, 100],
    PcIcon: <Xiaolian />,
    MobIcons: [
      MobXiaolian,
      MobXianlianChanges,
      MobXiaolianActive,
      MobXiaolianChangesActive,
    ],
    fuKey: "cheek_small_mode2",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "瘦颧骨",
    label: "瘦颧骨",
    range: [0, 100],
    PcIcon: <Shouegu />,
    MobIcons: [
      MobShoueg,
      MobShouegChange,
      MobShouegActive,
      MobShouegChangesActive,
    ],
    fuKey: "intensity_cheekbones",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "瘦下颌骨",
    label: "瘦下颌骨",
    range: [0, 100],
    PcIcon: <Shouxiaegu />,
    MobIcons: [
      MobShouxeg,
      MobShouxegChanges,
      MobShouxegActive,
      MobShouxegChangesActive,
    ],
    fuKey: "intensity_lower_jaw",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 10,
  },
  {
    key: "大眼",
    label: "大眼",
    range: [0, 100],
    PcIcon: <Dayan />,
    MobIcons: [MobDayan, MobDayanChanges, MobDayanActive, MobDayanChangeActive],
    fuKey: "",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    initValue: 40,
  },
  {
    key: "圆眼",
    label: "圆眼",
    range: [0, 100],
    PcIcon: <Yuanyan />,
    MobIcons: [
      MobYuanyan,
      MobYuanyanChanges,
      MobYuanyanActive,
      MobYuanyanChangeActive,
    ],
    fuKey: "intensity_eye_circle",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "下巴",
    label: "下巴",
    range: [-50, 50],
    PcIcon: <Xiaba />,
    MobIcons: [MobXb, MobXbChanges, MobXbActive, MobXbChangeActive],
    fuKey: "intensity_chin_mode2",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "额头",
    label: "额头",
    range: [-50, 50],
    PcIcon: <Etou />,
    MobIcons: [MobEt, MobEtChanges, MobEtActive, MobEtChangesActive],
    fuKey: "intensity_forehead_mode2",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "瘦鼻",
    label: "瘦鼻",
    range: [0, 100],
    PcIcon: <Shoubi />,
    MobIcons: [MobSb, MobSbChanges, MobSbActive, MobSbChangesActive],
    fuKey: "intensity_nose_mode2",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 50,
  },
  {
    key: "嘴型",
    label: "嘴型",
    range: [-50, 50],
    PcIcon: <Zuixing />,
    MobIcons: [MobZx, MobZxChanges, MobZxActive, MobZxChangesActive],
    fuKey: "",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "嘴唇厚度",
    label: "嘴唇厚度",
    range: [-50, 50],
    PcIcon: <Zuibahoudu />,
    MobIcons: [MobZchd, MobZchdChanges, MobZchdActive, MobZchdChangesActive],
    fuKey: "intensity_lip_thick",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "眼睛位置",
    label: "眼睛位置",
    range: [-50, 50],
    PcIcon: <Yanjingweizhi />,
    MobIcons: [MobYjwz, MobYjwzChanges, MobYjwzActive, MobYjwzChangesActive],
    fuKey: "intensity_eye_height",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "开眼角",
    label: "开眼角",
    range: [0, 100],
    PcIcon: <Kaiyanjiao />,
    MobIcons: [MobKyj, MobKyjChanges, MobKyjActive, MobKyjChangesActive],
    fuKey: "intensity_canthus",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "眼睑下至",
    label: "眼睑下至",
    range: [0, 100],
    PcIcon: <Yanjianxiazhi />,
    MobIcons: [MobYjxz, MobYjxzChanges, MobYjxzActive, MobYjxzChangesActive],
    fuKey: "intensity_eye_lid",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 0,
  },
  {
    key: "眼距",
    label: "眼距",
    range: [-50, 50],
    PcIcon: <Yanju />,
    MobIcons: [MobYj, MobYjChanges, MobYjActive, MobYjChangesActive],
    fuKey: "intensity_eye_space",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "眼睛角度",
    label: "眼睛角度",
    range: [-50, 50],
    PcIcon: <Yanjingjiaodu />,
    MobIcons: [MobYjjd, MobYjjdChanges, MobYjjdActive, MobYjjdChangesActive],
    fuKey: "intensity_eye_rotate",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "长鼻",
    label: "长鼻",
    range: [-50, 50],
    PcIcon: <Changbi />,
    MobIcons: [MobCb, MobCbChanges, MobCbActive, MobCbChangesActive],
    fuKey: "intensity_long_nose",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "缩人中",
    label: "缩人中",
    range: [-50, 50],
    PcIcon: <Suorenzhong />,
    MobIcons: [MobSrz, MobSrzChanges, MobSrzActive, MobSrzChangesActive],
    fuKey: "intensity_philtrum",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "微笑嘴角",
    label: "微笑嘴角",
    range: [0, 100],
    PcIcon: <Weixiaozuijiao />,
    MobIcons: [MobWxzj, MobWxzjChanges, MobWxzjActive, MobWxzjChangesActive],
    fuKey: "intensity_smile",
    rawInitValue: 0,
    rawRange: [0, 1],
    initValue: 35,
  },
  {
    key: "眉毛上下",
    label: "眉毛上下",
    range: [-50, 50],
    PcIcon: <Meimaoshangxia />,
    MobIcons: [MobMmsx, MobMmsxChanges, MobMmsxActive, MobMmsxChangesActive],
    fuKey: "intensity_brow_height",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "眉间距",
    label: "眉间距",
    range: [-50, 50],
    PcIcon: <Meijianju />,
    MobIcons: [MobMjj, MobMjjChanges, MobMjjActive, MobMjjChangesActive],
    fuKey: "intensity_brow_space",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
  {
    key: "眉毛粗细",
    label: "眉毛粗细",
    range: [-50, 50],
    PcIcon: <Meimaocuxi />,
    MobIcons: [MobMmcx, MobMmcxChanges, MobMmcxActive, MobMmcxChangesActive],
    fuKey: "intensity_brow_thick",
    rawInitValue: 0.5,
    rawRange: [0, 1],
    reflexType: 2,
    initValue: 0,
  },
];
// 实际没用这个initValue
// 后续如果要每个滤镜的初始值不同的话还是需要这个值的
const filterList = [
  {
    key: "ziran1",
    label: "自然",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran2",
    label: "自然",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran3",
    label: "自然",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran4",
    label: "自然",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran5",
    label: "自然",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran6",
    label: "自然",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran7",
    label: "自然",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "ziran8",
    label: "自然",
    index: 8,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui1",
    label: "质感灰",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui2",
    label: "质感灰",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui3",
    label: "质感灰",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui4",
    label: "质感灰",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui5",
    label: "质感灰",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui6",
    label: "质感灰",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui7",
    label: "质感灰",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "zhiganhui8",
    label: "质感灰",
    index: 8,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao1",
    label: "蜜桃",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao2",
    label: "蜜桃",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao3",
    label: "蜜桃",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao4",
    label: "蜜桃",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao5",
    label: "蜜桃",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao6",
    label: "蜜桃",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao7",
    label: "蜜桃",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "mitao8",
    label: "蜜桃",
    index: 8,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang1",
    label: "白亮",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang2",
    label: "白亮",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang3",
    label: "白亮",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang4",
    label: "白亮",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang5",
    label: "白亮",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang6",
    label: "白亮",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "bailiang7",
    label: "白亮",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen1",
    label: "粉嫩",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen2",
    label: "粉嫩",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen3",
    label: "粉嫩",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen4",
    label: "粉嫩",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen5",
    label: "粉嫩",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen6",
    label: "粉嫩",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen7",
    label: "粉嫩",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "fennen8",
    label: "粉嫩",
    index: 8,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao1",
    label: "冷色调",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao2",
    label: "冷色调",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao3",
    label: "冷色调",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao4",
    label: "冷色调",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao5",
    label: "冷色调",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao6",
    label: "冷色调",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao7",
    label: "冷色调",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao8",
    label: "冷色调",
    index: 8,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao9",
    label: "冷色调",
    index: 9,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao10",
    label: "冷色调",
    index: 10,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "lengsediao11",
    label: "冷色调",
    index: 11,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "nuansediao1",
    label: "暖色调",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "nuansediao2",
    label: "暖色调",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "nuansediao3",
    label: "暖色调",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing1",
    label: "个性",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing2",
    label: "个性",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing3",
    label: "个性",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing4",
    label: "个性",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing5",
    label: "个性",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing6",
    label: "个性",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing7",
    label: "个性",
    index: 7,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing8",
    label: "个性",
    index: 8,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing9",
    label: "个性",
    index: 9,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing10",
    label: "个性",
    index: 10,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "gexing11",
    label: "个性",
    index: 11,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "xiaoqingxin1",
    label: "小清新",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "xiaoqingxin2",
    label: "小清新",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "xiaoqingxin3",
    label: "小清新",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "xiaoqingxin4",
    label: "小清新",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "xiaoqingxin5",
    label: "小清新",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "xiaoqingxin6",
    label: "小清新",
    index: 6,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "heibai1",
    label: "黑白",
    index: 1,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "heibai2",
    label: "黑白",
    index: 2,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "heibai3",
    label: "黑白",
    index: 3,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "heibai4",
    label: "黑白",
    index: 4,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
  {
    key: "heibai5",
    label: "黑白",
    index: 5,
    initValue: 0,
    range: [0, 100],
    PcIcon: "",
    MobIcons: [],
  },
];

interface StickerItem {
  key: string;
  bundle: string;
}

const stickerList: StickerItem[] = [
  {
    key: "ShiShangCWei",
    bundle: BundleEnum.ShiShangCWei,
  },
  //   {
  //     key: "HuDiePianPian",
  //     bundle: BundleEnum.HuDiePianPian,
  //   },
  {
    key: "BlueMask",
    bundle: BundleEnum.BlueMask,
  },
  {
    key: "XingGanHuZi",
    bundle: BundleEnum.XingGanHuZi,
  },
  //   {
  //     key: "HeartEyes",
  //     bundle: BundleEnum.HeartEyes,
  //   },
  // {
  //   key: "XiaRiJiaoYou",
  //   bundle: BundleEnum.XiaRiJiaoYou,
  // },
  // {
  //   key: "HappyNewYear2",
  //   bundle: BundleEnum.HappyNewYear2,
  // },
  {
    key: "zaoAn",
    bundle: BundleEnum.zaoAn,
  },
  {
    key: "Christmas",
    bundle: BundleEnum.Christmas,
  },
  {
    key: "HolidayDevils",
    bundle: BundleEnum.HolidayDevils,
  },
  {
    key: "sdlr",
    bundle: BundleEnum.sdlr,
  },
  {
    key: "DaisyPig",
    bundle: BundleEnum.DaisyPig,
  },
  {
    key: "newy1",
    bundle: BundleEnum.newy1,
  },
  {
    key: "CatSparks",
    bundle: BundleEnum.CatSparks,
  },
];

export default {
  [menuKey.effects]: effectsList,
  [menuKey.shaping]: shapingList,
  [menuKey.filter]: filterList,
  [menuKey.sticker]: stickerList,
};
// 部分参数，不同模式下初始值不同
export const initValueMap = {
  remove_pouch_strength_mode2: 80,
  remove_pouch_strength: 40,
  remove_nasolabial_folds_strength: 40,
  remove_nasolabial_folds_strength_mode2: 80,
  ziran2: 0,
};

export const panelConfig = {
  去黑眼圈: {
    options: ["remove_pouch_strength", "remove_pouch_strength_mode2"],
    use: "remove_pouch_strength",
  },
  去法令纹: {
    options: [
      "remove_nasolabial_folds_strength",
      "remove_nasolabial_folds_strength_mode2",
    ],
    use: "remove_nasolabial_folds_strength_mode2",
  },
  大眼: {
    options: ["eye_enlarging", "eye_enlarging_mode2", "eye_enlarging_mode3"],
    use: "eye_enlarging_mode3",
  },
  嘴型: {
    options: [
      "intensity_mouth",
      "intensity_mouth_mode2",
      "intensity_mouth_mode3",
    ],
    use: "intensity_mouth_mode3",
  },
  磨皮: {
    options: [0, 1, 2, 3],
    use: 2,
  },
  人脸关键点: {
    options: [0, 1, 2],
    use: 1,
  },
};

export const globalSettingKey = {
  [menuKey.effects]: "is_beauty_on",
  [menuKey.shaping]: "face_shape_level",
};

export const menuKeyToBundle = {
  [menuKey.effects]: BundleEnum.face_beautification,
  [menuKey.shaping]: BundleEnum.face_beautification,
  [menuKey.filter]: BundleEnum.face_beautification,
};

export const getBundle = (key: menuKey) => {
  const bundle = menuKeyToBundle[key];
  if (!bundle) {
    console.error("invalid bundle name");
    return;
  }
  return bundle;
};

export enum DownloadState {
  Success,
  Error,
  Downloading,
}
