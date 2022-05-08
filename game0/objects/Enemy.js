import { GameObject, TopDownGameComponent, Utils } from "../core.js";

export default class Enemy extends GameObject {
  movement = new TopDownGameComponent(this);
  map = this.game.obj("map");
  obstacles = [];
  randMove = {
    delay: 0,
    direction: { x: 0, y: 0 },
  };

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

  moveRandomly() {
    if (this.randMove.delay <= 0) {
      this.randMove.delay = Utils.random(1, 1000);
      this.randMove.direction.x = Utils.random(-1, 1);
      this.randMove.direction.y = Utils.random(-1, 1);
    } else this.randMove.delay--;
    if (this.randMove.delay < 300)
      this.randMove.direction = { x: 0, y: 0 };
    const moved = {};
    moved.x = this.movement.tryMoveX(this.randMove.direction.x);
    moved.y = this.movement.tryMoveY(this.randMove.direction.y);
    if (this.movement.velocity.x && !moved.x) this.randMove.direction.x *= -1;
    if (this.movement.velocity.y && !moved.y) this.randMove.direction.y *= -1;

  }

  onInit() {
    this.obstacles = [...this.game.obj("blocks").childs.asArray];
  }

  onUpdate() {
    this.moveRandomly();
  }
}
