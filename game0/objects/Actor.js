import GameObject from "../../core/GameObject.js";
import TopDownMovement from "../components/TopDownMovement.js";
import Health from "../components/Health.js";
import Experience from "../components/Experience.js";

export default class Actor extends GameObject {
  movement = new TopDownMovement(this);
  health = new Health(this);
  experience = new Experience(this);
  map = this.game.obj("map");
  obstacles = [];

  constructor(game, options) {
    super(game, options);
    this.name = "actor";
    this.parent = this.game.obj("map");
    this.color = "#ea4f36";
    this.size = { w: 32, h: 32 };
    this.hotspot = { x: 16, y: 16 };
    this.center();
    this.movement.onConstraint = () => this.canMove;
  }

  get canMove() {
    return this.overlaps(this.map, true) && !this.overlaps(this.obstacles);
  }

  onInit() {
    this.obstacles = [...this.game.obj("blocks").childs.asArray];
  }

  onUpdate() {
    this.movement.control();
  }
}
