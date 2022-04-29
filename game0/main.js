import Game from "../core/Game.js";
import Map from "./objects/Map.js";
import Field from "./objects/Field.js";
import Blocks from "./objects/Blocks.js";
import Actor from "./objects/Actor.js";
import Enemy from "./objects/Enemy.js";
import HealthBar from "./objects/HealthBar.js";
import ExperienceBar from "./objects/ExperienceBar.js";
import CursorTxt from "./objects/CursorTxt.js";

new Game({
  title: "Game0",
  color: "#2e222f",
  size: { w: 640, h: 480 },
  onInit(game) {
    const map = game.newObj(Map);
    game.newObj(Field).moveY(33);
    game.newObj(Field).moveY(map.size.h - 97);
    game.newObj(Blocks);
    game.newObj(Actor);
    game.newObj(Enemy);
    game.newObj(HealthBar);
    game.newObj(ExperienceBar);
    game.newObj(CursorTxt);
    for (const gObj of game.objs) gObj.data.initColor = gObj.color;
  },
  onUpdate(game) {
    // Grab game objects
    const { map, actor, enemy } = game.objs.asObject;
    const key = game.input.key.bind(game.input);
    const mouse = game.input.mouse.bind(game.input);
    const cursor = game.input.cursor;

    // Highlight fields and give EXP on actor step
    const fields = game.objs.gameObjsByName("field");
    if (actor.overlaps(fields[0])) {
      fields[0].color = "#4d9be6";
      actor.experience.add(1);
    } else fields[0].color = fields[0].data.initColor;
    if (actor.overlaps(fields[1])) {
      fields[1].color = "#0b5e65";
      actor.health.add(1);
    } else fields[1].color = fields[1].data.initColor;

    // Highlight game objects on cursor hover
    map.color = map.overlapsPoint(cursor) ? "#54485e" : map.data.initColor;
    actor.color = actor.overlapsPoint(cursor) ? "#f79617" : actor.initColor;
    enemy.color = enemy.overlapsPoint(cursor)
      ? "#e83b3b"
      : enemy.data.initColor;

    // Drag game objects with mouse
    (function dragGameObjs(gameList) {
      for (const gObj of gameList.asReverse) {
        if (gObj.childs.length) dragGameObjs(gObj.childs);
        else if (mouse("left") && gObj.overlapsPoint(cursor)) {
          gObj.sync(cursor);
          break;
        } else gObj.unsync();
      }
    })(game.objs);

    // Move enemy with tween animation effect
    if (key("Space"))
      enemy.data.tween = {
        currentTime: 0,
        timeStep: 20,
        duration: 1000,
        targetPosition: { ...cursor },
      };
    if (enemy.data.tween) {
      const { currentTime, duration, targetPosition } = enemy.data.tween;
      if (currentTime <= duration) {
        enemy.moveWithTween(
          targetPosition.x - enemy.globalPosition.x,
          targetPosition.y - enemy.globalPosition.y,
          currentTime,
          duration
        );
        enemy.data.tween.currentTime += enemy.data.tween.timeStep;
      } else delete enemy.data.tween;
    }

    // Damage actor on enemy touch
    if (actor.overlaps(enemy)) actor.health.sub(1);

    // Draw all game objects
    game.draw();

    // Draw distance between actor and enemy
    actor.drawDistance(enemy);
  },
});
