import Game from "./Game.js";
import GameList from "./GameList.js";

export default class GameObject {
  static _count = 0;
  _id = -1;
  _game = null;
  _name = "";
  _size = { w: 32, h: 32 };
  _hotspot = { x: 0, y: 0 };
  _position = { x: 0, y: 0 };
  _color = "white";
  _parent = null;
  _childs = new GameList();

  constructor(game, options = {}) {
    const { name, size, hotspot, position, color } = options;
    const { parent, childs } = options;
    GameObject._count++;
    this._id = GameObject._count - 1;
    this.game = game;
    this.name = name;
    this.size = size;
    this.hotspot = hotspot;
    this.position = position;
    this.color = color;
    this.parent = parent;
    this.childs = childs;
    this.childs.onAdd = gObj => gObj.parent = this;
    this.childs.onRemove = gObj => gObj.parent = null;
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

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  get size() {
    return this._size;
  }
  set size(size = {}) {
    const { w, h } = size;
    if (!isNaN(w)) this._size.w = Math.abs(w);
    if (!isNaN(h)) this._size.h = Math.abs(h);
  }

  get hotspot() {
    return this._hotspot;
  }
  set hotspot(hotspot = {}) {
    const { x, y } = hotspot;
    if (!isNaN(x)) this._hotspot.x = x;
    if (!isNaN(y)) this._hotspot.y = y;
  }

  get position() {
    return this._position;
  }
  set position(position = {}) {
    const { x, y } = position;
    if (!isNaN(x)) this._position.x = x;
    if (!isNaN(y)) this._position.y = y;
  }

  get color() {
    return this._color;
  }
  set color(color) {
    this._color = String(color);
  }

  get parent() {
    return this._parent;
  }
  set parent(parent) {
    if (parent && !(parent instanceof GameObject)) return;
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
    this._childs = childs || new GameList();
    if (this._childs) for (const child of this._childs) child.parent = this;
  }

  get $offset() {
    const x = this.parent ? this.parent.position.x : 0;
    const y = this.parent ? this.parent.position.y : 0;
    return { x, y };
  }

  get $truePosition() {
    const x = this.$offset.x + this.position.x - this.hotspot.x;
    const y = this.$offset.y + this.position.y - this.hotspot.y;
    return { x, y };
  }

  draw() {
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
    ctx.beginPath();
  }
}
