import { GridGameObject } from "../core.js";

export default class Blocks extends GridGameObject {
  constructor(game, options) {
    super(game, options);
    this.name = "blocks";
    this.cell = {
      color: "#625565",
      margin: 41,
      size: { w: 32, h: 32 },
    };
    this.division = { c: 6, r: 6 };
    this.color = "rgba(0, 0, 0, 0)";
  }

  onInit() {
    super.onInit();
    this.center();
  }
}
