export default function actor(game) {
  const map = game.obj("map");
  const blocks = game.obj("blocks");
  const key = game.input.key.bind(game.input);
  const actor = game.newObj({
    name: "actor",
    parent: map,
    color: "orange",
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
    max: 1000,
    current: 1000,
    getRatio() {
      return this.current / this.max;
    },
    getPercent() {
      return Math.floor(this.getRatio() * 100);
    },
  };
  return actor;
}
