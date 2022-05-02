import { TextGameObject } from "../core.js";

export default class MovementTxt extends TextGameObject {
  actor = this.game.obj("actor");

  constructor(game, options) {
    super(game, options);
    this.name = "movementTxt";
    this.color = "#fbff86";
    this.font = "20px consolas";
    this.position.x = 8;
    this.position.y = 8;
  }

  onUpdate() {
    const { velocity, jumps, maxJumps } = this.actor.movement;
    let output = "";
    if (velocity) {
      const { x, y } = velocity;
      const icon = {};
      if (x > 0) icon.x = "▶";
      else if (x < 0) icon.x = "◀";
      else icon.x = "";
      if (y > 0) icon.y = "▼";
      else if (y < 0) icon.y = "▲";
      else icon.y = "";
      output += `${icon.x} x:${velocity.x}\n`;
      output += `${icon.y} y:${velocity.y}\n`;
    }
    output += ` 🏃:${jumps}/${maxJumps}\n`;
    this.text = output;
  }
}
