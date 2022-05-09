import { GameObject, TopDownGameComponent } from "../core.js";
import Health from "../components/Health.js";
import Experience from "../components/Experience.js";

export default class Actor extends GameObject {
  movement = new TopDownGameComponent(this);
  health = new Health(this);
  experience = new Experience(this);
  map = this.game.obj("map");
  obstacles = [];

  constructor(game, options) {
    super(game, options);
    this.name = "actor";
    this.parent = this.game.obj("map");
    this.color = "#ea4f36";
    this.sprites = [
      "/game0/assets/actor_0.png",
      "/game0/assets/actor_1.png",
      "/game0/assets/actor_2.png"
    ];
    this.loopAnimation = true;
    this.animationSpeed = 3;
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
