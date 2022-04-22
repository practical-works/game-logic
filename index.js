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

    // [ Fields ]
    for (let i = 0; i < 2; i++)
      game.newObj({
        name: `field${i + 1}`,
        parent: game.obj("map"),
        color: "skyBlue",
        size: { w: 128, h: 64 },
        centerX: true,
      });
    game.obj("field1").moveY(33);
    game.obj("field2").moveY(game.obj("map").size.h - 97);

    // [ Grid ]
    game.newGrid({
      name: "blocks",
      cell: {
        color: "forestGreen",
        size: { w: 32, h: 32 },
        margin: 41,
      },
      division: { columns: 6, rows: 6 },
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
      data: {
        speed: 3,
      },
    });

    // [ Enemy ]
    game.newObj({
      name: "enemy",
      parent: game.obj("map"),
      color: "indianRed",
      size: { w: 32, h: 32 },
      hotspot: { x: 16, y: 16 },
      position: { x: game.obj("map").size.w - 52, y: 52 },
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
    const { map, blocks, field1, field2, actor, enemy, cursorTxt, debugTxt } =
      game.objs.toObj();
    const key = game.input.key.bind(game.input);
    const mouse = game.input.mouse.bind(game.input);
    const cursor = game.input.cursor;

    // Define obstacles for actor
    const actorCanMove = () =>
      actor.overlaps(map, true) && !actor.overlaps(blocks.childs);

    // Control actor
    const speed = actor.data.speed;
    if (key("ArrowRight")) actor.moveXIf(speed, actorCanMove);
    if (key("ArrowLeft")) actor.moveXIf(-speed, actorCanMove);
    if (key("ArrowUp")) actor.moveYIf(-speed, actorCanMove);
    if (key("ArrowDown")) actor.moveYIf(speed, actorCanMove);

    // Control map
    if (key("KeyD")) map.moveX(1);
    if (key("KeyA")) map.moveX(-1);
    if (key("KeyW")) map.moveY(-1);
    if (key("KeyS")) map.moveY(1);

    // Highlight fields on actor step
    field1.color = actor.overlaps(field1) ? "darkRed" : field1.data.initColor;
    field2.color = field2.overlaps(actor) ? "darkRed" : field2.data.initColor;

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

    // Draw distance between actor and enemy
    actor.drawDistance(enemy);
  },
});
