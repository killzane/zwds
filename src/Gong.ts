import { BenMingPan } from "./BenMingPan";
import { LunarUtil } from "./Lunar/LunarUtil";
import { Star } from "./Star";

export class Gong {
  private _benMingPan: BenMingPan;
  private _mainStar: Star[] = [];

  private _ganIndex: number = -1;
  private _zhiIndex: number = -1;

  private _index: number = -1;

  constructor(zhiIndex: number, benMingPan: BenMingPan) {
    this._benMingPan = benMingPan;

    this._ganIndex =
      (LunarUtil.GONG_GANE_OFFSET[zhiIndex] +
        this._benMingPan.getYinWeiGongGan()) %
      10;
    this._zhiIndex = zhiIndex;
    this._index = (zhiIndex - benMingPan.getMingGongPosition() + 12) % 12;
  }

  setGanIndex(ganIndex: number) {
    this._ganIndex = ganIndex;
  }

  getGanIndex(): number {
    return this._ganIndex;
  }
  getZhiIndex(): number {
    return this._zhiIndex;
  }
  getGan(): string {
    return LunarUtil.GAN[this._ganIndex + 1];
  }
  getZhi(): string {
    return LunarUtil.ZHI[this._zhiIndex + 1];
  }

  setIndex(index: number): void {
    this._index = index;
  }
  getIndex(): number {
    return this._index;
  }
  getGongName(): string {
    return LunarUtil.SHI_ER_GONG[this._index];
  }
  getBenMingPan(): BenMingPan {
    return this._benMingPan;
  }
}
