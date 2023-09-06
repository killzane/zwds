import { Lunar } from "./Lunar";
import { Gong } from "./Gong";
import { LunarUtil } from "./Lunar/LunarUtil";

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

  //寅位的天干
  static YIN_GAN: number[] = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];

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

  private _gender: number;
  private _sect: number = 1;
  private _lunar: Lunar;
  private _yinYang: number = 0; // 0 = 陽干, 1 = 陰干
  private _gong: Gong[] = [];
  private _mingGongPosition = -1;
  private _yinWeiGongGan = -1;

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

    for (let i = 0; i < 12; i++) {
      this._gong[i] = new Gong(i, this);
    }
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

  getShenGongPosition() {
    let month = this._lunar.getMonth();
    let timeZhi = this._lunar.getTimeZhiIndex();

    return BenMingPan.SHEN_GONG_POSITION[timeZhi][month - 1];
  }

  getYinWeiGongGan(): number {
    return this._yinWeiGongGan;
  }

  getGong(zhiIndex: number): Gong {
    return this._gong[zhiIndex];
  }
}
