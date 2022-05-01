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

  control() {
    if (this.key("right")) this.tryMoveX(1);
    else if (this.key("left")) this.tryMoveX(-1);
    if (this.key("up")) this.tryMoveX(-1);
    else if (this.key("down")) this.tryMoveX(1);
  }

  key(key, readOnce) {
    return this.input.key(this.controls[key], readOnce);
  }

  tryMoveX(x) {
    return this.gameObj.moveXIf(x, this.onConstraint);
  }

  tryMoveY(y) {
    return this.gameObj.moveYIf(y, this.onConstraint);
  }
}
