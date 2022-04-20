import Game from "./Game.js";

export default class GameInput {
  _game = null;
  _keys = [];
  _mouseBtns = { left: false, middle: false, right: false };
  _cursor = { x: 0, y: 0 };

  constructor(game) {
    if (game) this.game = game;
  }

  get game() {
    return this._game;
  }
  set game(game) {
    if (game instanceof Game) {
      this._game = game;
      this._registerEvents();
    }
  }

  get cursor() {
    return this._cursor;
  }

  get mouseBtns() {
    return this._mouseBtns;
  }

  _registerEvents() {
    this._registerKeyboardEvents();
    this._registerMouseEvents();
  }

  _registerKeyboardEvents() {
    const onKeyDown = (e) => {
      if (!this.key(e.code)) this._keys.push(e.code);
    };
    const onKeyUp = (e) => {
      const i = this._keys.indexOf(e.code);
      if (i >= 0) this._keys.splice(i, 1);
    };
    window.document.removeEventListener("keydown", onKeyDown, false);
    window.document.addEventListener("keydown", onKeyDown, false);
    window.document.removeEventListener("keyup", onKeyUp, false);
    window.document.addEventListener("keyup", onKeyUp, false);
  }

  _registerMouseEvents() {
    const onMouseMove = (e) => {
      this._cursor.x = e.offsetX;
      this._cursor.y = e.offsetY;
    };
    const onMouseDown = (e) => {
      this._mouseBtns.left = e.button === 0;
      this._mouseBtns.middle = e.button === 1;
      this._mouseBtns.right = e.button === 2;
    };
    const onMouseUp = (e) => {
      this._mouseBtns.left = false;
      this._mouseBtns.middle = false;
      this._mouseBtns.right = false;
    };
    const ctx = this.game.$context;
    const element = ctx ? ctx.canvas : window.document;
    element.removeEventListener("mousemove", onMouseMove, false);
    element.addEventListener("mousemove", onMouseMove, false);
    element.removeEventListener("mousedown", onMouseDown, false);
    element.addEventListener("mousedown", onMouseDown, false);
    element.removeEventListener("mouseup", onMouseUp, false);
    element.addEventListener("mouseup", onMouseUp, false);
  }

  key(key) {
    return this._keys.find((k) => k.toLowerCase() === key.toLowerCase());
  }

  mouse(mb) {
    return this.mouseBtns[mb];
  }
}
