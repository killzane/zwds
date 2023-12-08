import { Lunar } from "./Lunar";
import { Gong } from "./Gong";
import { LunarUtil } from "./Lunar/LunarUtil";
import { Star } from "./Star";
import { StarUtil } from "./Star/StarUtil";

export class BenMingPan {
  static MONTH_ZHI: string[] = [
    "",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥",
    "子",
    "丑",
  ];

  // 寅位的天干
  static YIN_GAN: number[] = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];

  // 命主星命宮對應表
  // 貪狼 巨門 祿存 文曲 廉貞 武曲 破軍 武曲 廉貞 文曲 祿存 巨門
  static MING_ZHU_XING_MAP = [7, 8, 26, 19, 12, 3, 11, 3, 12, 19, 26, 8];

  // 身主星命宮對應表
  // 火星 天相 天梁 天同 文昌 天機 火星 天相 天梁 天同 文昌 天機
  static SHEN_ZHU_XING_MAP = [22, 13, 9, 4, 18, 1, 22, 13, 9, 4, 18, 1];

  //命宮宮位
  static MING_GONG_POSITION: number[][] = [
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7],
    [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],
    [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5],
    [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4],
    [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2],
  ];

  //身宮宮位
  static SHEN_GONG_POSITION: number[][] = [
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2],
    [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
    [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4],
    [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5],
    [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],
    [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7],
    [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
  ];

  // 算五行局
  // 水(2), 木(3), 金(4), 土(5), 火(6)
  // [地支][天干]
  static WU_XING: number[][] = [
    [4, 4, 2, 2, 6, 6, 5, 5, 3, 3],
    [4, 4, 2, 2, 6, 6, 5, 5, 3, 3],
    [2, 2, 6, 6, 5, 5, 3, 3, 4, 4],
    [2, 2, 6, 6, 5, 5, 3, 3, 4, 4],
    [6, 6, 5, 5, 3, 3, 4, 4, 2, 2],
    [6, 6, 5, 5, 3, 3, 4, 4, 2, 2],
    [4, 4, 2, 2, 6, 6, 5, 5, 3, 3],
    [4, 4, 2, 2, 6, 6, 5, 5, 3, 3],
    [2, 2, 6, 6, 5, 5, 3, 3, 4, 4],
    [2, 2, 6, 6, 5, 5, 3, 3, 4, 4],
    [6, 6, 5, 5, 3, 3, 4, 4, 2, 2],
    [6, 6, 5, 5, 3, 3, 4, 4, 2, 2],
  ];

  static WU_XING_JU: string[] = ["水", "木", "金", "土", "火"];

  //14主星 table [農曆日][五行局] //  紫微的位置
  static MAIN_STAR_TABLE: number[][] = [
    [1, 4, 11, 6, 9],
    [2, 1, 4, 11, 6],
    [2, 2, 1, 4, 11],
    [3, 5, 2, 1, 4],
    [3, 2, 0, 2, 1],
    [4, 3, 5, 7, 2],
    [4, 6, 2, 0, 10],
    [5, 3, 3, 5, 7],
    [5, 4, 1, 2, 0],
    [6, 7, 6, 3, 5],
    [6, 4, 3, 8, 2],
    [7, 5, 4, 1, 3],
    [7, 8, 2, 6, 11],
    [8, 5, 7, 3, 8],
    [8, 6, 4, 4, 1],
    [9, 9, 5, 9, 6],
    [9, 6, 3, 2, 3],
    [10, 7, 8, 7, 4],
    [10, 10, 5, 4, 0],
    [11, 7, 6, 5, 9],
    [11, 8, 4, 10, 2],
    [0, 11, 9, 3, 7],
    [0, 8, 6, 8, 4],
    [1, 9, 7, 5, 5],
    [1, 0, 5, 6, 1],
    [2, 9, 10, 11, 10],
    [2, 10, 7, 4, 3],
    [3, 1, 8, 9, 8],
    [3, 10, 6, 6, 5],
    [4, 11, 11, 7, 6],
  ];

  static MAIN_14_STAR_TABLE: number[][] = [
    //紫微,天機,太陽,武曲,天同,廉貞,天府,太陰,貪狼,巨門,天相,天梁,七殺,破軍
    [0, 11, 9, 8, 7, 4, 4, 5, 6, 7, 8, 9, 10, 2],
    [1, 0, 10, 9, 8, 5, 3, 4, 5, 6, 7, 8, 9, 1],
    [2, 1, 11, 10, 9, 6, 2, 3, 4, 5, 6, 7, 8, 0],
    [3, 2, 0, 11, 10, 7, 1, 2, 3, 4, 5, 6, 7, 11],
    [4, 3, 1, 0, 11, 8, 0, 1, 2, 3, 4, 5, 6, 10],
    [5, 4, 2, 1, 0, 9, 11, 0, 1, 2, 3, 4, 5, 9],
    [6, 5, 3, 2, 1, 10, 10, 11, 0, 1, 2, 3, 4, 8],
    [7, 6, 4, 3, 2, 11, 9, 10, 11, 0, 1, 2, 3, 7],
    [8, 7, 5, 4, 3, 0, 8, 9, 10, 11, 0, 1, 2, 6],
    [9, 8, 6, 5, 4, 1, 7, 8, 9, 10, 11, 0, 1, 5],
    [10, 9, 7, 6, 5, 2, 6, 7, 8, 9, 10, 11, 0, 4],
    [11, 10, 8, 7, 6, 3, 5, 6, 7, 8, 9, 10, 11, 3],
  ];

  // 年干星系
  // 祿存, 擎羊, 陀羅, 天魁, 天鉞, 天官, 天福, 截路, 空亡
  static YEARLY_GAN_STAR_TABLE: number[][] = [
    [2, 3, 1, 1, 7, 7, 9, 8, 9],
    [3, 4, 2, 0, 8, 4, 8, 6, 7],
    [5, 6, 4, 11, 9, 5, 0, 4, 5],
    [6, 7, 5, 11, 9, 2, 11, 2, 3],
    [5, 6, 4, 1, 7, 3, 3, 0, 1],
    [6, 7, 5, 0, 8, 9, 2, 9, 8],
    [8, 9, 7, 1, 7, 11, 6, 7, 6],
    [9, 10, 8, 2, 6, 9, 5, 5, 4],
    [11, 0, 10, 3, 5, 10, 6, 3, 2],
    [0, 1, 11, 3, 5, 6, 5, 1, 0],
  ];

  // 年支星系
  // 天馬 	華蓋 	天空 	天哭 	天虛 	紅鸞 	天喜 	孤4 	寡宿 	咸池 	龍池 	鳳閣 	蜚廉 	破碎
  static YEARLY_ZHI_STAR_TABLE: number[][] = [
    [2, 4, 1, 6, 6, 3, 9, 2, 10, 9, 4, 10, 8, 5],
    [11, 1, 2, 5, 7, 2, 8, 2, 10, 6, 5, 9, 9, 1],
    [8, 10, 3, 4, 8, 1, 7, 5, 1, 3, 6, 8, 10, 9],
    [5, 7, 4, 3, 9, 0, 6, 5, 1, 0, 7, 7, 5, 5],
    [2, 4, 5, 2, 10, 11, 5, 5, 1, 9, 8, 6, 6, 1],
    [11, 1, 6, 1, 11, 10, 4, 8, 4, 6, 9, 5, 7, 9],
    [8, 10, 7, 0, 0, 9, 3, 8, 4, 3, 10, 4, 2, 5],
    [5, 7, 8, 11, 1, 8, 2, 8, 4, 0, 11, 3, 3, 1],
    [2, 4, 9, 10, 2, 7, 1, 11, 7, 9, 0, 2, 4, 9],
    [11, 1, 10, 9, 3, 6, 0, 11, 7, 6, 1, 1, 11, 5],
    [8, 10, 11, 8, 4, 5, 11, 11, 7, 3, 2, 0, 0, 1],
    [5, 7, 0, 7, 5, 4, 10, 2, 10, 0, 3, 11, 1, 9],
  ];

  // 月星系 1-12 月
  // 左輔 	右弼 	天刑 	天姚 	月馬 	解神 	天巫 	天月 	陰煞
  static MONTH_STAR_TABLE: number[][] = [
    [4, 10, 9, 1, 8, 8, 5, 10, 2],
    [5, 9, 10, 2, 5, 8, 8, 5, 0],
    [6, 8, 11, 3, 2, 10, 2, 4, 10],
    [7, 7, 0, 4, 11, 10, 11, 2, 8],
    [8, 6, 1, 5, 8, 0, 5, 7, 6],
    [9, 5, 2, 6, 5, 0, 8, 3, 4],
    [10, 4, 3, 7, 2, 2, 2, 11, 2],
    [11, 3, 4, 8, 11, 2, 11, 7, 0],
    [0, 2, 5, 9, 8, 4, 5, 2, 10],
    [1, 1, 6, 10, 5, 4, 8, 6, 8],
    [2, 0, 7, 11, 2, 6, 2, 10, 6],
    [3, 11, 8, 0, 11, 6, 11, 2, 4],
  ];

  // 時星系1-12 小時
  // 文昌 	文曲 	地劫 	地空 	台輔 	封誥
  static HOUR_STAR_TABLE: number[][] = [
    [10, 4, 11, 11, 6, 6],
    [9, 5, 0, 10, 7, 3],
    [8, 6, 1, 9, 8, 4],
    [7, 7, 2, 8, 9, 5],
    [6, 8, 3, 7, 10, 6],
    [5, 9, 4, 6, 11, 7],
    [4, 10, 5, 5, 0, 8],
    [3, 11, 6, 4, 1, 9],
    [2, 0, 7, 3, 2, 10],
    [1, 1, 8, 2, 3, 11],
    [0, 2, 9, 1, 4, 0],
    [11, 3, 10, 0, 5, 1],
  ];

  // 1 = 男
  private _gender: number;
  private _sect: number = 1;
  private _lunar: Lunar;
  private _yinYang: number = 0; // 0 = 陽干, 1 = 陰干
  private _gong: Gong[] = [];
  private _mingGongPosition = -1;
  private _mingZhuXing: Star;
  private _shenZhuXing: Star;
  private _yinWeiGongGan = -1;
  private _wuXingIndex = 0;

  constructor(lunar: Lunar, gender: number) {
    this._gender = gender;
    this._lunar = lunar;

    let month = this._lunar.getMonth();
    let timeZhi = this._lunar.getTimeZhiIndex();

    if (this._lunar.getYearGanIndex() % 2 === 0) {
      this._yinYang = 0;
    }

    this._yinWeiGongGan =
      LunarUtil.GONG_GANG_START[this._lunar.getYearGanIndex()];
    this._mingGongPosition = BenMingPan.MING_GONG_POSITION[timeZhi][month - 1];
    this._mingZhuXing = new Star(
      BenMingPan.MING_ZHU_XING_MAP[this._mingGongPosition],
      StarUtil.STAR_LIST[BenMingPan.MING_ZHU_XING_MAP[this._mingGongPosition]]
    );
    this._shenZhuXing = new Star(
      BenMingPan.SHEN_ZHU_XING_MAP[this._lunar.getYearZhiIndex()],
      StarUtil.STAR_LIST[
        BenMingPan.SHEN_ZHU_XING_MAP[this._lunar.getYearZhiIndex()]
      ]
    );

    for (let i = 0; i < 12; i++) {
      this._gong[i] = new Gong(i, this);
    }

    this._wuXingIndex =
      BenMingPan.WU_XING[this._gong[this._mingGongPosition].getZhiIndex()][
        this._gong[this._mingGongPosition].getGanIndex()
      ];

    // 安紫微
    const ziWeiPos =
      BenMingPan.MAIN_STAR_TABLE[this._lunar.getDay()][this._wuXingIndex - 2];
    this._gong[ziWeiPos].addStar(new Star(0, StarUtil.STAR_LIST[0]));

    // 安 14 主星
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][1]].addStar(
      new Star(1, StarUtil.STAR_LIST[1])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][2]].addStar(
      new Star(2, StarUtil.STAR_LIST[2])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][3]].addStar(
      new Star(3, StarUtil.STAR_LIST[3])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][4]].addStar(
      new Star(4, StarUtil.STAR_LIST[4])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][5]].addStar(
      new Star(12, StarUtil.STAR_LIST[12])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][6]].addStar(
      new Star(5, StarUtil.STAR_LIST[5])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][7]].addStar(
      new Star(6, StarUtil.STAR_LIST[6])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][8]].addStar(
      new Star(7, StarUtil.STAR_LIST[7])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][9]].addStar(
      new Star(8, StarUtil.STAR_LIST[8])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][10]].addStar(
      new Star(13, StarUtil.STAR_LIST[13])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][11]].addStar(
      new Star(9, StarUtil.STAR_LIST[9])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][12]].addStar(
      new Star(10, StarUtil.STAR_LIST[10])
    );
    this._gong[BenMingPan.MAIN_14_STAR_TABLE[ziWeiPos][13]].addStar(
      new Star(11, StarUtil.STAR_LIST[11])
    );

    // 安年干星系
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][0]
    ].addStar(new Star(26, StarUtil.STAR_LIST[26]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][1]
    ].addStar(new Star(21, StarUtil.STAR_LIST[21]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][2]
    ].addStar(new Star(20, StarUtil.STAR_LIST[20]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][3]
    ].addStar(new Star(14, StarUtil.STAR_LIST[14]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][4]
    ].addStar(new Star(15, StarUtil.STAR_LIST[15]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][5]
    ].addStar(new Star(30, StarUtil.STAR_LIST[30]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][6]
    ].addStar(new Star(31, StarUtil.STAR_LIST[31]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][7]
    ].addStar(new Star(32, StarUtil.STAR_LIST[32]));
    this._gong[
      BenMingPan.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][8]
    ].addStar(new Star(33, StarUtil.STAR_LIST[33]));

    // 安年支星系
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][0]
    ].addStar(new Star(27, StarUtil.STAR_LIST[27]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][1]
    ].addStar(new Star(34, StarUtil.STAR_LIST[34]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][2]
    ].addStar(new Star(35, StarUtil.STAR_LIST[35]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][3]
    ].addStar(new Star(36, StarUtil.STAR_LIST[36]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][4]
    ].addStar(new Star(37, StarUtil.STAR_LIST[37]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][5]
    ].addStar(new Star(28, StarUtil.STAR_LIST[28]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][6]
    ].addStar(new Star(29, StarUtil.STAR_LIST[29]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][7]
    ].addStar(new Star(38, StarUtil.STAR_LIST[38]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][8]
    ].addStar(new Star(39, StarUtil.STAR_LIST[39]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][9]
    ].addStar(new Star(40, StarUtil.STAR_LIST[40]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][10]
    ].addStar(new Star(41, StarUtil.STAR_LIST[41]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][11]
    ].addStar(new Star(42, StarUtil.STAR_LIST[42]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][12]
    ].addStar(new Star(43, StarUtil.STAR_LIST[43]));
    this._gong[
      BenMingPan.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][13]
    ].addStar(new Star(44, StarUtil.STAR_LIST[44]));

    // 安天才，天壽星
    this._gong[
      (this._mingGongPosition + this._lunar.getYearZhiIndex()) % 12
    ].addStar(new Star(54, StarUtil.STAR_LIST[54]));

    this._gong[
      (this.getShenGongPosition() + this._lunar.getYearZhiIndex()) % 12
    ].addStar(new Star(55, StarUtil.STAR_LIST[55]));

    // 安月星系
    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][0]
    ].addStar(new Star(16, StarUtil.STAR_LIST[16]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][1]
    ].addStar(new Star(17, StarUtil.STAR_LIST[17]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][2]
    ].addStar(new Star(45, StarUtil.STAR_LIST[45]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][3]
    ].addStar(new Star(46, StarUtil.STAR_LIST[46]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][4]
    ].addStar(new Star(47, StarUtil.STAR_LIST[47]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][5]
    ].addStar(new Star(48, StarUtil.STAR_LIST[48]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][6]
    ].addStar(new Star(49, StarUtil.STAR_LIST[49]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][7]
    ].addStar(new Star(50, StarUtil.STAR_LIST[50]));

    this._gong[
      BenMingPan.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][8]
    ].addStar(new Star(51, StarUtil.STAR_LIST[51]));

    // 安時星系
    this._gong[
      BenMingPan.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][0]
    ].addStar(new Star(18, StarUtil.STAR_LIST[18]));

    this._gong[
      BenMingPan.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][1]
    ].addStar(new Star(19, StarUtil.STAR_LIST[19]));

    this._gong[
      BenMingPan.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][2]
    ].addStar(new Star(25, StarUtil.STAR_LIST[25]));

    this._gong[
      BenMingPan.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][3]
    ].addStar(new Star(24, StarUtil.STAR_LIST[24]));

    this._gong[
      BenMingPan.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][4]
    ].addStar(new Star(52, StarUtil.STAR_LIST[52]));

    this._gong[
      BenMingPan.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][5]
    ].addStar(new Star(53, StarUtil.STAR_LIST[53]));
  }

  getSect(): number {
    return this._sect;
  }

  setSect(sect: number) {
    this._sect = 1 == sect ? 1 : 2;
  }

  getDayGanIndex(): number {
    return 2 === this._sect
      ? this._lunar.getDayGanIndexExact2()
      : this._lunar.getDayGanIndexExact();
  }

  getDayZhiIndex(): number {
    return 2 === this._sect
      ? this._lunar.getDayZhiIndexExact2()
      : this._lunar.getDayZhiIndexExact();
  }

  getYear(): string {
    return this._lunar.getYearInGanZhiExact();
  }

  getYearGan(): string {
    return this._lunar.getYearGanExact();
  }

  getYearZhi(): string {
    return this._lunar.getYearZhiExact();
  }

  getMonth(): string {
    return this._lunar.getMonthInGanZhiExact();
  }

  getMonthGan(): string {
    return this._lunar.getMonthGanExact();
  }

  getMonthZhi(): string {
    return this._lunar.getMonthZhiExact();
  }

  getDay(): string {
    return 2 === this._sect
      ? this._lunar.getDayInGanZhiExact2()
      : this._lunar.getDayInGanZhiExact();
  }

  getDayGan(): string {
    return 2 === this._sect
      ? this._lunar.getDayGanExact2()
      : this._lunar.getDayGanExact();
  }

  getDayZhi(): string {
    return 2 === this._sect
      ? this._lunar.getDayZhiExact2()
      : this._lunar.getDayZhiExact();
  }

  getTime(): string {
    return this._lunar.getTimeInGanZhi();
  }

  getTimeGan(): string {
    return this._lunar.getTimeGan();
  }

  getTimeZhi(): string {
    return this._lunar.getTimeZhi();
  }

  getYinGan() {
    return BenMingPan.YIN_GAN[this._lunar.getYearGanIndex()];
  }

  getMingGongPosition() {
    return this._mingGongPosition;
  }

  getMingZhuXing(): Star {
    return this._mingZhuXing;
  }

  getShenZhuXing(): Star {
    return this._shenZhuXing;
  }

  getShenGongPosition() {
    let month = this._lunar.getMonth();
    let timeZhi = this._lunar.getTimeZhiIndex();

    return BenMingPan.SHEN_GONG_POSITION[timeZhi][month - 1];
  }

  getYinWeiGongGan(): number {
    return this._yinWeiGongGan;
  }

  /**
   * 輸入地支編號，取得該位置宮
   * @param zhiIndex 地支編號
   * @returns 宮的物件
   */
  getGong(zhiIndex: number): Gong {
    return this._gong[zhiIndex];
  }

  getWuXingIndex(): number {
    return this._wuXingIndex;
  }

  getWuXing(): string {
    return BenMingPan.WU_XING_JU[this._wuXingIndex - 2];
  }

  isYangManYinWoman(): boolean {
    if (this._yinYang === 0 && this._gender === 1) {
      return true;
    } else if (this._yinYang === 1 && this._gender !== 1) {
      return true;
    } else {
      return false;
    }
  }
}
