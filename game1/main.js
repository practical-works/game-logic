import { Game } from "./core.js";
import Actor from "./objects/Actor.js";
import Platform from "./objects/Platform.js";
import MovementTxt from "./objects/MovementTxt.js";

new Game({
  title: "Game1",
  color: "#165a4c",
  size: { w: 640, h: 480 },
  onInit(game) {
    game.newObj(Actor);
    game.newObj(Platform).move(464, 64);
    game.newObj(Platform).move(288, 160);
    game.newObj(Platform).move(48, 224);
    game.newObj(Platform).move(288, 288);
    game.newObj(Platform).move(464, 384);
    game.newObj(MovementTxt);
  },
  onUpdate(game) {
    game.draw();
  },
});
