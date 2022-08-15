import { CreateMaze } from './maze_algorithm';
import CharsMaze from './CharsMaze';

const Maze = ({ x_max, y_max }) => {
  return <CharsMaze maze={CreateMaze({ x_max, y_max })} />;
};

export default Maze;
