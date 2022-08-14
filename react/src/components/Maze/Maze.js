import { CreateMaze} from './maze_algorithm';
import { AddRoute } from './route_algorithm';

const Maze = () => {
  const maze = CreateMaze({ x_max: 30, y_max: 30 });

  AddRoute(maze);

  return (
    <div className='maze'>
      {maze.wallsArray.map((row) => {
        return (
          <div>
            {row.map((point) => {
              if (point === 1) {
                return <b>&#9632;</b>;
              } else if (point === 2) {
                return '+';
              } else if (point === 3) {
                return <b>x</b>;
              } else {
                return <b>&nbsp;</b>;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Maze;