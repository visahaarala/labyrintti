import { CreateMaze } from './maze_algorithm';
import { FindRoute } from './route_algorithm';
import CharsMaze from './CharsMaze';
import React from 'react';

const Maze = () => {
  const maze = CreateMaze({ x_max: 40, y_max: 20 });
  const route = FindRoute(maze);

  route.forEach(
    (coordinates) => (maze.wallsArray[coordinates.y][coordinates.x] = 3)
  );

  return <CharsMaze maze={maze} />;
};

export default Maze;
