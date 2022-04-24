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
    const { name, data, size, hotspot, position, color, hidden } = options;
    const { parent, childs, centerX, centerY, center } = options;
    GameObject._count++;
    this._id = GameObject._count - 1;
    this.game = game;
    this.name = name || `unamedGameObject${this.id}`;
    this.data = data;
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
    return this._hidden;
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

  setPosition(x, y) {
    return (this.position = { x, y });
  }

  setGlobalPosition(x, y) {
    return (this.globalPositionposition = { x, y });
  }

  sync(relatedPoint) {
    if (!relatedPoint) return;
    if (!this.__initialRelatedPoint)
      this.__initialRelatedPoint = { ...relatedPoint };
    if (!this.__initialGlobalPosition)
      this.__initialGlobalPosition = { ...this.globalPosition };
    const x =
      this.__initialGlobalPosition.x +
      relatedPoint.x -
      this.__initialRelatedPoint.x;
    const y =
      this.__initialGlobalPosition.y +
      relatedPoint.y -
      this.__initialRelatedPoint.y;
    this.globalPosition = { x, y };
  }
  unsync() {
    delete this.__initialRelatedPoint;
    delete this.__initialGlobalPosition;
  }

  moveIf(x, y, conditionFn) {
    if (!conditionFn || typeof conditionFn !== "function")
      conditionFn = () => true;
    const totalSteps = { x: 0, y: 0 };
    const step = { x: 0, y: 0 };
    const performedSteps = { x: 0, y: 0 };
    if (x) {
      totalSteps.x = Math.abs(x);
      step.x = x / totalSteps.x;
      while (performedSteps.x < totalSteps.x) {
        performedSteps.x++;
        this.moveX(step.x);
        if (!conditionFn(performedSteps)) {
          this.moveX(-step.x);
          performedSteps.x--;
          break;
        }
      }
    }
    if (y) {
      totalSteps.y = Math.abs(y);
      step.y = y / totalSteps.y;
      while (performedSteps.y < totalSteps.y) {
        performedSteps.y++;
        this.moveY(step.y);
        if (!conditionFn(performedSteps)) {
          this.moveY(-step.y);
          performedSteps.y--;
          break;
        }
      }
    }
    return performedSteps;
  }
  moveXIf(x, conditionFn) {
    return this.moveIf(x, 0, conditionFn).x;
  }
  moveYIf(y, conditionFn) {
    return this.moveIf(0, y, conditionFn).y;
  }

  moveWithTween(x, y, currentTime, duration, tweenFn) {
    if (isNaN(currentTime) || currentTime < 0) currentTime = 0;
    if (isNaN(duration) || duration < 0) duration = 1000;
    if (currentTime > duration) currentTime = duration;
    if (tweenFn !== "function")
      tweenFn = (x, y, currentTime, duration) => ({
        x: (x * currentTime) / duration,
        y: (y * currentTime) / duration,
      });
    const step = tweenFn(x, y, currentTime, duration);
    this.move(step.x, step.y);
  }

  move(x = 0, y = 0) {
    if (x && !isNaN(x)) this.position.x += x;
    if (y && !isNaN(y)) this.position.y += y;
    return { x, y };
  }
  moveX(x) {
    return this.move(x, 0).x;
  }
  moveY(y) {
    return this.move(0, y).y;
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

  overlaps(relatedGameObj, fully = false, horiz = true, vert = true) {
    if (relatedGameObj instanceof GameObject) {
      const { topLeft, topRight, bottomLeft } = relatedGameObj;
      const collidesHorizontally = fully
        ? (topLeft.x <= this.topLeft.x && topRight.x >= this.topRight.x) ||
          (this.topLeft.x <= topLeft.x && this.topRight.x >= topRight.x)
        : topLeft.x <= this.topRight.x && topRight.x >= this.topLeft.x;
      const collidesVertically = fully
        ? (topLeft.y <= this.topLeft.y && bottomLeft.y >= this.bottomLeft.y) ||
          (this.topLeft.y <= topLeft.y && this.bottomLeft.y >= bottomLeft.y)
        : topLeft.y <= this.bottomLeft.y && bottomLeft.y >= this.topLeft.y;
      if (horiz && vert) return collidesHorizontally && collidesVertically;
      else if (horiz) return collidesHorizontally;
      else if (vert) return collidesVertically;
    } else if (relatedGameObj instanceof GameList) {
      for (const gObj of relatedGameObj)
        if (this.overlaps(gObj, fully, horiz, vert)) return true;
      return false;
    }
  }
  overlapsX(relatedGameObj, fully) {
    return this.overlaps(relatedGameObj, fully, true, false);
  }
  overlapsY(relatedGameObj, fully) {
    return this.overlaps(relatedGameObj, fully, false, true);
  }

  overlapsPoint(point, horiz = true, vert = true) {
    if (!point) return false;
    const { x = 0, y = 0 } = point;
    const collidesHorizontally = x >= this.topLeft.x && x <= this.topRight.x;
    const collidesVertically = y >= this.topLeft.y && y <= this.bottomLeft.y;
    if (horiz && vert) return collidesHorizontally && collidesVertically;
    else if (horiz) return collidesHorizontally;
    else if (vert) return collidesVertically;
  }

  distance(relatedGameObj) {
    if (!(relatedGameObj instanceof GameObject)) return NaN;
    const { x, y } = relatedGameObj.position;
    const dx = Math.abs(x - this.position.x);
    const dy = Math.abs(y - this.position.y);
    return Math.sqrt(dx * dx + dy * dy);
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
  }
}
