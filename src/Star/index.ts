import { Gong } from "../Gong";

export class Star {
  private _id: number;
  private _name: string;
  private _belongToGong: Gong | null = null;

  /**
   * 建立星星物件
   * @param id 星星 id
   * @param name 星星中文名
   */
  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  // setter 方法用于设置 _belongToPalace 属性的值
  set belongToPalace(palace: Gong | null) {
    this._belongToGong = palace;
  }

  get belongToPalace(): Gong | null {
    return this._belongToGong;
  }

  static createStar(id: number, name: string): Star {
    return new Star(id, name);
  }
}
