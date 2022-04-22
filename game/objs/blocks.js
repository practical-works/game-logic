export default function blocks(game) {
  const blocks = game.newGrid({
    name: "blocks",
    cell: {
      color: "forestGreen",
      size: { w: 32, h: 32 },
      margin: 41,
    },
    division: { columns: 6, rows: 6 },
    center: true,
  });
  return blocks;
}