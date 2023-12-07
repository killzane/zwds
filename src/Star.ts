export class Star {
  private _id: number;
  private _name: string;

  /**
   * 建立星星物件
   * @param id 星星 id
   * @param name 星星中文名
   */
  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  static createStar(id: number, name: string): Star {
    return new Star(id, name);
  }
}
