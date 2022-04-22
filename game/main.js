import Game from "../core/Game.js";
import onInit from "./on-init.js";
import onUpdate from "./on-update.js";

export default function game() {
  return new Game({
    title: "New Game",
    size: { w: 640, h: 480 },
    onInit,
    onUpdate,
  });
}
