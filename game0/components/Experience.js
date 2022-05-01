import { GameGomponent } from "../core.js";

export default class Experience extends GameGomponent {
  current = 0;
  relativeCurrent = 0;
  level = 1;

  get min() {
    return this.calculate(this.level);
  }

  get max() {
    return this.calculate(this.level + 1);
  }

  get relativeMax() {
    return this.max - this.min;
  }

  get remaining() {
    return this.max - this.current;
  }

  get ratio() {
    return this.current / this.max;
  }

  get relativeRatio() {
    return this.relativeCurrent / this.relativeMax;
  }

  add(exp) {
    if (isNaN(exp)) return;
    this.current += exp;
    this.relativeCurrent += exp;
    if (this.remaining <= 0) {
      this.relativeCurrent = Math.abs(this.remaining);
      this.level++;
    }
  }

  calculate(level) {
    return 100 * (level * level - 1);
  }
}
