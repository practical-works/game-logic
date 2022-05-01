import GameObject from "./GameObject.js";

export default class GameList {
  _name = "";
  _gameObjects = [];
  _onAdd = (gObj) => undefined;
  _onRemove = (gObj) => undefined;

  constructor(name, gameObjects = []) {
    this.name = name || "unamedGameList";
    this.addRange(gameObjects);
  }

  *[Symbol.iterator]() {
    for (const gObj of this._gameObjects) yield gObj;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    if (name) this._name = String(name);
  }

  get asArray() {
    return [...this._gameObjects];
  }

  get asReverse() {
    return [...this._gameObjects].reverse();
  }

  get asObject() {
    const gameListAsObj = {};
    const duplicatesCounter = {};
    for (const gObj of this._gameObjects) {
      if (gameListAsObj[gObj.name]) {
        if (!duplicatesCounter[gObj.name]) duplicatesCounter[gObj.name] = 0;
        gameListAsObj[`${gObj.name}${duplicatesCounter[gObj.name]}`] =
          gameListAsObj[gObj.name];
        delete gameListAsObj[gObj.name];
        duplicatesCounter[gObj.name]++;
        gameListAsObj[`${gObj.name}${duplicatesCounter[gObj.name]}`] = gObj;
      } else {
        gameListAsObj[gObj.name] = gObj;
      }
    }
    return gameListAsObj;
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
  get length() {
    return this._gameObjects.length;
  }

  gameObjByIndex(i) {
    return this._gameObjects[i];
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
    if (!(gameObject instanceof GameObject))
      throw Error(
        `The provided argument is not an instance of ${GameObject.name}.`
      );
    if (this.gameObjById(gameObject.id))
      throw Error(
        `Duplicate id. Cannot add the game object named "${gameObject.name}" to the list named "${this.name}" because it already contains a game object with the same id (id: ${gameObject.id}).`
      );
    this._gameObjects.push(gameObject);
    this.onAdd(gameObject);
    return gameObject;
  }

  addRange(gameObjects = []) {
    if (gameObjects instanceof GameList && gameObjects.length)
      gameObjects = gameObjects.asArray;
    else if (!Array.isArray(gameObjects)) return;
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
}
