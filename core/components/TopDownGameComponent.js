import MovementGameComponent from "./MovementGameComponent.js";
import Coordinates from "../geometry/Coordinates.js";
import Dimensions from "../geometry/Dimensions.js";

export default class TopDownGameComponent extends MovementGameComponent {
  _velocity = new Coordinates(0, 0);
  _speed = new Dimensions(5, 5);
  _acceleration = new Dimensions(0.1, 0.1);
  _deceleration = new Dimensions(0.1, 0.1);

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
  set velocity(velocity) {
    this._velocity = new Coordinates(velocity);
  }

  get speed() {
    return this._speed;
  }
  set speed(speed) {
    this._speed = new Dimensions(speed);
  }

  get acceleration() {
    return this._acceleration;
  }
  set acceleration(acceleration) {
    this._acceleration = new Dimensions(acceleration);
  }

  get deceleration() {
    return this._deceleration;
  }
  set deceleration(deceleration) {
    this._deceleration = new Dimensions(deceleration);
  }

  tryMoveX(directionX) {
    if (directionX > 0) {
      if (this.velocity.x < this.speed.x)
        this.velocity.x += this.acceleration.x;
    } else if (directionX < 0) {
      if (this.velocity.x > -this.speed.x)
        this.velocity.x -= this.acceleration.x;
    } else {
      if (this.velocity.x > 0) this.velocity.x -= this.deceleration.x;
      if (this.velocity.x < 0) this.velocity.x += this.deceleration.x;
    }
    this.fixVelocityX();
    const movedX = this.velocity.x && super.tryMoveX(this.velocity.x);
    if (!movedX) this.velocity.x = 0;
    return movedX;
  }

  tryMoveY(directionY) {
    if (directionY > 0) {
      if (this.velocity.y < this.speed.y)
        this.velocity.y += this.acceleration.y;
    } else if (directionY < 0) {
      if (this.velocity.y > -this.speed.y)
        this.velocity.y -= this.acceleration.y;
    } else {
      if (this.velocity.y > 0) this.velocity.y -= this.deceleration.y;
      if (this.velocity.y < 0) this.velocity.y += this.deceleration.y;
    }
    this.fixVelocityY();
    const movedY = this.velocity.y && super.tryMoveY(this.velocity.y);
    if (!movedY) this.velocity.y = 0;
    return movedY;
  }

  fixVelocityX() {
    if (this.velocity.x > this.speed.x) this.velocity.x = this.speed.x;
    if (this.velocity.x < -this.speed.x) this.velocity.x = -this.speed.x;
    this.velocity.x = Number(this.velocity.x.toFixed(2));
  }

  fixVelocityY() {
    if (this.velocity.y > this.speed.y) this.velocity.y = this.speed.y;
    if (this.velocity.y < -this.speed.y) this.velocity.y = -this.speed.y;
    this.velocity.y = Number(this.velocity.y.toFixed(2));
  }
}
