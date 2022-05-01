import { GameObject, PlatformGameComponent } from "../core.js";

export default class Actor extends GameObject {
  movement = new PlatformGameComponent(this);
  obstacles = [];

  constructor(game, options) {
    super(game, options);
    this.name = "actor";
    this.color = "#ea4f36";
    this.size = { w: 32, h: 32 };
    this.hotspot = { x: 16, y: 16 };
    this.move(this.hotspot.x, this.hotspot.y);
    this.movement.onConstraint = () => this.canMove;
  }

  get canMove() {
    return this.overlaps(this.game, true) && !this.overlaps(this.obstacles);
  }

  onInit() {
    this.obstacles = [...this.game.objs.gameObjsByName("platform")];
  }

  onUpdate() {
    this.movement.control();
  }
}
