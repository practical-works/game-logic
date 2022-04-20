import Game from "./core/Game.js";

new Game({
  title: "New Game",
  size: { w: 640, h: 480 },

  onInit(game) {
    // [ Map ]
    game.newObj({
      name: "map",
      color: "darkGreen",
      size: { w: 400, h: 400 },
      center: true,
    });

    // [ Actor ]
    game.newObj({
      name: "actor",
      parent: game.obj("map"),
      color: "orange",
      size: { w: 32, h: 32 },
      hotspot: { x: 16, y: 16 },
      center: true,
    });

    // [ Enemy ]
    game.newObj({
      name: "enemy",
      parent: game.objs.map,
      color: "indianRed",
      size: { w: 32, h: 32 },
      hotspot: { x: 16, y: 16 },
      position: { x: game.objs.map.size.w - 32, y: 32 },
    });

    // [ Cursor Text ]
    const cursorTxt = game.newObj({
      name: "cursorTxt",
      type: "text",
      color: "#FFD580",
      font: "20px consolas",
    });
  },

  onUpdate(game) {
    // Grab defined game objects
    const { map, actor, enemy, cursorTxt, debugTxt } = game.objs;

    // Control actor
    if (game.input.key("ArrowRight")) actor.moveX(3);
    if (game.input.key("ArrowLeft")) actor.moveX(-3);
    if (game.input.key("ArrowUp")) actor.moveY(-3);
    if (game.input.key("ArrowDown")) actor.moveY(3);

    // Control map
    if (game.input.key("KeyD")) map.moveX(1);
    if (game.input.key("KeyA")) map.moveX(-1);
    if (game.input.key("KeyW")) map.moveY(-1);
    if (game.input.key("KeyS")) map.moveY(1);

    // Display cursor position
    const cursor = game.input.cursor;
    cursorTxt.text = `${cursor.x},${cursor.y} 🐭`;
    cursorTxt.position = {
      x: game.size.w - cursorTxt.size.w - 8,
      y: game.size.h - cursorTxt.size.h - 8,
    };

    // Highlight game objects on cursor hover
    if (map.overlapsPoint(cursor)) map.color = "green";
    else map.color = "darkGreen";
    if (actor.overlapsPoint(cursor)) actor.color = "yellow";
    else actor.color = "orange";
    if (enemy.overlapsPoint(cursor)) enemy.color = "red";
    else enemy.color = "indianRed";

    // Drag game objects with mouse
    if (actor.overlapsPoint(cursor) && game.input.mouse("left"))
      actor.globalPosition = { x: cursor.x, y: cursor.y };
    if (enemy.overlapsPoint(cursor) && game.input.mouse("left"))
      enemy.globalPosition = { x: cursor.x, y: cursor.y };

    // Draw all game objects
    game.draw();
  },
});
