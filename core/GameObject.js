export default class GameObject {
  game = null;
  color = "white";
  size = { width: 32, height: 32 };
  position = { x: 0, y: 0 };
  hotPoint = { x: 0, y: 0 };

  constructor(game, options = {}) {
    const { color, size, position, hotPoint } = options;
    const { centerHotPoint = false, centerPosition = false } = options;
    if (game) this.game = game;
    if (color) this.color = color;
    if (size) {
      const { width, height } = size;
      this.size = { width, height };
    }
    if (position) {
      const { x, y } = position;
      this.position = { x, y };
    }
    if (hotPoint) {
      const { x, y } = hotPoint;
      this.hotPoint = { x, y };
    }
    if (centerHotPoint) this.centerHotPoint();
    if (centerPosition) this.centerPosition();
  }

  draw() {
    const context = this.game.$context;
    context.beginPath();
    context.fillStyle = this.color;
    context.rect(
      this.position.x - this.hotPoint.x,
      this.position.y - this.hotPoint.y,
      this.size.width,
      this.size.height
    );
    context.fill();
    context.beginPath();
  }

  centerHotPoint() {
    this.hotPoint.x = this.size.width * 0.5;
    this.hotPoint.y = this.size.height * 0.5;
  }

  centerPosition(relatedGameObject = {}) {
    const {
      width = this.game.resolution.width,
      height = this.game.resolution.height,
    } = relatedGameObject;
    this.position.x = width * 0.5;
    this.position.y = height * 0.5;
  }

  move(x = 0, y = 0) {
    this.position.x += x;
    this.position.y += y;
  }
}
