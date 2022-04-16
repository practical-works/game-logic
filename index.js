import Game from "./core/Game.js";

const game = new Game({ resolution: { width: 640, height: 480 } });

// [Map]
const map = game.createObject("map", {
  color: "darkGreen",
  size: { width: 430, height: 430 },
  centerPosition: true,
});

// [Pattern]
game.createGrid("pattern", {
  cell: {
    color: "forestGreen",
    size: { width: 32, height: 32 },
    margin: 10,
  },
  size: {
    columns: Math.round(map.size.width / 42),
    rows: Math.round(map.size.height / 42),
  },
  position: map.position,
});

// [Enemy]
game
  .createObject("enemy", {
    color: "indianRed",
    size: { width: 32, height: 32 },
    centerHotPoint: true,
    position: map.topRightPosition,
  })
  .move(-68, 68);

// [Actor]
game.createObject("actor", {
  color: "orange",
  size: { width: 32, height: 32 },
  centerHotPoint: true,
  centerPosition: map,
});

// [Text]
const pointerInfos = game.createObject("pointerInfos", {
  type: "text",
  color: "yellow",
});

// [Loop]
game.update((game) => {
  if (game.input.getKey("ArrowUp")) game.objects.actor.move(0, -3);
  if (game.input.getKey("ArrowDown")) game.objects.actor.move(0, 3);
  if (game.input.getKey("ArrowRight")) game.objects.actor.move(3);
  if (game.input.getKey("ArrowLeft")) game.objects.actor.move(-3);
  if (game.objects.actor.overlapsPoint(game.input.pointer))
    game.objects.actor.color = "darkRed";
  else game.objects.actor.color = "orange";
  pointerInfos.text = `${game.input.pointer.x},${game.input.pointer.y} 🐭`;
  pointerInfos.position = {
    x: game.resolution.width - pointerInfos.textWidth - 10,
    y: game.resolution.height - 10,
  };
  game.drawObjects();
});
