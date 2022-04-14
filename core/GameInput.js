export default class GameInput {
  keys = [];

  constructor() {
    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    if (!this.getKey(event.code)) this.keys.push(event.code);
  }

  _onKeyUp(event) {
    const index = this.keys.indexOf(event.code);
    if (index >= 0) this.keys.splice(index, 1);
  }

  getKey(key) {
    return this.keys.find(k => k.toLowerCase() === key.toLowerCase());
  }
}
