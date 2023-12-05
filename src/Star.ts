export class Star {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  static createStar(id: number, name: string): Star {
    return new Star(id, name);
  }
}
