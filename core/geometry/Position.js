export default class Position {
  _x = 0;
  _y = 0;

  constructor() {
    if (arguments.length >= 2) {
      this.x = arguments[0];
      this.y = arguments[1];
    } else if (arguments.length === 1) {
      if (typeof arguments[0] === "object") {
        const { x, y } = arguments[0];
        this.x = x;
        this.y = y;
      } else {
        this.x = this.y = arguments[0];
      }
    }
  }

  get x() {
    return this._x;
  }
  set x(x) {
    if (!isNaN(x)) this._x = x;
  }

  get y() {
    return this._y;
  }
  set y(y) {
    if (!isNaN(y)) this._y = y;
  }
}
