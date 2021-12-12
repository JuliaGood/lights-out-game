import React, { Component } from "react";
import Cell from "./Cell";
import './board.css';

/* board of Lights Out game.

Properties:
- nrows: number of rows of board
- ncols: number of cols of board
- changeLightStartsOn: float, chance any cell is lit at start of game

State:
- hasWon: boolean, true when board is all off
- board: array-of-arrays of true/false

For this board:
  .  .  .
  O  O  .     (where . is off, and O is on)
  .  .  .

This would be: [[f, f, f], [t, t, f], [f, f, f]]
This should render an HTML table of individual <Cell /> components.
This doesn't handle any clicks --- clicks are on individual cells.

*/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    changeLightStartsOn: 0.25,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
  }

  // this F creates an initial board nrows high/ncols wide, 
  // each cell randomly lit or unlit (we call this F in the state!)

  createBoard() { 
    // TODO: create array-of-arrays of true/false values
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.changeLightStartsOn)
        // Math.random returns a value between 0 and 1, so if
        // it is less than 0.25 - it will be true, otherwise - false
      }
      board.push(row);
    }
    console.log('board', board);
    return board;
  }

  // handle changing a cell: update board & determine if winner
  // the bulk of the logic is here - in the flipCellsAround function
  // this method is called when we click on an individual Cell.
  // we need to know which one is being clicked on, and instead of doing a 
  // unique ID - we can just identify each cell based off of its coordinates.

  flipCellsAround(coord) {
    console.log("Flipping!", coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    // this splits the X and Y coordinates 

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);     // Flip initial cell
    flipCell(y, x - 1); // Flip left
    flipCell(y, x + 1); // Flip right
    flipCell(y - 1, x); // Flip below
    flipCell(y + 1, x); // Flip above

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({
      board: board, 
      hasWon: hasWon 
    });
  }


  // Render game board or winning message.

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return (
        <div className='board-title'>
          <div className='winner'>
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WON!</span>
          </div>
        </div>
      )
    }
    // else make a table board with Cell
    let tableBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`
        row.push(
          <Cell 
            key={coord} 
            isLit={this.state.board[y][x]} 
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(<tr key={y}>{row}</tr>)
      // because each row must to be inside of <tr> tag
    }
    return(
      <div>
        <div className='board-title'>
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className='board'>
        <tbody>
          {tableBoard}
        </tbody>
      </table>
      </div>
    )
  }
}


export default Board;
