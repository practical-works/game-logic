import Game from "./Game.js";
import GameList from "./GameList.js";

export default class GameObject {
  static _count = 0;
  _id = -1;
  _game = null;
  _data = {};
  _name = "";
  _size = { w: 32, h: 32 };
  _hotspot = { x: 0, y: 0 };
  _position = { x: 0, y: 0 };
  _color = "white";
  _parent = null;
  _childs = new GameList();
  _hidden = false;

  constructor(game, options = {}) {
    const { name, size, hotspot, position, color, hidden } = options;
    const { parent, childs, centerX, centerY, center } = options;
    GameObject._count++;
    this._id = GameObject._count - 1;
    this.game = game;
    this.name = name || `unamedGameObject${this.id}`;
    this.size = size;
    this.hotspot = hotspot;
    this.position = position;
    this.color = color;
    this.hidden = hidden;
    this.parent = parent;
    this.childs = childs;
    this.childs.onAdd = (gObj) => (gObj.parent = this);
    this.childs.onRemove = (gObj) => (gObj.parent = null);
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
    if (color) this._color = String(color);
  }

  get hidden() {
    this._hidden;
  }
  set hidden(hidden) {
    this._hidden = Boolean(hidden);
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

  get topLeft() {
    return this.$truePosition;
  }

  get topRight() {
    const x = this.$truePosition.x + this.size.w;
    const y = this.$truePosition.y;
    return { x, y };
  }

  get bottomLeft() {
    const x = this.$truePosition.x;
    const y = this.$truePosition.y + this.size.h;
    return { x, y };
  }

  get bottomRight() {
    const x = this.$truePosition.x + this.size.w;
    const y = this.$truePosition.y + this.size.h;
    return { x, y };
  }

  get globalPosition() {
    const x = this.position.x + this.$offset.x;
    const y = this.position.y + this.$offset.y;
    return { x, y };
  }
  set globalPosition(globalPosition = {}) {
    const { x, y } = globalPosition;
    if (!isNaN(x)) this.position.x = x - this.$offset.x;
    if (!isNaN(y)) this.position.y = y - this.$offset.y;
  }

  get $offset() {
    const x = this.parent ? this.parent.$truePosition.x : 0;
    const y = this.parent ? this.parent.$truePosition.y : 0;
    return { x, y };
  }

  get $truePosition() {
    const x = this.globalPosition.x - this.hotspot.x;
    const y = this.globalPosition.y - this.hotspot.y;
    return { x, y };
  }

  move(x = 0, y = 0) {
    if (x && !isNaN(x)) this.position.x += x;
    if (y && !isNaN(y)) this.position.y += y;
  }
  moveX(x) {
    this.move(x, 0);
  }
  moveY(y) {
    this.move(0, y);
  }

  center(relatedGameObj = this.parent, horiz = true, vert = true) {
    if (!(relatedGameObj instanceof GameObject)) relatedGameObj = this.parent;
    const { position, size } = relatedGameObj || this.game;
    const { x = 0, y = 0 } = position || {};
    const { w, h } = size;
    if (horiz) this.position.x = (w - this.size.w) * 0.5 + this.hotspot.x;
    if (vert) this.position.y = (h - this.size.h) * 0.5 + this.hotspot.y;
  }
  centerX(relatedGameObj) {
    this.center(relatedGameObj, true, false);
  }
  centerY(relatedGameObj) {
    this.center(relatedGameObj, false, true);
  }

  overlapsPoint(point = {}) {
    const { x = 0, y = 0 } = point;
    return (
      x >= this.topLeft.x &&
      x <= this.topRight.x &&
      y >= this.topLeft.y &&
      y <= this.bottomLeft.y
    );
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
  }
}
