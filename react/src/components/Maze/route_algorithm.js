import { directions, newCoordinates } from './directions';

export const FindRoute = ({ wallsArray, beginning, end }) => {
  console.log('----- Route Algorithm -----');
  // console.log('maze', maze);

  const visitedCoordinates = [];

  const completedSteps = [];

  const recursiveFinder = (coordinates) => {
    visitedCoordinates.push(coordinates);

    // first check if current coordinates are the end of the maze
    // if so, stop searching
    if (coordinates.x === end.x && coordinates.y === end.y) {
      return;
    }

    // Make a list of valid neighbors
    const validNeighbors = [];

    // scan through directions
    // directions.forEach((dir) => {
    for (const key in directions) {
      // New coordinates
      const nc = newCoordinates({
        coordinates,
        direction: directions[key],
      });

      // Check that new coordinates are within the maze
      if (
        nc.y >= 0 &&
        nc.y < wallsArray.length &&
        nc.x >= 0 &&
        nc.x < wallsArray[0].length
      ) {
        // Check that new coordinates point to an open space (not a wall)
        if (!wallsArray[nc.y][nc.x]) {
          // Check that new coordinates are not in the usedCoordinates list
          if (
            !visitedCoordinates.find((uc) => uc.x === nc.x && uc.y === nc.y)
          ) {
            validNeighbors.push(nc);
          }
        }
      }
    }

    validNeighbors.forEach((neighbor) => {
      // for each of the valid neighbors:
      // - add movement to completedSteps array
      // - send a new recursive finder
      completedSteps.push({ from: coordinates, to: neighbor });
      recursiveFinder(neighbor);
    });
  };

  recursiveFinder(beginning);

  const route = [];

  const recursiveSolution = (coordinates) => {
    route.push(coordinates);
    const step = completedSteps.find(
      (step) => step.to.x === coordinates.x && step.to.y === coordinates.y
    );
    if (step) {
      recursiveSolution(step.from);
    }
  };
  recursiveSolution(end);

  console.log('route length', route.length);

  return route;
};
