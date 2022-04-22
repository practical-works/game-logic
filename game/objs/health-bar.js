export default function healthBar(game) {
  const { health } = game.obj("actor").data;
  const healthBar = game.newObj({
    name: "healthBar",
    color: "grey",
    size: { w: 200, h: 22 },
    position: { x: 10, y: 10 },
  });
  const healthFill = game.newObj({
    name: "healthFill",
    color: "green",
    size: healthBar.size,
  });
  const healthTxt = game.newObj({
    name: "healthTxt",
    parent: healthBar,
    type: "text",
    font: "bold 18px consolas",
  });
  healthBar.childs.addRange([healthFill, healthTxt]);
  healthBar.data = {
    centerTxt() {
      healthTxt.hotspot = {
        x: healthTxt.size.w * 0.5,
        y: healthTxt.size.h * 0.5,
      };
      healthTxt.center();
    },
    display() {
      healthFill.size.w = health.getRatio() * healthBar.size.w;
      healthTxt.text = `${health.current}/${
        health.max
      } (${health.getPercent()}%)`;
      this.centerTxt();
    },
  };
  healthBar.data.centerTxt();
  return healthBar;
}
