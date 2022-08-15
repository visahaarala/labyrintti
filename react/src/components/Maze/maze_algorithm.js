import { directions, newCoordinates } from './directions';
import { FindRoute } from './route_algorithm';

export const CreateMaze = ({ x_max, y_max }) => {
  console.log('----- Maze Algorithm -----');

  const routesArray = [];
  const usedCoordinates = [];

  // Start at the middle to create a more difficult maze
  usedCoordinates.push({
    x: Math.floor((y_max - 1) / 2),
    y: Math.floor((x_max - 1) / 2),
  });

  let latestCoordinatesIndex = -1;
  let maze_searches = 0;
  let goingBackwards = 0;

  while (usedCoordinates.length < x_max * y_max) {
    maze_searches++;
    latestCoordinatesIndex === -1 && goingBackwards++;

    // latest coordinates
    const latestCoordinates = usedCoordinates.at(latestCoordinatesIndex);
    const validNeighbors = [];

    for (const key in directions) {
      // new coordinates
      const nc = newCoordinates({
        coordinates: latestCoordinates,
        direction: directions[key],
      });

      // check if new coordinates are within the maze
      if (nc.x >= 0 && nc.x < x_max && nc.y >= 0 && nc.y < y_max) {
        // check if new coordinates are not yet used
        if (!usedCoordinates.find((uc) => uc.x === nc.x && uc.y === nc.y)) {
          validNeighbors.push(nc);
        }
      }
    }

    if (validNeighbors.length === 0) {
      // go backwards in the usedCoordinates list to find a valid neighbor
      latestCoordinatesIndex--;
    } else {
      const newNeighborIndex = Math.floor(
        Math.random() * validNeighbors.length
      );
      const newCoordinates = validNeighbors[newNeighborIndex];
      routesArray.push([latestCoordinates, newCoordinates]);
      usedCoordinates.push(newCoordinates);
      latestCoordinatesIndex = -1;
    }
  }
  console.log('dimensions:', x_max, 'x', y_max);
  console.log('backtracking recursion maze creation steps:', maze_searches);
  console.log('going backwards', goingBackwards);
  console.log('useful steps', maze_searches - goingBackwards);

  // Create a two dimensional array filled with walls
  //
  // x range: 0 ... (maze.x_max * 2 + 1)
  // y range: 0 ... (maze.y_max * 2 + 1)
  //
  // 1 === wall
  // 0 === no wall
  const wallsArray = [];

  for (let i = 0; i < y_max * 2 + 1; i++) {
    const row = [];
    for (let j = 0; j < x_max * 2 + 1; j++) {
      row.push(1);
    }
    wallsArray.push(row);
  }

  // make routes (false === no wall) to the array
  // the routesArray does not include walls, thus
  // x1 = route[0].x * 2 + 1 to take into account the walls
  // ... etc
  routesArray.forEach((route) => {
    const x1 = route[0].x * 2 + 1;
    const x2 = route[1].x * 2 + 1;
    const y1 = route[0].y * 2 + 1;
    const y2 = route[1].y * 2 + 1;

    // this point gets done twice after the first route
    wallsArray[y1][x1] = 0;
    // the "middle point" between the routesArray points
    // (because of walls)
    wallsArray[(y1 + y2) / 2][(x1 + x2) / 2] = 0;
    wallsArray[y2][x2] = 0;
  });

  // create entry & exit point at opposite corners
  const beginning = { x: 0, y: 1 };
  const end = { x: x_max * 2, y: y_max * 2 - 1 };
  wallsArray[beginning.y][beginning.x] = 0;
  wallsArray[end.y][end.x] = 0;

  const route = FindRoute({ wallsArray, beginning, end });

  return { wallsArray, beginning, end, x_max, y_max, route };
};
