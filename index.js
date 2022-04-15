import Game from "./core/Game.js";

const game = new Game({ resolution: { width: 640, height: 480 } });

// [Map]
const map = game.createObject("map", {
  color: "green",
  size: { width: 500, height: 400 },
  centerPosition: true,
});

// [Mosaic]
game.createGrid("box", {
  position: map.position,
  columns: 5,
  rows: 4,
});
const padding = 5;
for (let i = 0; i < 13; i++) {
  for (let j = 0; j < 10; j++) {
    const box = game.createObject(`box${i}x${j}`, {
      color: "grey",
      size: { width: 32, height: 32 },
      position: { x: map.position.x, y: map.position.y },
    });
    box.move(
      padding + i * (box.size.width + padding),
      padding + j * (box.size.height + padding)
    );
  }
}

// [Actor]
game.createObject("actor", {
  color: "#00F",
  size: { width: 32, height: 32 },
  centerHotPoint: true,
  centerPosition: map,
});

// [Enemy]
game.createObject("enemy", {
  color: "red",
  size: { width: 32, height: 32 },
  centerHotPoint: true,
  position: map.topRightPosition,
}).move(-64, 64);

// [Loop]
game.update((game) => {
  if (game.input.getKey("ArrowUp")) game.objects.actor.move(0, -3);
  if (game.input.getKey("ArrowDown")) game.objects.actor.move(0, 3);
  if (game.input.getKey("ArrowRight")) game.objects.actor.move(3);
  if (game.input.getKey("ArrowLeft")) game.objects.actor.move(-3);
  game.drawObjects();
});
