export default function levelBar(game) {
  const { experience } = game.obj("actor").data;
  const levelBar = game.newObj({
    name: "levelBar",
    color: "#625565",
    size: { w: 400, h: 25 },
    position: { y: game.size.h - 35 },
    centerX: true,
  });
  const levelFill = game.newObj({
    name: "levelFill",
    color: "#4d9be6",
    size: levelBar.size,
  });
  const levelTxt = game.newObj({
    name: "levelTxt",
    parent: levelBar,
    // color: "blue",
    type: "text",
    font: "bold 15px consolas",
  });
  levelBar.childs.addRange([levelFill, levelTxt]);
  levelBar.data = {
    centerTxt() {
      levelTxt.hotspot = {
        x: levelTxt.size.w * 0.5,
        y: levelTxt.size.h * 0.5,
      };
      levelTxt.center();
    },
    display() {
      levelFill.size.w = experience.relativeRatio * levelBar.size.w;
      levelTxt.text = `🏁 ${experience.relativeCurrent}/${experience.relativeMax} (Level ${experience.level})`;
      this.centerTxt();
    },
  };
  levelBar.data.centerTxt();
  return levelBar;
}
