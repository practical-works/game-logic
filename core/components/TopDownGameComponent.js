import MovementGameComponent from "./MovementGameComponent.js";
import Position from "../geometry/Position.js";

export default class TopDownGameComponent extends MovementGameComponent {
  _velocity = new Position(0, 0);
  _speed = new Position(5, 5);
  _acceleration = new Position(0.1, 0.1);
  _deceleration = new Position(0.1, 0.1);

  constructor(gameObject, options = {}) {
    super(gameObject, options);
    const { speed, acceleration, accel, deceleration, decel } = options;
    this.speed = speed || this.speed;
    this.acceleration = acceleration || accel || this.acceleration;
    this.deceleration = deceleration || decel || this.deceleration;
  }

  get velocity() {
    return this._velocity;
  }

  get speed() {
    return this._speed;
  }
  set speed(speed) {
    this._speed = new Position(speed);
  }

  get acceleration() {
    return this._acceleration;
  }
  set acceleration(acceleration) {
    this._acceleration = new Position(acceleration);
  }

  get deceleration() {
    return this._deceleration;
  }
  set deceleration(deceleration) {
    this._deceleration = new Position(deceleration);
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
