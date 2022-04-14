import Game from "./core/Game.js";

const game = new Game({ resolution: { width: 640, height: 480 } });

// [Map]
game.createObject("map", {
  color: "green",
  size: { width: 500, height: 400 },
  centerHotPoint: true,
  centerPosition: true
});

// [Actor]
game.createObject("actor", {
  color: "red",
  size: { width: 32, height: 32 },
  centerHotPoint: true,
  centerPosition: true
});

// [Loop]
game.update(game => {
  if (game.input.getKey("ArrowUp")) game.objects.actor.move(0, -3);
  if (game.input.getKey("ArrowDown")) game.objects.actor.move(0, 3);
  if (game.input.getKey("ArrowRight")) game.objects.actor.move(3);
  if (game.input.getKey("ArrowLeft")) game.objects.actor.move(-3);
  game.drawObjects();
});
