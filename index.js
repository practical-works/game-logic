import Game from "./core/Game.js";

const game = new Game({
  title: "New Game",
  size: { w: 640, h: 480 },
});

// [map]
game.newObj({
  name: "map",
  color: "darkGreen",
  size: { w: 400, h: 400 },
  position: { x: 100, y: 100 },
});

// [Actor]
game.newObj({
  name: "actor",
  color: "orange",
  size: { w: 32, h: 32 },
  hotspot: { x: 16, y: 16 },
  position: { x: 0, y: 0 },
});

const map = game.objs.map;
const actor = game.objs.actor;

map.childs.add(actor);
// actor.parent = map;

console.log(`Map childs (${map.childs.count}):`, map.childs);
console.log(`Actor childs (${actor.childs.count}):`, actor.childs);

console.log(`Map parent:`, map.parent);
console.log(`Actor parent:`, actor.parent);



// ...
game.drawObjs();
