import { GameObject, TopDownGameComponent, Utils } from "../core.js";

export default class Enemy extends GameObject {
  movement = new TopDownGameComponent(this);
  map = this.game.obj("map");
  obstacles = [];
  delay = 0;

  constructor(game, options) {
    super(game, options);
    this.name = "enemy";
    this.parent = this.game.obj("map");
    this.color = "#ae2334";
    this.size = { w: 32, h: 32 };
    this.hotspot = { x: 16, y: 16 };
    this.position = { x: this.parent.size.w - 53, y: this.parent.size.h / 2 };
    this.movement.onConstraint = () => this.canMove;
  }

  get canMove() {
    return this.overlaps(this.map, true) && !this.overlaps(this.obstacles);
  }

  onInit() {
    this.obstacles = [...this.game.obj("blocks").childs.asArray];
    this.movement.velocity.x = Utils.random(-1, 1);
    this.movement.velocity.y = Utils.random(-1, 1);
  }

  onUpdate() {
    if (!this.movement.velocity.x) this.movement.velocity.x = Utils.random(-1, 1);
    if (!this.movement.velocity.y) this.movement.velocity.y = Utils.random(-1, 1);
    if (this.delay > 0) this.delay--;
    else this.delay = Utils.random(0, 1000);
    if (this.delay < 100) return;
    if (!this.movement.tryMoveX()) this.movement.velocity.x *= -1;
    if (!this.movement.tryMoveY()) this.movement.velocity.y *= -1;
  }
}
