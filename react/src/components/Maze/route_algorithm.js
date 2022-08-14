import { directions } from './maze_algorithm';

export const AddRoute = (maze) => {
  console.log('----- Route Algorithm -----');
  // console.log('maze', maze);

  const visitedCoordinates = [];

  const completedSteps = [];

  const recursiveFinder = (coordinates) => {
    visitedCoordinates.push(coordinates);

    // first check if current coordinates are the end of the maze
    // if so, stop searching
    if (coordinates.x === maze.end.x && coordinates.y === maze.end.y) {
      return;
    }

    // Make a list of valid neighbors
    const validNeighbors = [];

    // scan through directions
    directions.forEach((dir) => {
      // New coordinates
      const nc = {
        x: coordinates.x + dir.dx,
        y: coordinates.y + dir.dy,
      };
      // Check that new coordinates are within the maze
      if (
        nc.x >= 0 &&
        nc.x < maze.wallsArray.length &&
        nc.y >= 0 &&
        nc.y < maze.wallsArray[0].length
      ) {
        // Check that new coordinates point to an open space (not a wall)
        if (!maze.wallsArray[nc.x][nc.y]) {
          // Check that new coordinates are not in the usedCoordinates list
          if (
            !visitedCoordinates.find((uc) => uc.x === nc.x && uc.y === nc.y)
          ) {
            validNeighbors.push(nc);
          }
        }
      }
    });

    validNeighbors.forEach((neighbor) => {
      // for each of the valid neighbors:
      // - add movement to completedSteps array
      // - send a new recursive finder
      completedSteps.push({ from: coordinates, to: neighbor });
      recursiveFinder(neighbor);
    });
  };

  recursiveFinder(maze.beginning);

  let routeLength = 0;
  const recursiveSolution = (coordinates) => {
    routeLength++;
    maze.wallsArray[coordinates.x][coordinates.y] = 3;
    const step = completedSteps.find(
      (step) => step.to.x === coordinates.x && step.to.y === coordinates.y
    );
    if (step) {
      recursiveSolution(step.from);
    }
  };
  recursiveSolution(maze.end);

  console.log('route length', routeLength);
};