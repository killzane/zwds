import { Lunar } from "./Lunar";
import { Gong } from "./Gong";
import { LunarUtil } from "./Lunar/LunarUtil";
import { Star } from "./Star";
import { StarUtil } from "./Star/StarUtil";
import { ZiWeiDouShuUtil } from "./ZiWeiDouShu/ZiWeiDouShuUtil";

export class BenMingPan {
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
    this._mingGongPosition = ZiWeiDouShuUtil.MING_GONG_POSITION[timeZhi][month - 1];
    this._mingZhuXing = new Star(
      ZiWeiDouShuUtil.MING_ZHU_XING_MAP[this._mingGongPosition],
      StarUtil.STAR_LIST[ZiWeiDouShuUtil.MING_ZHU_XING_MAP[this._mingGongPosition]]
    );
    this._shenZhuXing = new Star(
      ZiWeiDouShuUtil.SHEN_ZHU_XING_MAP[this._lunar.getYearZhiIndex()],
      StarUtil.STAR_LIST[
        ZiWeiDouShuUtil.SHEN_ZHU_XING_MAP[this._lunar.getYearZhiIndex()]
      ]
    );

    for (let i = 0; i < 12; i++) {
      this._gong[i] = new Gong(i, this);
    }

    this._wuXingIndex =
    ZiWeiDouShuUtil.WU_XING[this._gong[this._mingGongPosition].getZhiIndex()][
        this._gong[this._mingGongPosition].getGanIndex()
      ];

    // 安紫微
    const ziWeiPos =
    ZiWeiDouShuUtil.MAIN_STAR_TABLE[this._lunar.getDay()][this._wuXingIndex - 2];
    this._gong[ziWeiPos].addStar(new Star(0, StarUtil.STAR_LIST[0]));

