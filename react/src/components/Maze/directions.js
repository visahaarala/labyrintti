export const directions = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
};

export const newCoordinates = ({ coordinates, direction }) => {
  return {
    x: coordinates.x + direction.dx,
    y: coordinates.y + direction.dy,
  };
};
