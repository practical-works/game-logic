import GameObject from "./objects/GameObject.js";
import TextGameObject from "./objects/TextGameObject.js";
import GameList from "./GameList.js";
import GameInput from "./GameInput.js";
import Size from "./geometry/Size.js";

export default class Game extends GameObject {
  _context;
  _input = new GameInput();
  _data = {};
  _loopId = 0;
  _title = "";
  _color = "#111";
  _objects = new GameList();

  constructor(options = {}) {
    if (!options.size) options.size = new Size(640, 480);
    super(null, options);
    const { title, color, objs, onInit, onUpdate } = options;
    this.title = title;
    this.objs = objs;
    this.onInit = onInit;
    this.onUpdate = onUpdate;
    this._createCanvas();
    this.color = color;
    this._input.game = this;
    this._init();
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
    window.document.title = this._title = String(title);
  }

  get color() {
    return this._color;
  }
  set color(color) {
    if (color && this.$context)
      this.$context.canvas.style.backgroundColor = this._color = String(color);
  }

  get objs() {
    return this._objects;
  }
  set objs(gameObjects) {
    if (gameObjects && !(gameObjects instanceof GameList)) return;
    this._objects = new GameList(`${this.title}Objs`, gameObjects);
  }

  _createCanvas() {
    const canvas = window.document.createElement("canvas");
    canvas.width = this.size.w;
    canvas.height = this.size.h;
    canvas.style.border = "1px solid grey";
    canvas.style.backgroundColor = this.color;
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

  _init() {
    this.onInit(this);
    for (const obj of this._objects) obj.onInit(this);
  }

  _startLoop() {
    const update = (time) => {
      this._loopId = window.requestAnimationFrame(update);
      this._clearCanvas();
      for (const obj of this._objects) obj.onUpdate(this, time || 0);
      this.onUpdate(this, time || 0);
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
    if (typeof options === "object") {
      switch (options.type) {
        case "text":
          return this._objects.add(new TextGameObject(this, options));
        case "grid":
          return this._objects.add(new GridGameObject(this, options));
        default:
          return this._objects.add(new GameObject(this, options));
      }
    } else if (GameObject.isSuperClassOf(options)) {
      const gameObjectConstructor = options;
      return this._objects.add(new gameObjectConstructor(this));
    }
  }

  draw() {
    for (const obj of this._objects) obj.draw();
  }
}
