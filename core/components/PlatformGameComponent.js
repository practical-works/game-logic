import MovementGameComponent from "./MovementGameComponent.js";
import TopDownGameComponent from "./TopDownGameComponent.js";
import Coordinates from "../geometry/Coordinates.js";

export default class PlatformGameComponent extends TopDownGameComponent {
  _jumpEnabled = true;
  _jumpStrength = 10;
  _maxAirJumps = 1;
  _airJumps = 0;
  _floorJumps = 0;

  constructor(gameObject, options = {}) {
    super(gameObject, options);
    const { jumpEnabled, jumpStrength } = options;
    const { speed, acceleration, deceleration } = options;
    if (jumpEnabled !== undefined) this.jumpEnabled = jumpEnabled;
    if (jumpStrength !== undefined) this.jumpStrength = jumpStrength;
    if (!speed) this.speed = { x: 3, y: 20 };
    if (!acceleration) this.acceleration = { x: 1, y: 0.5 };
    if (!deceleration) this.deceleration = { x: 1, y: 3 };
    this.controls.jump = "Space";
  }

  get gravity() {
    return this.acceleration.y;
  }
  set gravity(gravity) {
    this.acceleration.y = gravity;
  }

  get jumpStrength() {
    return this._jumpStrength;
  }
  set jumpStrength(jumpStrength) {
    this._jumpStrength = jumpStrength;
  }

  get standingVertically() {
    return !this.velocity.y;
  }

  get flying() {
    return this.velocity.y < 0;
  }

  get falling() {
    return this.velocity.y > 0;
  }

  get jumpEnabled() {
    return this._jumpEnabled;
  }
  set jumpEnabled(jumpEnabled) {
    this._jumpEnabled = Boolean(jumpEnabled);
  }

  get maxAirJumps() {
    return this._maxAirJumps;
  }
  set maxAirJumps(maxAirJumps) {
    if (!isNaN(maxAirJumps)) this._maxAirJumps = Math.abs(maxAirJumps);
  }

  get maxJumps() {
    return this.maxAirJumps + 1;
  }
  set maxJumps(maxJumps) {
    if (!isNaN(maxJumps)) return;
    if (maxJumps) maxJumps = Math.abs(maxJumps);
    this.jumpEnabled = Boolean(maxJumps);
    this.maxAirJumps = maxJumps ? maxJumps - 1 : 0;
  }

  get airJumps() {
    return this._airJumps;
  }
  set airJumps(airJumps) {
    if (!isNaN(airJumps)) this._airJumps = Math.abs(airJumps);
  }

  get floorJumps() {
    return this._floorJumps;
  }
  set floorJumps(floorJumps) {
    if (!isNaN(floorJumps)) this._floorJumps = Math.abs(floorJumps);
  }

  get jumps() {
    return this.airJumps + this.floorJumps;
  }

  controlY() {
    if (this.jumpEnabled && this.key("jump", true)) {
      if (this.standingVertically) {
        this.velocity.y = -this.jumpStrength;
        this.floorJumps++;
      } else if (this.airJumps < this.maxAirJumps) {
        this.velocity.y = -this.jumpStrength;
        this.airJumps++;
      }
    } else {
      if (this.velocity.y < this.speed.y) this.velocity.y += this.gravity;
    }
    if (!this.key("jump") && this.flying)
      this.velocity.y += this.deceleration.y;

    if (!MovementGameComponent.prototype.tryMoveY.call(this, this.velocity.y)) {
      if (this.falling) this.airJumps = this.floorJumps = 0;
      this.velocity.y = 0;
    }
  }
}
