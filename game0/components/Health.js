import { GameGomponent } from "../core.js";

export default class Health extends GameGomponent {
  max = 100;
  current = this.max;

  get ratio() {
    return this.current / this.max;
  }

  get percent() {
    return Math.floor(this.ratio * 100);
  }

  add(hp) {
    if (isNaN(hp)) return;
    if (this.current < this.max) this.current += 1;
  }

  sub(hp) {
    if (isNaN(hp)) return;
    if (this.current > 0) this.current -= 1;
  }
}
