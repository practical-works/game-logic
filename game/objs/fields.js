export default function fields(game) {
  const map = game.obj("map");
  const template = (name) => ({
    name,
    parent: map,
    color: "skyBlue",
    size: { w: 128, h: 64 },
    centerX: true,
  });
  const fields = [];
  fields[0] = game.newObj(template("field0"));
  fields[0].moveY(33);
  fields[1] = game.newObj(template("field1"));
  fields[1].moveY(map.size.h - 97);
  return fields;
}
