import GameGomponent from "../../core/GameComponent.js";

export default class TopDownMovement extends GameGomponent {
  axe = { horizontal: false, vertical: false };
  speed = { x: 0, y: 0 };
  direction = { x: 1, y: -1 };
  maxSpeed = { x: 5, y: 5 };
  acceleration = { x: 0.1, y: 0.1 };
  deceleration = { x: 0.05, y: 0.05 };
  obstacles = {
    map: this.gameObj.game.obj("map"),
    blocks: this.gameObj.game.obj("blocks"),
  };

  get canMove() {
    const { map, blocks } = this.obstacles;
    return this.gameObj.overlaps(map, true) && !this.gameObj.overlaps(blocks.childs);
  }

  control() {
    if (this.input.key("ArrowRight")) {
      this.axe.horizontal = true;
      this.direction.x = 1;
    } else if (this.input.key("ArrowLeft")) {
      this.axe.horizontal = true;
      this.direction.x = -1;
    } else this.axe.horizontal = false;

    if (this.input.key("ArrowUp")) {
      this.axe.vertical = true;
      this.direction.y = -1;
    } else if (this.input.key("ArrowDown")) {
      this.axe.vertical = true;
      this.direction.y = 1;
    } else this.axe.vertical = false;

    if (this.axe.horizontal) {
      if (this.speed.x < this.maxSpeed.x) this.speed.x += this.acceleration.x;
    } else {
      if (this.speed.x > 0) this.speed.x -= this.deceleration.x;
      else this.speed.x = 0;
    }
    if (this.axe.vertical) {
      if (this.speed.y < this.maxSpeed.y) this.speed.y += this.acceleration.y;
    } else {
      if (this.speed.y > 0) this.speed.y -= this.deceleration.y;
      else this.speed.y = 0;
    }

    if (this.speed.x > 0)
      if (!this.gameObj.moveXIf(this.direction.x * this.speed.x, () => this.canMove))
        this.speed.x = 0;
    if (this.speed.y > 0)
      if (!this.gameObj.moveYIf(this.direction.y * this.speed.y, () => this.canMove))
        this.speed.y = 0;
  }
}