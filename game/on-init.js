import map from "./objs/map.js";
import fields from "./objs/fields.js";
import blocks from "./objs/blocks.js";
import actor from "./objs/actor.js";
import enemy from "./objs/enemy.js";
import healthBar from "./objs/health-bar.js";
import cursorTxt from "./objs/cursor-txt.js";

export default function onInit(game) {
  map(game);
  fields(game);
  blocks(game);
  actor(game);
  enemy(game);
  healthBar(game);
  cursorTxt(game);
  for (const gObj of game.objs) gObj.data.initColor = gObj.color;
}
