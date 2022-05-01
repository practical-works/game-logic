import { MovementGameComponent } from "../core.js";

export default class TopDownMovement extends MovementGameComponent {
  velocity = { x: 0, y: 0 };
  speed = { x: 5, y: 5 };
  acceleration = { x: 0.1, y: 0.1 };
  deceleration = { x: 0.1, y: 0.1 };

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

    if (this.key("up")) {
      if (this.velocity.y > -this.speed.y)
        this.velocity.y -= this.acceleration.y;
    } else if (this.key("down")) {
      if (this.velocity.y < this.speed.y)
        this.velocity.y += this.acceleration.y;
    } else {
      if (this.velocity.y > 0) this.velocity.y -= this.deceleration.y;
      if (this.velocity.y < 0) this.velocity.y += this.deceleration.y;
    }

    this.velocity.x = Number(this.velocity.x.toFixed(2));
    this.velocity.y = Number(this.velocity.y.toFixed(2));

    if (this.velocity.x && !this.tryMoveX(this.velocity.x)) this.velocity.x = 0;
    if (this.velocity.y && !this.tryMoveY(this.velocity.y)) this.velocity.y = 0;
  }
}
