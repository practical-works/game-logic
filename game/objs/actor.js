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
    speed: 3,
    canMove() {
      return actor.overlaps(map, true) && !actor.overlaps(blocks.childs);
    },
    control() {
      if (key("ArrowRight")) actor.moveXIf(this.speed, this.canMove);
      if (key("ArrowLeft")) actor.moveXIf(-this.speed, this.canMove);
      if (key("ArrowUp")) actor.moveYIf(-this.speed, this.canMove);
      if (key("ArrowDown")) actor.moveYIf(this.speed, this.canMove);
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
