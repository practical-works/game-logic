import { GameObject } from "../core.js";

export default class Map extends GameObject {
  constructor(game, options) {
    super(game, options);
    this.name = "map";
    this.color = "#3e3546";
    this.size = { w: 400, h: 400 };
    this.center();
  }

  onUpdate() {
    if (this.game.input.key("KeyD")) this.moveX(1);
    if (this.game.input.key("KeyA")) this.moveX(-1);
    if (this.game.input.key("KeyW")) this.moveY(-1);
    if (this.game.input.key("KeyS")) this.moveY(1);
  }
}
