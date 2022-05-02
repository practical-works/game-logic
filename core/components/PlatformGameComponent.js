import TopDownGameComponent from "./TopDownGameComponent.js";
import Position from "../geometry/Position.js";

export default class PlatformGameComponent extends TopDownGameComponent {
  _jumps = 0;
  _maxJumps = 2;

  constructor(gameObject, options = {}) {
    super(gameObject, options);
    this.controls.jump = "Space";
    this.speed = { x: 3, y: 10 };
    this.acceleration = { x: 1, y: 0.5 };
    this.deceleration = { x: 1, y: 3 };
  }

  get jumps() {
    return this._jumps;
  }
  set jumps(jumps) {
    if (!isNaN(jumps)) this._jumps = Math.abs(jumps);
  }

  get maxJumps() {
    return this._maxJumps;
  }

  controlY() {
    if (this.key("jump", true)) {
      const canFloorJump = !this.velocity.y && this.maxJumps;
      const canAirJump = this.jumps < this.maxJumps;
      if (canFloorJump || canAirJump) {
        this.velocity.y = -this.speed.y;
        this.jumps++;
        if (this.velocity.y > 0) this.jumps++;
      }
    } else {
      if (this.velocity.y < this.speed.y)
        this.velocity.y += this.acceleration.y;
    }
    if (!this.key("jump") && this.velocity.y < 0)
      this.velocity.y += this.deceleration.y;
    if (!this.tryMoveY(this.velocity.y)) {
      if (this.velocity.y > 0) this.jumps = 0;
      this.velocity.y = 0;
    }
  }
}
