export default function cursorTxt(game) {
  const cursor = game.input.cursor;
  const cursorTxt = game.newObj({
    name: "cursorTxt",
    type: "text",
    color: "#FFD580",
    font: "20px consolas",
  });
  cursorTxt.data.display = () => {
    cursorTxt.text = `${cursor.x},${cursor.y} 🐭`;
    cursorTxt.position.x = game.size.w - cursorTxt.size.w - 8;
    cursorTxt.position.y = game.size.h - cursorTxt.size.h - 8;
  };
  return cursorTxt;
}
