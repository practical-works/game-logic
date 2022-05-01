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

  control() {
    if (this.key("right")) {
      if (this.velocity.x < this.speed.x)
        this.velocity.x += this.acceleration.x;
    } else if (this.key("left")) {
      if (this.velocity.x > -this.speed.x)
        this.velocity.x -= this.acceleration.x;
    } else {
      if (this.velocity.x > 0) this.velocity.x -= this.deceleration.x;
      if (this.velocity.x < 0) this.velocity.x += this.deceleration.x;
    }

    if (this.key("jump", true)) {
      if (this.velocity.y === 0) this.velocity.y = -this.speed.y;
    } else if (this.velocity.y < this.speed.y)
      this.velocity.y += this.acceleration.y;

    if (this.velocity.x > this.speed.x) this.velocity.x = this.speed.x;
    if (this.velocity.x < -this.speed.x) this.velocity.x = -this.speed.x;
    if (this.velocity.y > this.speed.y) this.velocity.y = this.speed.y;
    if (this.velocity.y < -this.speed.y) this.velocity.y = -this.speed.y;
    this.velocity.x = Number(this.velocity.x.toFixed(2));
    this.velocity.y = Number(this.velocity.y.toFixed(2));

    if (this.velocity.x && !this.tryMoveX(this.velocity.x)) this.velocity.x = 0;
    if (this.velocity.y && !this.tryMoveY(this.velocity.y)) this.velocity.y = 0;
  }
}
