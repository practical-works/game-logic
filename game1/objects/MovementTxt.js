import TextGameObject from "../../core/TextGameObject.js";

export default class MovementTxt extends TextGameObject {
  actor = this.game.obj("actor");

  constructor(game, options) {
    super(game, options);
    this.name = "movementTxt";
    this.color = "#fbff86";
    this.font = "20px consolas";
  }

  onUpdate() {

  }
}
