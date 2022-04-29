export default class Size {
  _width = 32;
  _height = 32;

  constructor() {
    if (arguments.length >= 2) {
      this.width = arguments[0];
      this.height = arguments[1];
    } else if (arguments.length === 1) {
      if (typeof arguments[0] === "object") {
        const { width, columns, w, c } = arguments[0];
        const { height, rows, h, r } = arguments[0];
        this.width = width || columns || w || c;
        this.height = height || rows || h || r;
      } else {
        this.width = this.height = arguments[0];
      }
    }
  }

  get width() {
    return this._width;
  }
  set width(width) {
    if (!isNaN(width)) this._width = Math.abs(width);
  }

  get height() {
    return this._height;
  }
  set height(height) {
    if (!isNaN(height)) this._height = Math.abs(height);
  }

  get w() {
    return this.width;
  }
  set w(w) {
    this.width = w;
  }

  get h() {
    return this.height;
  }
  set h(h) {
    this.height = h;
  }

  get columns() {
    return this.width;
  }
  set columns(columns) {
    this.width = columns;
  }

  get rows() {
    return this.height;
  }
  set rows(rows) {
    this.height = rows;
  }

  get c() {
    return this.width;
  }
  set c(c) {
    this.width = c;
  }

  get r() {
    return this.height;
  }
  set r(r) {
    this.height = r;
  }
}
