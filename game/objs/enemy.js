export default function enemy(game) {
  const map = game.obj("map");
  return game.newObj({
    name: "enemy",
    parent: map,
    color: "indianRed",
    size: { w: 32, h: 32 },
    hotspot: { x: 16, y: 16 },
    position: { x: map.size.w - 52, y: 52 },
  });
}
