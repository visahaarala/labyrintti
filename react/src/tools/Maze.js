const Maze = (props) => {
  const x_max = props[0];
  const y_max = props[1];

  const routesArray = [];
  const usedCoordinates = [];
  let latestCoordinatesIndex = -1;

  // START AT 0,0
  usedCoordinates.push([0, 0]);

  const neighborDifferences = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (usedCoordinates.length < x_max * y_max) {
    // latest coordinates
    const lc = usedCoordinates.at(latestCoordinatesIndex);
    const neighbors = [];
    neighborDifferences.forEach((diff) => {
      // new coordinates
      const nc = [lc[0] + diff[0], lc[1] + diff[1]];
      if (nc[0] >= 0 && nc[0] < x_max && nc[1] >= 0 && nc[1] < y_max) {
        if (!usedCoordinates.find((uc) => uc[0] === nc[0] && uc[1] === nc[1])) {
          neighbors.push(nc);
        }
      }
    });
    if (neighbors.length === 0) {
      latestCoordinatesIndex--; // go backwards in the usedCoordinates list to find another route
    } else {
      const newNeighborIndex = Math.floor(Math.random() * neighbors.length);
      const newCoordinates = neighbors[newNeighborIndex];
      routesArray.push([lc, newCoordinates]);
      usedCoordinates.push(newCoordinates);
      latestCoordinatesIndex = -1;
    }
  }
  // console.log('usedCoordinates', usedCoordinates);
  console.log('routesArray', routesArray);

  return { routesArray, x_max, y_max };
};

export default Maze;
