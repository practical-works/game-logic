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
    const { map, actor, enemy, cursorTxt, debugTxt } = game.objs.toObj();
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

    // Display cursor position
    cursorTxt.text = `${cursor.x},${cursor.y} 🐭`;
    cursorTxt.position.x = game.size.w - cursorTxt.size.w - 8;
    cursorTxt.position.y = game.size.h - cursorTxt.size.h - 8;

    // Highlight game objects on cursor hover
    map.color = map.overlapsPoint(cursor) ? "green" : map.data.initColor;
    actor.color = actor.overlapsPoint(cursor) ? "yellow" : actor.data.initColor;
    enemy.color = enemy.overlapsPoint(cursor) ? "red" : enemy.data.initColor;

    // Drag game objects with mouse
    const leftClick = mouse("left");
    if (leftClick) {
      if (map.overlapsPoint(cursor)) {
        if (!game.data.initCursor) game.data.initCursor = { ...cursor };
        if (!game.data.initMapGlobPos)
          game.data.initMapGlobPos = { ...map.globalPosition };
        const x = game.data.initMapGlobPos.x + cursor.x - game.data.initCursor.x;
        const y = game.data.initMapGlobPos.y + cursor.y - game.data.initCursor.y;
        map.globalPosition = { x, y };
      }
    } else {
      delete game.data.initCursor;
      delete game.data.initMapGlobPos;
    }
    if (actor.overlapsPoint(cursor) && leftClick)
      actor.globalPosition = { x: cursor.x, y: cursor.y };
    if (enemy.overlapsPoint(cursor) && leftClick)
      enemy.globalPosition = { x: cursor.x, y: cursor.y };

    // Draw all game objects
    game.draw();
  },
});
