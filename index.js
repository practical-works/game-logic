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

    // [ Grid ]
    game.newGrid({
      name: "grid",
      cell: {
        color: "forestGreen",
        size: { w: 32, h: 32 },
        margin: 5,
      },
      division: { columns: 10, rows: 10 },
      center: true,
    });

    // [ Field ]
    game.newObj({
      name: "field",
      parent: game.obj("map"),
      color: "skyBlue",
      size: { w: 128, h: 128 },
      position: { y: 32 },
      centerX: true,
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
      parent: game.obj("map"),
      color: "indianRed",
      size: { w: 32, h: 32 },
      hotspot: { x: 16, y: 16 },
      position: { x: game.obj("map").size.w - 32, y: 32 },
    });

    // [ Cursor Text ]
    const cursorTxt = game.newObj({
      name: "cursorTxt",
      type: "text",
      color: "#FFD580",
      font: "20px consolas",
    });

    // Remember objects initial colors
    for (const obj of game.objs) obj.data.initColor = obj.color;
  },

  onUpdate(game) {
    // Grab objects
    const { map, field, actor, enemy, cursorTxt, debugTxt } = game.objs.toObj();
    const key = game.input.key.bind(game.input);
    const mouse = game.input.mouse.bind(game.input);
    const cursor = game.input.cursor;

    // Control actor
    if (key("ArrowRight")) actor.moveX(3);
    if (key("ArrowLeft")) actor.moveX(-3);
    if (key("ArrowUp")) actor.moveY(-3);
    if (key("ArrowDown")) actor.moveY(3);

    // Control map
    if (key("KeyD")) map.moveX(1);
    if (key("KeyA")) map.moveX(-1);
    if (key("KeyW")) map.moveY(-1);
    if (key("KeyS")) map.moveY(1);

    // ...
    if (actor.overlaps(field)) field.color = "darkRed";
    else field.color = field.data.initColor;

    // Display cursor position
    cursorTxt.text = `${cursor.x},${cursor.y} 🐭`;
    cursorTxt.position.x = game.size.w - cursorTxt.size.w - 8;
    cursorTxt.position.y = game.size.h - cursorTxt.size.h - 8;

    // Highlight game objects on cursor hover
    map.color = map.overlapsPoint(cursor) ? "green" : map.data.initColor;
    actor.color = actor.overlapsPoint(cursor) ? "yellow" : actor.data.initColor;
    enemy.color = enemy.overlapsPoint(cursor) ? "red" : enemy.data.initColor;

    // Drag game objects with mouse
    for (const obj of game.objs)
      if (mouse("left") && obj.overlapsPoint(cursor)) obj.sync(cursor);
      else obj.unsync();

    // Draw all game objects
    game.draw();
  },
});
