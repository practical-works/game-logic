import GameObject from "./GameObject.js";

export default class GameList {
  _gameObjects = [];
  _onAdd = (gObj) => undefined;
  _onRemove = (gObj) => undefined;

  constructor(gameObjects = []) {
    this.addRange(gameObjects);
  }

  *[Symbol.iterator]() {
    for (const gObj of this._gameObjects) yield gObj;
  }

  get onAdd() {
    return this._onAdd;
  }
  set onAdd(onAdd) {
    if (typeof onAdd !== "function") return;
    this._onAdd = onAdd;
  }

  get onRemove() {
    return this._onRemove;
  }
  set onRemove(onRemove) {
    if (typeof onRemove !== "function") return;
    this._onRemove = onRemove;
  }

  get count() {
    return this._gameObjects.length;
  }

  gameObjById(id) {
    return this._gameObjects.find((gObj) => gObj.id === id);
  }

  gameObjByName(name) {
    return this._gameObjects.find((gObj) => gObj.name === name);
  }

  gameObjsByName(name) {
    return this._gameObjects.filter((gObj) => gObj.name === name);
  }

  add(gameObject) {
    if (!(gameObject instanceof GameObject)) return;
    if (this.gameObjById(gameObject.id)) return;
    this._gameObjects.push(gameObject);
    this.onAdd(gameObject);
    return gameObject;
  }

  addRange(gameObjects = []) {
    if (!Array.isArray(gameObjects)) return;
    const addedGameObjects = [];
    for (const gObj of gameObjects) {
      const addedObj = this.add(gObj);
      if (addedObj) addedGameObjects.push(addedObj);
    }
    return addedGameObjects;
  }

  remove(id) {
    const i = this._gameObjects.findIndex((gObj) => gObj.id === id);
    if (i >= 0) {
      const removedGameObject = this._gameObjects.splice(i, 1)[0];
      this.onRemove(removedGameObject);
      return removedGameObject;
    }
  }

  toObj() {
    const gListObj = {};
    for (const gObj of this._gameObjects) gListObj[gObj.name] = gObj;
    return gListObj;
  }
}
