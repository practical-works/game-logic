import { GameObject } from "../core.js";

export default class Enemy extends GameObject {
  constructor(game, options) {
    super(game, options);
    this.name = "enemy";
    this.parent = this.game.obj("map");
    this.color = "#ae2334";
    this.size = { w: 32, h: 32 };
    this.hotspot = { x: 16, y: 16 };
    this.position = { x: this.parent.size.w - 53, y: this.parent.size.h / 2 };
  }
}
