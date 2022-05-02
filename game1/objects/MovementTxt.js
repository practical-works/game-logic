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
    const space = " ";
    let output = "";
    if (velocity) {
      const { x, y } = velocity;
      const velocityIcon = {};
      if (x > 0) velocityIcon.x = "▶";
      else if (x < 0) velocityIcon.x = "◀";
      if (y > 0) velocityIcon.y = "▼";
      else if (y < 0) velocityIcon.y = "▲";
      output += `${velocityIcon.x || space} x:${velocity.x}\n`;
      output += `${velocityIcon.y || space} y:${velocity.y}\n`;
    }
    let jumpsIcon;
    if (jumps === 1) jumpsIcon ="↥";
    else if (jumps > 1 && jumps < maxJumps) jumpsIcon = "↑";
    else if (jumps === maxJumps) jumpsIcon = "⇑";
    output += `${jumpsIcon || space} ${jumps}/${maxJumps}\n`;
    this.text = output;
  }
}
