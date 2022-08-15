import { useState } from 'react';
import { directions, newCoordinates } from './directions';

const CharsMaze = ({ maze }) => {
  const [playerCoordinates, setPlayerCoordinates] = useState(maze.beginning);

  maze.wallsArray[playerCoordinates.y][playerCoordinates.x] = 9;

  if (
    playerCoordinates.x === maze.end.x &&
    playerCoordinates.y === maze.end.y
  ) {
    //
    // Maze finished!
    //
    maze.route.forEach((coordinates) => {
      maze.wallsArray[coordinates.y][coordinates.x] = 9;
      // console.log(coordinates);
    });
  } else {
    const keyCodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

    const keyPressHandler = (event) => {
      const directionName = keyCodes[event.keyCode];
      if (directionName) {
        event.preventDefault();
        // new coordinates
        const nc = newCoordinates({
          coordinates: playerCoordinates,
          direction: directions[directionName],
        });
        if (
          nc.x >= 0 &&
          nc.x < maze.wallsArray[0].length &&
          nc.y >= 0 &&
          nc.y < maze.wallsArray.length
        ) {
          if (!maze.wallsArray[nc.y][nc.x]) {
            maze.wallsArray[playerCoordinates.y][playerCoordinates.x] = 0;
            document.removeEventListener('keydown', keyPressHandler);
            setPlayerCoordinates(nc);
          }
        }
      }
    };
    document.addEventListener('keydown', keyPressHandler);
  }

  return (
    <div className='maze' id='maze'>
      {maze.wallsArray.map((row) => {
        return (
          <div>
            {row.map((point) => {
              if (point === 1) {
                return <b>&#9632;</b>;
              } else if (point === 3) {
                return <b>x</b>;
              } else if (point === 9) {
                return <b>&hearts;</b>;
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

export default CharsMaze;
