const CharsMaze = (props) => {
  return (
    <div className='maze'>
      {props.maze.wallsArray.map((row) => {
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

export default CharsMaze;
