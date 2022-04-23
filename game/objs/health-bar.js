export default function healthBar(game) {
  const { health } = game.obj("actor").data;
  const healthBar = game.newObj({
    name: "healthBar",
    color: "#625565",
    size: { w: 400, h: 25 },
    position: { y: 10 },
    centerX: true
  });
  const healthFill = game.newObj({
    name: "healthFill",
    color: "#0b5e65",
    size: healthBar.size,
  });
  const healthTxt = game.newObj({
    name: "healthTxt",
    parent: healthBar,
    type: "text",
    font: "bold 15px consolas",
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
      if (health.ratio >= 0.5) healthFill.color = "#0b5e65";
      else if (health.ratio >= 0.2) healthFill.color = "#f9c22b";
      else healthFill.color = "#b33831";
      healthFill.size.w = health.ratio * healthBar.size.w;
      healthTxt.text = `❤️ ${health.current}/${
        health.max
      } (${health.percent}%)`;
      this.centerTxt();
    },
  };
  healthBar.data.centerTxt();
  return healthBar;
}
