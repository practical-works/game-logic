import Size from "./Size.js";
import Position from "./Position.js";

export default class Shape {
  _size = new Size();
  _hotspot = new Position();
  _position = new Position();

  constructor(shape = {}) {
    const { size, hotspot, position } = shape;
    this.size = size;
    this.hotspot = hotspot;
    this.position = position;
  }

  get size() {
    return this._size;
  }
  set size(size) {
    this._size = new Size(size);
  }

  get hotspot() {
    return this._hotspot;
  }
  set hotspot(hotspot) {
    this._hotspot = new Position(hotspot);
  }

  get position() {
    return this._position;
  }
  set position(position) {
    this._position = new Position(position);
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

  sync(relatedPoint = { x: 0, y: 0 }) {
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

  center(relatedShape = {}, horiz = true, vert = true) {
    const { size } = relatedShape;
    if (!size) return;
    const { w, h } = size;
    if (horiz) this.position.x = (w - this.size.w) * 0.5 + this.hotspot.x;
    if (vert) this.position.y = (h - this.size.h) * 0.5 + this.hotspot.y;
  }
  centerX(relatedShape) {
    this.center(relatedShape, true, false);
  }
  centerY(relatedShape) {
    this.center(relatedShape, false, true);
  }

  overlaps(relatedShape = {}, fully = false, horiz = true, vert = true) {
    const { topLeft, topRight, bottomLeft } = relatedShape;
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
  }
  overlapsX(relatedShape, fully) {
    return this.overlaps(relatedShape, fully, true, false);
  }
  overlapsY(relatedShape, fully) {
    return this.overlaps(relatedShape, fully, false, true);
  }

  overlapsPoint(point = {}, horiz = true, vert = true) {
    const { x = 0, y = 0 } = point;
    const collidesHorizontally = x >= this.topLeft.x && x <= this.topRight.x;
    const collidesVertically = y >= this.topLeft.y && y <= this.bottomLeft.y;
    if (horiz && vert) return collidesHorizontally && collidesVertically;
    else if (horiz) return collidesHorizontally;
    else if (vert) return collidesVertically;
  }

  distance(relatedShape = {}) {
    const { position } = relatedShape;
    if (!position) return NaN;
    const { x, y } = position;
    const dx = Math.abs(x - this.position.x);
    const dy = Math.abs(y - this.position.y);
    return Math.sqrt(dx * dx + dy * dy);
  }
}
