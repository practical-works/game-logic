import TopDownGameComponent from "./TopDownGameComponent.js";
import Position from "../geometry/Position.js";

export default class PlatformGameComponent extends TopDownGameComponent {
  constructor(gameObject, options = {}) {
    super(gameObject, options);
    this.controls.jump = "Space";
    this.speed = { x: 3, y: 10 };
    this.acceleration = { x: 1, y: 0.5 };
    this.deceleration = { x: 1, y: 0 };
  }

  controlY() {
    if (this.key("jump", true)) {
      if (!this.velocity.y) this.velocity.y = -this.speed.y;
    } else if (this.velocity.y < this.speed.y)
      this.velocity.y += this.acceleration.y;
    if (!this.tryMoveY(this.velocity.y)) this.velocity.y = 0;
  }
}
