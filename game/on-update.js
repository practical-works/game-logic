export default function onUpdate(game) {
  // Grab game objects
  const gameObjs = game.objs.toObj();
  const { map, blocks, field0, field1 } = gameObjs;
  const { actor, enemy, healthBar, cursorTxt } = gameObjs;
  const key = game.input.key.bind(game.input);
  const mouse = game.input.mouse.bind(game.input);
  const cursor = game.input.cursor;

  // Control actor with keyboard
  actor.data.movement.control();

  // Control map with keyboard
  map.data.movement.control();

  // Highlight fields on actor step
  field0.color = actor.overlaps(field0) ? "darkRed" : field0.data.initColor;
  field1.color = field1.overlaps(actor) ? "darkRed" : field1.data.initColor;

  // Display health bar
  healthBar.data.display();

  // Display cursor position text
  cursorTxt.data.display();

  // Highlight game objects on cursor hover
  map.color = map.overlapsPoint(cursor) ? "green" : map.data.initColor;
  actor.color = actor.overlapsPoint(cursor) ? "yellow" : actor.data.initColor;
  enemy.color = enemy.overlapsPoint(cursor) ? "red" : enemy.data.initColor;

  // Drag game objects with mouse
  for (const gObj of game.objs)
    if (mouse("left") && gObj.overlapsPoint(cursor)) gObj.sync(cursor);
    else gObj.unsync();

  // Damage actor on enemy touch
  if (actor.overlaps(enemy))
    if (actor.data.health.current > 0) actor.data.health.current -= 1;

  // Draw all game objects
  game.draw();

  // Draw distance between actor and enemy
  actor.drawDistance(enemy);
}