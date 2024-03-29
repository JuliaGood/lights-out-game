import React, {Component} from 'react';
import './Cell.css';

/* a single cell on the board.

This has no state --- just two props:
  - flipCellsAroundMe: a function rec'd from the board which 
    flips this cell and the cells around of it
  - isLit: boolean, is this cell lit?

This handles clicks --- by calling flipCellsAroundMe
*/

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe();
  }

  render() {
    let classes = "cell" + (this.props.isLit ? " cell-lit" : "");

    return (
        <td className={classes} onClick={this.handleClick} />
    )
  }
}

export default Cell;
