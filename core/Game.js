import GameObject from "./GameObject.js";
import GameInput from "./GameInput.js";

export default class Game {
  resolution = { width: 640, height: 480 };
  objects = {};
  input = new GameInput();
  $canvas = document.createElement("canvas");
  $context = this.$canvas.getContext("2d");
  _initialized = false;
  _interval;

  constructor(options = {}) {
    const { resolution } = options;
    if (resolution) {
      const { width, height } = resolution;
      this.resolution = { width, height };
    }
    this._drawCanvas();
  }

  _drawCanvas() {
    this.$canvas.width = this.resolution.width;
    this.$canvas.height = this.resolution.height;
    this.$canvas.style.border = "1px solid grey";
    this.$canvas.style.backgroundColor = "#111";
    this.$canvas.style.display = "block";
    this.$canvas.style.margin = "0 auto";
    document.body.appendChild(this.$canvas);
  }

  update(callback) {
    if (this._interval) clearInterval(this._interval);
    this._interval = setInterval(() => {
      this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
      callback(this);
      this.$context.beginPath();
      this.$context.closePath();
    }, 10);
  }

  createObject(name = "unamed", options = {}) {
    if (this.objects[name])
      throw Error(`"${name}" game object already created.`);
    return (this.objects[name] = new GameObject(this, options));
  }

  createGrid(baseObjectName = "unamed", options = {}) {
    const { columns = 1, rows = 1, padding = 1 } = options;
    const { position = { x: 0, y: 0 } } = options;
    const count = columns * rows;
    const grid = [];
    for (let i = 0; i < count; i++) {
      const gameObject = this.createObject(`${baseObjectName}${i}`);
      // ...
      grid[i] = gameObject;
    }
    return grid;
  }

  drawObjects() {
    for (const key in this.objects) this.objects[key].draw();
  }
}
