import TextGameObject from "../../core/TextGameObject.js";

export default class CursorTxt extends TextGameObject {
  constructor(game, options) {
    super(game, options);
    this.name = "cursorTxt";
    this.color = "#fbff86";
    this.font = "20px consolas";
  }

  onUpdate() {
    const cursor = this.game.input.cursor;
    this.text = `${cursor.x},${cursor.y} 🐭`;
    this.position.x = this.game.size.w - this.size.w - 8;
    this.position.y = this.game.size.h - this.size.h - 8;
  }
}
