import GameObject from "../../core/GameObject.js";
import TextGameObject from "../../core/TextGameObject.js";

export default class ExperienceBar extends GameObject {
  experience = null;
  fill = null;
  txt = null;

  constructor(game, options) {
    super(game, options);
    this.name = "experienceBar";
    this.color = "#625565";
    this.size = { w: 400, h: 25 };
    this.position = { y: this.game.size.h - 35 };
    this.centerX();
    this.experience = game.obj("actor").experience;
    this.fill = new GameObject(this.game, {
      name: "experienceFill",
      color: "#4d9be6",
      size: this.size,
    });
    this.txt = new TextGameObject(this.game, {
      name: "experienceTxt",
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
    if (!this.experience) return;
    const { relativeRatio, relativeCurrent, relativeMax, level } =
      this.experience;
    this.fill.size.w = relativeRatio * this.size.w;
    this.txt.text = `🏁 ${relativeCurrent}/${relativeMax} (Level ${level})`;
    this.centerTxt();
  }
}
