import Maze from './tools/Maze';

function App() {
  // create Maze
  const maze = Maze([40, 50]);

  // Create two dimensional array filled with walls
  //
  // x range: 0 ... (maze.x_max * 2 - 1)
  // y range: 0 ... (maze.y_max * 2 - 1)
  //
  // true === wall
  // false === no wall

  const wallsArray = [];

  for (let i = 0; i < maze.x_max * 2 + 1; i++) {
    const row = [];
    for (let j = 0; j < maze.y_max * 2 + 1; j++) {
      row.push(true);
    }
    wallsArray.push(row);
  }

  // make routes (false, no wall) to the array
  // starts with an X at "[0,0]"" which is actually [1,1] in the walls array because [0,0] is the corner wall
  wallsArray[1][1] = false;

  maze.routesArray.forEach((route) => {
    // console.log(route);
    const x1 = route[0][0] * 2 + 1;
    const x2 = route[1][0] * 2 + 1;
    const y1 = route[0][1] * 2 + 1;
    const y2 = route[1][1] * 2 + 1;

    // visualArray[x1][y1] = 'X';
    wallsArray[(x1 + x2) / 2][(y1 + y2) / 2] = false;
    wallsArray[x2][y2] = false;
  });

  // create exit & entry points

  // randomly: one on the top and one on the bottom
  // wallsArray[0][Math.floor(Math.random() * (maze.y_max)) * 2 + 1] = false;
  // wallsArray[maze.x_max * 2][Math.floor(Math.random() * (maze.y_max)) * 2 + 1] = false;

  // or at opposite corners, top & bottom
  wallsArray[0][1] = false;
  wallsArray[maze.x_max * 2][maze.y_max * 2 - 1] = false;

  return (
    <main>
      <h1>labyrintti</h1>
      <div className='maze'>
        {wallsArray.map((row) => {
          return (
            <div>
              {row.map((point) => {
                if (point) {
                  return <b>&#9632;</b>;
                } else {
                  return <b>&nbsp;</b>;
                }
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
