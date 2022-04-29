import Game from "./Game.js";
import GameList from "./GameList.js";
import Shape from "./geometry/Shape.js";

export default class GameObject extends Shape {
  static _count = 0;
  _id = -1;
  _game = null;
  _data = {};
  _name = "";
  _color = "white";
  _parent = null;
  _childs = new GameList();
  _hidden = false;
  _onInit = (gObj) => undefined;
  _onUpdate = (gObj) => undefined;

  constructor(game, options = {}) {
    super(options);
    const { name, data, color, hidden } = options;
    const { parent, childs, centerX, centerY, center } = options;
    GameObject._count++;
    this._id = GameObject._count - 1;
    this.game = game;
    this.name = name || `unamed${this.id}`;
    this.data = data;
    this.color = color;
    this.hidden = hidden;
    this.parent = parent;
    this.childs = childs;
    this.childs.onAdd = (addedChild) => {
      if (addedChild.parent && addedChild.parent.id === this.id) return;
      addedChild._parent = this;
    };
    this.childs.onRemove = (removedChild) => (removedChild._parent = null);
    if (centerX) this.centerX(centerX);
    if (centerY) this.centerY(centerY);
    if (center) this.center(center);
  }

  static count() {
    return GameObject._count;
  }

  get id() {
    return this._id;
  }

  get game() {
    return this._game;
  }
  set game(game) {
    if (game instanceof Game) this._game = game;
  }

  get data() {
    return this._data;
  }
  set data(data) {
    if (data && typeof data === "object") this._data = data;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    if (name) this._name = name;
  }

  get color() {
    return this._color;
  }
  set color(color) {
    if (color) this._color = String(color);
  }

  get hidden() {
    return this._hidden;
  }
  set hidden(hidden) {
    this._hidden = Boolean(hidden);
  }

  get parent() {
    return this._parent;
  }
  set parent(parent) {
    if (parent) {
      if (!(parent instanceof GameObject)) return;
      if (this._parent && parent.id === this._parent.id) return;
    }
    if (this._parent) this._parent.childs.remove(this);
    this._parent = parent || null;
    if (this._parent) this._parent.childs.add(this);
  }

  get childs() {
    return this._childs;
  }
  set childs(childs) {
    if (childs && !(childs instanceof GameList)) return;
    if (this._childs) for (const child of this._childs) child.parent = null;
    this._childs = childs || new GameList(`${this.name}Childs`);
    if (this._childs) for (const child of this._childs) child.parent = this;
  }

  get onInit() {
    return this._onInit;
  }
  set onInit(onInit) {
    if (typeof onInit === "function") this._onInit = onInit;
  }

  get onUpdate() {
    return this._onUpdate;
  }
  set onUpdate(onUpdate) {
    if (typeof onUpdate === "function") this._onUpdate = onUpdate;
  }

  static isSuperClassOf(constructor) {
    return (
      typeof constructor === "function" &&
      (constructor === GameObject ||
        constructor.prototype instanceof GameObject)
    );
  }

  center(relatedShape = this.parent, horiz = true, vert = true) {
    if (!(relatedShape instanceof Shape)) relatedShape = this.parent;
    super.center(relatedShape || this.game, horiz, vert);
  }

  overlaps(relatedGameObj, fully = false, horiz = true, vert = true) {
    if (relatedGameObj instanceof GameObject) {
      return super.overlaps(relatedGameObj, fully, horiz, vert);
    } else if (relatedGameObj instanceof GameList) {
      for (const gObj of relatedGameObj)
        if (this.overlaps(gObj, fully, horiz, vert)) return true;
      return false;
    }
  }

  drawDistance(relatedGameObj) {
    if (!(relatedGameObj instanceof GameObject)) return;
    const { x, y } = relatedGameObj.globalPosition;
    const ctx = this.game.$context;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(this.globalPosition.x, this.globalPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  draw() {
    if (this.hidden) return;
    const ctx = this.game.$context;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(
      this.$truePosition.x,
      this.$truePosition.y,
      this.size.w,
      this.size.h
    );
    ctx.fill();
    ctx.closePath();
    for (const child of this.childs) child.draw();
  }
}
