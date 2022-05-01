import { GameObject } from "../core.js";

export default class Platform extends GameObject {
  constructor(game, options) {
    super(game, options);
    this.name = "platform";
    this.color = "#239063";
    this.size = { w: 128, h: 32 };
  }
}
