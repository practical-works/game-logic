import GameObject from "./GameObject.js";
import Size from "./geometry/Size.js";

class CellGameObject extends GameObject {
  _margin = 1;

  constructor(game, options = {}) {
    if (!options.name) options.name = `unamedCell`;
    super(game, options);
    const { margin } = options;
    this.margin = margin;
  }

  get margin() {
    return this._margin;
  }
  set margin(margin) {
    if (!isNaN(margin)) this._margin = Math.abs(margin);
  }
}

export default class GridGameObject extends GameObject {
  _cell = new CellGameObject();
  _division = new Size({ columns: 1, rows: 1 });

  constructor(game, options = {}) {
    if (!options.name) options.name = "unamedGrid";
    super(game, options);
    const { cell, division } = options;
    this.cell = cell;
    this.division = division;
  }

  get cell() {
    return this._cell;
  }
  set cell(cell) {
    this._cell = new CellGameObject(this.game, cell);
  }

  get division() {
    return this._division;
  }
  set division(division) {
    this._division = new Size(division);
  }

  onInit() {
    this.size = {
      width:
        (this.cell.size.w + this.cell.margin) * this.division.columns +
        this.cell.margin,
      height:
        (this.cell.size.h + this.cell.margin) * this.division.rows +
        this.cell.margin,
    };
    const count = this.division.columns * this.division.rows;
    let column = 0;
    let row = 0;
    for (let i = 0; i < count; i++) {
      const gObj = this.childs.add(new CellGameObject(this.game, this.cell));
      gObj.position.x =
        this.cell.margin + column * (gObj.size.w + this.cell.margin);
      gObj.position.y =
        this.cell.margin + row * (gObj.size.h + this.cell.margin);
      column++;
      if (column >= this.division.columns) {
        column = 0;
        row++;
      }
    }
  }
}
