export default function map(game) {
  const key = game.input.key.bind(game.input);
  const map = game.newObj({
    name: "map",
    color: "darkGreen",
    size: { w: 400, h: 400 },
    center: true,
  });
  map.data.movement = {
    control() {
      if (key("KeyD")) map.moveX(1);
      if (key("KeyA")) map.moveX(-1);
      if (key("KeyW")) map.moveY(-1);
      if (key("KeyS")) map.moveY(1);
    },
  };
  return map;
}