    // 安 14 主星
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][1]].addStar(
      new Star(1, StarUtil.STAR_LIST[1])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][2]].addStar(
      new Star(2, StarUtil.STAR_LIST[2])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][3]].addStar(
      new Star(3, StarUtil.STAR_LIST[3])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][4]].addStar(
      new Star(4, StarUtil.STAR_LIST[4])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][5]].addStar(
      new Star(12, StarUtil.STAR_LIST[12])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][6]].addStar(
      new Star(5, StarUtil.STAR_LIST[5])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][7]].addStar(
      new Star(6, StarUtil.STAR_LIST[6])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][8]].addStar(
      new Star(7, StarUtil.STAR_LIST[7])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][9]].addStar(
      new Star(8, StarUtil.STAR_LIST[8])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][10]].addStar(
      new Star(13, StarUtil.STAR_LIST[13])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][11]].addStar(
      new Star(9, StarUtil.STAR_LIST[9])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][12]].addStar(
      new Star(10, StarUtil.STAR_LIST[10])
    );
    this._gong[ZiWeiDouShuUtil.MAIN_14_STAR_TABLE[ziWeiPos][13]].addStar(
      new Star(11, StarUtil.STAR_LIST[11])
    );

    // 安年干星系
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][0]
    ].addStar(new Star(26, StarUtil.STAR_LIST[26]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][1]
    ].addStar(new Star(21, StarUtil.STAR_LIST[21]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][2]
    ].addStar(new Star(20, StarUtil.STAR_LIST[20]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][3]
    ].addStar(new Star(14, StarUtil.STAR_LIST[14]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][4]
    ].addStar(new Star(15, StarUtil.STAR_LIST[15]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][5]
    ].addStar(new Star(30, StarUtil.STAR_LIST[30]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][6]
    ].addStar(new Star(31, StarUtil.STAR_LIST[31]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][7]
    ].addStar(new Star(32, StarUtil.STAR_LIST[32]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_GAN_STAR_TABLE[this._lunar.getYearGanIndex()][8]
    ].addStar(new Star(33, StarUtil.STAR_LIST[33]));

    // 安年支星系
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][0]
    ].addStar(new Star(27, StarUtil.STAR_LIST[27]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][1]
    ].addStar(new Star(34, StarUtil.STAR_LIST[34]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][2]
    ].addStar(new Star(35, StarUtil.STAR_LIST[35]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][3]
    ].addStar(new Star(36, StarUtil.STAR_LIST[36]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][4]
    ].addStar(new Star(37, StarUtil.STAR_LIST[37]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][5]
    ].addStar(new Star(28, StarUtil.STAR_LIST[28]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][6]
    ].addStar(new Star(29, StarUtil.STAR_LIST[29]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][7]
    ].addStar(new Star(38, StarUtil.STAR_LIST[38]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][8]
    ].addStar(new Star(39, StarUtil.STAR_LIST[39]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][9]
    ].addStar(new Star(40, StarUtil.STAR_LIST[40]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][10]
    ].addStar(new Star(41, StarUtil.STAR_LIST[41]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][11]
    ].addStar(new Star(42, StarUtil.STAR_LIST[42]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][12]
    ].addStar(new Star(43, StarUtil.STAR_LIST[43]));
    this._gong[
      ZiWeiDouShuUtil.YEARLY_ZHI_STAR_TABLE[this._lunar.getYearZhiIndex()][13]
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
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][0]
    ].addStar(new Star(16, StarUtil.STAR_LIST[16]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][1]
    ].addStar(new Star(17, StarUtil.STAR_LIST[17]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][2]
    ].addStar(new Star(45, StarUtil.STAR_LIST[45]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][3]
    ].addStar(new Star(46, StarUtil.STAR_LIST[46]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][4]
    ].addStar(new Star(47, StarUtil.STAR_LIST[47]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][5]
    ].addStar(new Star(48, StarUtil.STAR_LIST[48]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][6]
    ].addStar(new Star(49, StarUtil.STAR_LIST[49]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][7]
    ].addStar(new Star(50, StarUtil.STAR_LIST[50]));

    this._gong[
      ZiWeiDouShuUtil.MONTH_STAR_TABLE[this._lunar.getMonth() - 1][8]
    ].addStar(new Star(51, StarUtil.STAR_LIST[51]));

    // 安時星系
    this._gong[
      ZiWeiDouShuUtil.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][0]
    ].addStar(new Star(18, StarUtil.STAR_LIST[18]));

    this._gong[
      ZiWeiDouShuUtil.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][1]
    ].addStar(new Star(19, StarUtil.STAR_LIST[19]));

    this._gong[
      ZiWeiDouShuUtil.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][2]
    ].addStar(new Star(25, StarUtil.STAR_LIST[25]));

    this._gong[
      ZiWeiDouShuUtil.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][3]
    ].addStar(new Star(24, StarUtil.STAR_LIST[24]));

    this._gong[
      ZiWeiDouShuUtil.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][4]
    ].addStar(new Star(52, StarUtil.STAR_LIST[52]));

    this._gong[
      ZiWeiDouShuUtil.HOUR_STAR_TABLE[this._lunar.getTimeZhiIndex()][5]
    ].addStar(new Star(53, StarUtil.STAR_LIST[53]));

    // 安火星
    this._gong[
      ZiWeiDouShuUtil.HUO_XING_TABLE[this._lunar.getTimeZhiIndex()][
        this._lunar.getYearZhiIndex()
      ]
    ].addStar(new Star(22, StarUtil.STAR_LIST[22]));

    // 安鈴星
    this._gong[
      ZiWeiDouShuUtil.LING_XING_TABLE[this._lunar.getTimeZhiIndex()][
        this._lunar.getYearZhiIndex()
      ]
    ].addStar(new Star(23, StarUtil.STAR_LIST[23]));

    // 安日星系
    // this._gong[].addStar(new Star(56, StarUtil.STAR_LIST[56]));
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
    return ZiWeiDouShuUtil.YIN_GAN[this._lunar.getYearGanIndex()];
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

    return ZiWeiDouShuUtil.SHEN_GONG_POSITION[timeZhi][month - 1];
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
    return ZiWeiDouShuUtil.WU_XING_JU[this._wuXingIndex - 2];
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
