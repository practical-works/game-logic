import GameObject from "../objects/GameObject.js";

export default class GameComponent {
  _gameObject = null;

  constructor(gameObject) {
    this.gameObject = gameObject;
  }

  get gameObject() {
    return this._gameObject;
  }
  set gameObject(gameObject) {
    if (gameObject instanceof GameObject) this._gameObject = gameObject;
  }

  get gameObj() {
    return this.gameObject;
  }
  set gameObj(gameObj) {
    this.gameObject = gameObj;
  }

  get obj() {
    return this.gameObject;
  }
  set obj(obj) {
    this.gameObject = obj;
  }

  get game() {
    if (this.gameObject) return this.gameObject.game;
  }

  get input() {
    if (this.gameObject && this.gameObject.game)
      return this.gameObject.game.input;
  }
}
