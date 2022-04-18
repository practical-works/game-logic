import GameObject from "./GameObject.js";
import GameList from "./GameList.js";

export default class Game {
  _$context;
  _title = "";
  _size = { w: 640, h: 480 };
  _objects = new GameList();

  constructor(options = {}) {
    const { title, size } = options;
    this.title = title;
    this.size = size;
    this._draw();
  }

  get $context() {
    return this._$context;
  }

  get title() {
    return this._title;
  }
  set title(title) {
    document.title = this._title = title;
  }

  get objs() {
    return this._objects;
  }
  set objs(gameObjects) {
    if (!(gameObjects instanceof GameList)) return;
    this._objects = gameObjects;
  }

  get size() {
    return this._size;
  }
  set size(size) {
    const { w, h } = size;
    this.size.w = w;
    this.size.h = h;
  }

  _draw() {
    const canvas = document.createElement("canvas");
    canvas.width = this.size.w;
    canvas.height = this.size.h;
    canvas.style.border = "1px solid grey";
    canvas.style.backgroundColor = "#111";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    document.body.appendChild(canvas);
    this._$context = canvas.getContext("2d");
  }

  newObj(options = {}) {
    const { name } = options;
    if (this._objects[name])
      throw Error(`A game object named "${name}" already exist.`);
    return (this._objects[name] = new GameObject(this, options));
  }

  drawObjs() {
    for (const key in this._objects)
      if (this._objects[key] instanceof GameObject) this._objects[key].draw();
  }
}
