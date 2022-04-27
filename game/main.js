import Game from "../core/Game.js";
import Map from "./objs/Map.js";
import fields from "./objs/fields.js";
import blocks from "./objs/blocks.js";
import actor from "./objs/actor.js";
import enemy from "./objs/enemy.js";
import healthBar from "./objs/health-bar.js";
import levelBar from "./objs/level-bar.js";
import cursorTxt from "./objs/cursor-txt.js";
import onUpdate from "./on-update.js";

export default function game() {
  return new Game({
    title: "New Game",
    color: "#2e222f",
    size: { w: 640, h: 480 },
    onInit(game) {
      game.objs.addRange([new Map(game)]);
      fields(game);
      blocks(game);
      actor(game);
      enemy(game);
      healthBar(game);
      levelBar(game);
      cursorTxt(game);
      for (const gObj of game.objs) gObj.data.initColor = gObj.color;
    },
    onUpdate,
  });
}
