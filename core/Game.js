import GameObject from "./GameObject.js";
import TextGameObject from "./TextGameObject.js";
import GameList from "./GameList.js";
import GameInput from "./GameInput.js";

export default class Game {
  _context;
  _input = new GameInput();
  _data = {};
  _loopId = 0;
  _title = "";
  _objects = new GameList();
  _size = { w: 640, h: 480 };
  _onInit = (gObj) => undefined;
  _onUpdate = (gObj) => undefined;

  constructor(options = {}) {
    const { title, size, objs, onInit, onUpdate } = options;
    this.title = title;
    this.size = size;
    this.objs = objs;
    this.onInit = onInit;
    this.onUpdate = onUpdate;
    this._createCanvas();
    this._input.game = this;
    this.onInit(this);
    this._startLoop();
  }

  get $context() {
    return this._context;
  }

  get input() {
    return this._input;
  }

  get data() {
    return this._data;
  }
  set data(data) {
    if (data && typeof data === "object") this._data = data;
  }

  get title() {
    return this._title;
  }
  set title(title) {
    window.document.title = this._title = title;
  }

  get size() {
    return this._size;
  }
  set size(size) {
    const { w, h } = size;
    this.size.w = w;
    this.size.h = h;
  }

  get objs() {
    return this._objects;
  }
  set objs(gameObjects) {
    if (!(gameObjects instanceof GameList)) return;
    this._objects = gameObjects;
  }

  get onInit() {
    return this._onInit;
  }
  set onInit(onInit) {
    if (typeof onInit === "function") this._onInit = onInit;
  }

  get onUpdate() {
    return this._onUpdate;
  }
  set onUpdate(onUpdate) {
    if (typeof onUpdate === "function") this._onUpdate = onUpdate;
  }

  _createCanvas() {
    const canvas = window.document.createElement("canvas");
    canvas.width = this.size.w;
    canvas.height = this.size.h;
    canvas.style.border = "1px solid grey";
    canvas.style.backgroundColor = "#111";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    window.document.body.appendChild(canvas);
    this._context = canvas.getContext("2d");
    this._context.textBaseline = "top";
  }

  _clearCanvas() {
    const ctx = this.$context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  _startLoop() {
    const update = () => {
      this._loopId = window.requestAnimationFrame(update);
      this._clearCanvas();
      this.onUpdate(this);
    };
    update();
  }

  _stopLoop() {
    window.cancelAnimationFrame(this._loopId);
    this._loopId = 0;
  }

  obj(name) {
    return this._objects.gameObjByName(name);
  }

  newObj(options = {}) {
    const { name, type } = options;
    if (this._objects.gameObjByName(name))
      throw Error(`A game object named "${name}" already exist.`);
    switch (type) {
      case "text":
        return this._objects.add(new TextGameObject(this, options));
      default:
        return this._objects.add(new GameObject(this, options));
    }
  }

  newGrid(options = {}) {
    const { name = "unamedGrid" } = options;
    const { cell = { color: "", size: {}, margin: 1 } } = options;
    const { division = { columns: 1, rows: 1 } } = options;
    const { position = { x: 0, y: 0 } } = options;
    cell.type = "";
    const count = division.columns * division.rows;
    let column = 0;
    let row = 0;
    const container = this.newObj({
      ...options,
      name,
      position,
      hidden: true,
      size: {
        w: (cell.size.w + cell.margin) * division.columns + cell.margin,
        h: (cell.size.h + cell.margin) * division.rows + cell.margin,
      },
    });
    for (let i = 0; i < count; i++) {
      const gObj = container.childs.add(
        this.newObj({ ...cell, name: `${name}${i}` })
      );
      gObj.position.x = cell.margin + column * (gObj.size.w + cell.margin);
      gObj.position.y = cell.margin + row * (gObj.size.h + cell.margin);
      column++;
      if (column >= division.columns) {
        column = 0;
        row++;
      }
    }
  }

  draw() {
    for (const obj of this._objects) obj.draw();
  }
}
