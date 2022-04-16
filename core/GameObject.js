export default class GameObject {
  game = null;
  name = "gameObject";
  type = "rectangle";
  text = "";
  font = "20px consolas";
  color = "white";
  size = { width: 32, height: 32 };
  position = { x: 0, y: 0 };
  hotPoint = { x: 0, y: 0 };

  constructor(game, options = {}) {
    const { name, type, text, font, color, size, position, hotPoint } = options;
    const { centerHotPoint = false, centerPosition = false } = options;
    if (game) this.game = game;
    if (name) this.name = name;
    if (type) this.type = type;
    this.text = text || this.name;
    if (font) this.font = font;
    if (color) this.color = color;
    if (size) {
      const { width = 0, height = 0 } = size;
      this.size = { width, height };
    }
    if (position) {
      const { x = 0, y = 0 } = position;
      this.position = { x, y };
    }
    if (hotPoint) {
      const { x = 0, y = 0 } = hotPoint;
      this.hotPoint = { x, y };
    }
    if (centerHotPoint) this.centerHotPoint();
    if (centerPosition) this.centerPosition(centerPosition);
  }

  get hotPointPosition() {
    const x = this.position.x - this.hotPoint.x;
    const y = this.position.y - this.hotPoint.y;
    return { x, y };
  }

  get topLeftPosition() {
    const x = this.position.x;
    const y = this.position.y;
    return { x, y };
  }

  get topRightPosition() {
    const x = this.position.x + this.size.width;
    const y = this.position.y;
    return { x, y };
  }

  get bottomLeftPosition() {
    const x = this.position.x;
    const y = this.position.y + this.size.height;
    return { x, y };
  }

  get bottomRightPosition() {
    const x = this.position.x + this.size.width;
    const y = this.position.y + this.size.height;
    return { x, y };
  }

  centerHotPoint() {
    this.hotPoint.x = this.size.width * 0.5;
    this.hotPoint.y = this.size.height * 0.5;
    return this;
  }

  centerPosition(relatedGameObject) {
    if (!(relatedGameObject instanceof GameObject)) {
      relatedGameObject = { size: {}, position: { x: 0, y: 0 } };
      relatedGameObject.size.width = this.game.resolution.width;
      relatedGameObject.size.height = this.game.resolution.height;
    }
    this.position.x =
      relatedGameObject.position.x +
      (relatedGameObject.size.width - this.size.width) * 0.5 +
      this.hotPoint.x;
    this.position.y =
      relatedGameObject.position.y +
      (relatedGameObject.size.height - this.size.height) * 0.5 +
      this.hotPoint.y;
    return this;
  }

  move(x = 0, y = 0) {
    this.position.x += x;
    this.position.y += y;
    return this;
  }

  overlapsPoint(point = {}) {
    const { x = 0, y = 0 } = point;
    // return (
    //   x >= this.topLeftPosition.x &&
    //   x <= this.topRightPosition.x &&
    //   y >= this.topLeftPosition.y &&
    //   y <= this.bottomLeftPosition.y
    // );
    // ?????????????
  }

  draw() {
    this.game.$context.beginPath();
    this.game.$context.fillStyle = this.color;
    switch (this.type) {
      case "rectangle":
        this.game.$context.rect(
          this.hotPointPosition.x,
          this.hotPointPosition.y,
          this.size.width,
          this.size.height
        );
        break;
      case "text":
        this.game.$context.font = this.font;
        const textMetrics = this.game.$context.measureText(this.text);
        this.textWidth = textMetrics.width;
        this.game.$context.fillText(
          this.text,
          this.hotPointPosition.x,
          this.hotPointPosition.y
        );
      default:
        break;
    }
    this.game.$context.fill();
    this.game.$context.beginPath();
    return this;
  }
}
