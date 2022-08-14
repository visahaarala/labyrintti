export const directions = [
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: -1 },
];

export const CreateMaze = ({ x_max, y_max }) => {
  console.log('----- Maze Algorithm -----');
  // const x_max = dimensions[0];
  // const y_max = dimensions[1];

  const routesArray = [];
  const usedCoordinates = [];

  // Start at [0,0]
  // usedCoordinates.push([0, 0]);

  // OR

  // Start at the middle
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
    directions.forEach((dir) => {
      // new coordinates
      const nc = {
        x: latestCoordinates.x + dir.dx,
        y: latestCoordinates.y + dir.dy,
      };
      if (nc.x >= 0 && nc.x < x_max && nc.y >= 0 && nc.y < y_max) {
        if (!usedCoordinates.find((uc) => uc.x === nc.x && uc.y === nc.y)) {
          validNeighbors.push(nc);
        }
      }
    });
    if (validNeighbors.length === 0) {
      latestCoordinatesIndex--; // go backwards in the usedCoordinates list to find another route
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
  // console.log('usedCoordinates', usedCoordinates);
  console.log('dimensions:', x_max, 'x', y_max);
  // console.log('routes:', routesArray.length);
  console.log('backtracking recursion maze creation steps:', maze_searches);
  console.log('going backwards', goingBackwards);
  console.log('useful steps', maze_searches - goingBackwards);

  // Create two dimensional array filled with walls
  //
  // x range: 0 ... (maze.x_max * 2 - 1)
  // y range: 0 ... (maze.y_max * 2 - 1)
  //
  // 1 === wall
  // 0 === no wall
  const wallsArray = [];

  for (let i = 0; i < x_max * 2 + 1; i++) {
    const row = [];
    for (let j = 0; j < y_max * 2 + 1; j++) {
      row.push(1);
    }
    wallsArray.push(row);
  }

  // make routes (false, no wall) to the array
  // starts with an X at "[0,0]"" which is actually [1,1] in the walls array because [0,0] is the corner wall
  // wallsArray[1][1] = false;
  routesArray.forEach((route) => {
    // console.log(route);
    const x1 = route[0].x * 2 + 1;
    const x2 = route[1].x * 2 + 1;
    const y1 = route[0].y * 2 + 1;
    const y2 = route[1].y * 2 + 1;

    wallsArray[x1][y1] = 0; // this point gets changed false twice after the first routes
    wallsArray[(x1 + x2) / 2][(y1 + y2) / 2] = 0;
    wallsArray[x2][y2] = 0;
  });

  // create entry & exit points
  // at opposite corners, top & bottom
  const beginning = { x: 0, y: 1 };
  const end = { x: x_max * 2, y: y_max * 2 - 1 };

  wallsArray[beginning.x][beginning.y] = 0;
  wallsArray[end.x][end.y] = 0;

  return { wallsArray, beginning, end, x_max, y_max };
};
