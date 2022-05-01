import GameObject from "./GameObject.js";

export default class TextGameObject extends GameObject {
  _text = "";
  _defaultFont = "20px sans-serif";
  _font = this._defaultFont;

  constructor(game, options = {}) {
    super(game, options);
    const { text, font } = options;
    this.text = text || this.name;
    this.font = font;
    this._size = undefined;
  }

  get $metrics() {
    const ctx = this.game.$context;
    ctx.font = this.font;
    return ctx.measureText(this.text);
  }

  get size() {
    const m = this.$metrics;
    return {
      w: m.width,
      h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
    };
  }
  set size(size) {}

  get text() {
    return this._text;
  }
  set text(text) {
    this._text = String(text || "");
  }

  get font() {
    return this._font;
  }
  set font(font) {
    if (font) this._font = String(font);
  }

  draw() {
    const ctx = this.game.$context;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.font = this._defaultFont;
    ctx.font = this.font;
    const lines = this.text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const x = this.$truePosition.x;
      const y = this.$truePosition.y + 1.5 * i * this.size.h;
      ctx.fillText(lines[i], x, y);
    }
    ctx.closePath();
  }
}
