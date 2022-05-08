import GameComponent from "./GameComponent.js";

export default class MovementGameComponent extends GameComponent {
  _onConstraint = () => true;
  _controls = {
    right: "ArrowRight",
    left: "ArrowLeft",
    up: "ArrowUp",
    down: "ArrowDown",
  };

  constructor(gameObject, options = {}) {
    super(gameObject);
    const { onConstraint, controls } = options;
    this.onConstraint = onConstraint;
    this.controls = controls;
  }

  get onConstraint() {
    return this._onConstraint;
  }
  set onConstraint(onConstraint) {
    if (typeof onConstraint === "function") this._onConstraint = onConstraint;
  }

  get controls() {
    return this._controls;
  }
  set controls(controls) {
    if (typeof controls === "object") this._controls = controls;
  }

  key(key, readOnce) {
    return this.input.key(this.controls[key], readOnce);
  }

  control() {
    const controlled = {};
    controlled.x = this.controlX();
    controlled.y = this.controlY();
    return controlled.x || controlled.y;
  }

  controlX() {
    let directionX = 0;
    if (this.key("right")) directionX = 1;
    else if (this.key("left")) directionX = -1;
    return this.tryMoveX(directionX);
  }

  controlY() {
    let directionY = 0;
    if (this.key("down")) directionY = 1;
    else if (this.key("up")) directionY = -1;
    return this.tryMoveY(directionY);
  }

  tryMove(x, y) {
    const moved = {};
    moved.x = this.tryMoveX(x);
    moved.y = this.tryMoveY(y);
    return moved.x || moved.y;
  }

  tryMoveX(x) {
    return this.gameObj.moveXIf(x, this.onConstraint);
  }

  tryMoveY(y) {
    return this.gameObj.moveYIf(y, this.onConstraint);
  }
}
