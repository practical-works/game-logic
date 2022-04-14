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

  createObject(name, options = {}) {
    return (this.objects[name] = new GameObject(this, options));
  }

  drawObjects() {
    for (const key in this.objects) this.objects[key].draw();
  }
}
