export default function actor(game) {
  const map = game.obj("map");
  const blocks = game.obj("blocks");
  const key = game.input.key.bind(game.input);
  const actor = game.newObj({
    name: "actor",
    parent: map,
    color: "#ea4f36",
    size: { w: 32, h: 32 },
    hotspot: { x: 16, y: 16 },
    center: true,
  });
  actor.data.movement = {
    axe: { horizontal: false, vertical: false },
    speed: { x: 0, y: 0 },
    direction: { x: 1, y: -1 },
    maxSpeed: { x: 5, y: 5 },
    acceleration: { x: 0.1, y: 0.1 },
    deceleration: { x: 0.05, y: 0.05 },
    canMove() {
      return actor.overlaps(map, true) && !actor.overlaps(blocks.childs);
    },
    control() {
      if (key("ArrowRight")) {
        this.axe.horizontal = true;
        this.direction.x = 1;
      } else if (key("ArrowLeft")) {
        this.axe.horizontal = true;
        this.direction.x = -1;
      } else this.axe.horizontal = false;

      if (key("ArrowUp")) {
        this.axe.vertical = true;
        this.direction.y = -1;
      } else if (key("ArrowDown")) {
        this.axe.vertical = true;
        this.direction.y = 1;
      } else this.axe.vertical = false;

      if (this.axe.horizontal) {
        if (this.speed.x < this.maxSpeed.x) this.speed.x += this.acceleration.x;
      } else {
        if (this.speed.x > 0) this.speed.x -= this.deceleration.x;
        else this.speed.x = 0;
      }
      if (this.axe.vertical) {
        if (this.speed.y < this.maxSpeed.y) this.speed.y += this.acceleration.y;
      } else {
        if (this.speed.y > 0) this.speed.y -= this.deceleration.y;
        else this.speed.y = 0;
      }

      if (this.speed.x > 0)
        if (!actor.moveXIf(this.direction.x * this.speed.x, this.canMove))
          this.speed.x = 0;
      if (this.speed.y > 0)
        if (!actor.moveYIf(this.direction.y * this.speed.y, this.canMove))
          this.speed.y = 0;
    },
  };
  actor.data.health = {
    max: 100,
    current: 100,
    get ratio() {
      return this.current / this.max;
    },
    get percent() {
      return Math.floor(this.ratio * 100);
    },
    add(hp) {
      if (isNaN(hp)) return;
      if (this.current < this.max) this.current += 1;
    },
    sub(hp) {
      if (isNaN(hp)) return;
      if (this.current > 0) this.current -= 1;
    },
  };
  actor.data.experience = {
    current: 0,
    relativeCurrent: 0,
    level: 1,
    get min() {
      return this.calculate(this.level);
    },
    get max() {
      return this.calculate(this.level + 1);
    },
    get relativeMax() {
      return this.max - this.min;
    },
    get remaining() {
      return this.max - this.current;
    },
    get ratio() {
      return this.current / this.max;
    },
    get relativeRatio() {
      return this.relativeCurrent / this.relativeMax;
    },
    add(exp) {
      if (isNaN(exp)) return;
      this.current += exp;
      this.relativeCurrent += exp;
      if (this.remaining <= 0) {
        this.relativeCurrent = Math.abs(this.remaining);
        this.level++;
      }
    },
    calculate(level) {
      return 100 * (level * level - 1);
    },
  };
  return actor;
}
