import GameObject from "../../core/GameObject.js";
import TextGameObject from "../../core/TextGameObject.js";

export default class HealthBar extends GameObject {
  health = null;
  fill = null;
  txt = null;

  constructor(game, options) {
    super(game, options);
    this.name = "healthBar";
    this.color = "#625565";
    this.size = { w: 400, h: 25 };
    this.position = { y: 10 };
    this.centerX();
    this.health = this.game.obj("actor").health;
    this.fill = new GameObject(this.game, {
      name: "healthFill",
      color: "#0b5e65",
      size: this.size,
    });
    this.txt = new TextGameObject(this.game, {
      name: "healthTxt",
      font: "bold 15px consolas",
    });
    this.childs.addRange([this.fill, this.txt]);
    this.centerTxt();
  }

  centerTxt() {
    this.txt.hotspot = {
      x: this.txt.size.w * 0.5,
      y: this.txt.size.h * 0.5,
    };
    this.txt.center();
  }

  onUpdate() {
    if (!this.health) return;
    const { ratio, percent, current, max } = this.health;
    if (ratio >= 0.5) this.fill.color = "#0b5e65";
    else if (ratio >= 0.2) this.fill.color = "#f9c22b";
    else this.fill.color = "#b33831";
    this.fill.size.w = ratio * this.size.w;
    this.txt.text = `❤️ ${current}/${max} (${percent}%)`;
    this.centerTxt();
  }
}
