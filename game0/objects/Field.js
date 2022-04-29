import GameObject from "../../core/GameObject.js";

export default class Field extends GameObject {
  constructor(game, options) {
    super(game, options);
    this.name = `field`;
    this.parent = this.game.obj("map");
    this.color = "#966c6c";
    this.size = { w: 128, h: 64 };
    this.centerX();
  }
}
