import Game from "../Game.js";
import GameList from "../GameList.js";
import Rectangle from "../geometry/Rectangle.js";

export default class GameObject extends Rectangle {
  static _count = 0;
  _id = -1;
  _game = null;
  _data = {};
  _name = "";
  _color = "white";
  _sprites = [];
  _images = [];
  _parent = null;
  _childs = new GameList();
  _hidden = false;
  _animationFrame = 0;
  _loopAnimation = false;
  _animationSpeed = 100;
  _animationProgress = 0;
  _onInit = (gObj) => undefined;
  _onUpdate = (gObj) => undefined;

  constructor(game, options = {}) {
    super(options);
    const { name, data, color, sprites, sprite, hidden } = options;
    const { parent, childs, centerX, centerY, center } = options;
    GameObject._count++;
    this._id = GameObject._count - 1;
    this.game = game;
    this.name = name || `unamed${this.id}`;
    this.data = data;
    this.color = color;
    this.sprites = sprites || sprite;
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

  get sprite() {
    return this._sprites[0];
  }
  set sprite(sprite) {
    if (typeof sprite !== "string") return;
    this._sprites.splice(1, this._sprites.length);
    this._images.splice(1, this._images.length);
    this._images[0] = new Image();
    this._images[0].src = this._sprites[0] = sprite;
  }

  get sprites() {
    return this._sprites;
  }
  set sprites(sprites) {
    if (!Array.isArray(sprites)) return;
    this._sprites.splice(0, this._sprites.length);
    this._images.splice(0, this._images.length);
    for (const sprite of sprites) {
      if (typeof sprite !== "string") continue;
      this._sprites.push(sprite);
      const image = new Image();
      image.src = sprite;
      this._images.push(image);
    }
  }

  get hidden() {
    return this._hidden;
  }
  set hidden(hidden) {
    this._hidden = Boolean(hidden);
  }

  get loopAnimation() {
    return this._loopAnimation;
  }
  set loopAnimation(loopAnimation) {
    this._loopAnimation = Boolean(loopAnimation);
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

  get animationSpeed() {
    return this._animationSpeed;
  }
  set animationSpeed(animationSpeed) {
    if (isNaN(animationSpeed)) return;
    if (animationSpeed < 0) animationSpeed = 0;
    if (animationSpeed > 100) animationSpeed = 100;
    this._animationSpeed = animationSpeed;
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

  center(relatedRectangle = this.parent, horiz = true, vert = true) {
    if (!(relatedRectangle instanceof Rectangle))
      relatedRectangle = this.parent;
    super.center(relatedRectangle || this.game, horiz, vert);
  }

  overlaps(relatedGameObj, fully = false, horiz = true, vert = true) {
    if (relatedGameObj instanceof GameObject)
      return super.overlaps(relatedGameObj, fully, horiz, vert);
    const gameList = new GameList("", relatedGameObj);
    if (!gameList.length) return false;
    for (const gObj of gameList)
      if (this.overlaps(gObj, fully, horiz, vert)) return true;
    return false;
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
    if (this._images.length) {
      ctx.drawImage(
        this._images[this._animationFrame],
        this.$truePosition.x,
        this.$truePosition.y
      );
      if (this.animationSpeed < 100 && this._animationProgress < 100)
        this._animationProgress += this.animationSpeed;
      else {
        this._animationProgress = 0;
        if (this.loopAnimation)
          this._animationFrame =
            (this._animationFrame + 1) % this._images.length;
        else if (this._animationFrame < this._images.length - 1)
          this._animationFrame++;
      }
    } else {
      ctx.fillStyle = this.color;
      ctx.rect(
        this.$truePosition.x,
        this.$truePosition.y,
        this.size.w,
        this.size.h
      );
      ctx.fill();
    }
    ctx.closePath();
    for (const child of this.childs) child.draw();
  }
}
