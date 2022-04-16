export default class GameInput {
  game = null;
  keys = [];
  pointer = { x: 0, y: 0 };

  constructor(game) {
    if (game) this.game = game;
    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
    this.game.$canvas.addEventListener("mousemove", (e) => this._mouseUp(e), false);
  }

  _onKeyDown(event) {
    if (!this.getKey(event.code)) this.keys.push(event.code);
  }

  _onKeyUp(event) {
    const index = this.keys.indexOf(event.code);
    if (index >= 0) this.keys.splice(index, 1);
  }

  _mouseUp(event) {
    this.pointer.x = event.offsetX;
    this.pointer.y = event.offsetY;
  }

  getKey(key) {
    return this.keys.find((k) => k.toLowerCase() === key.toLowerCase());
  }
}
