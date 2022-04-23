export default function onUpdate(game) {
  // Grab game objects
  const gameObjs = game.objs.asObject;
  const { map, blocks, field0, field1 } = gameObjs;
  const { actor, enemy, healthBar, levelBar, cursorTxt } = gameObjs;
  const key = game.input.key.bind(game.input);
  const mouse = game.input.mouse.bind(game.input);
  const cursor = game.input.cursor;

  // Control actor with keyboard
  actor.data.movement.control();

  // Control map with keyboard
  map.data.movement.control();

  // Highlight fields and give EXP on actor step
  if (actor.overlaps(field0)) {
    field0.color = "#4d9be6";
    actor.data.experience.add(1);
  } else field0.color = field0.data.initColor;
  if (actor.overlaps(field1)) {
    field1.color = "#0b5e65";
    actor.data.health.add(1);
  }else field1.color = field1.data.initColor;

  // Display health bar
  healthBar.data.display();

  // Display level bar
  levelBar.data.display();

  // Display cursor position text
  cursorTxt.data.display();

  // Highlight game objects on cursor hover
  map.color = map.overlapsPoint(cursor) ? "#54485e" : map.data.initColor;
  actor.color = actor.overlapsPoint(cursor) ? "#f79617" : actor.data.initColor;
  enemy.color = enemy.overlapsPoint(cursor) ? "#e83b3b" : enemy.data.initColor;

  // Drag game objects with mouse
  for (const gObj of game.objs.asReverse) {
    if (mouse("left") && gObj.overlapsPoint(cursor)) {
      gObj.sync(cursor);
      break;
    } else gObj.unsync();
  }

  // Damage actor on enemy touch
  if (actor.overlaps(enemy)) actor.data.health.sub(1);

  // Draw all game objects
  game.draw();

  // Draw distance between actor and enemy
  actor.drawDistance(enemy);
}
