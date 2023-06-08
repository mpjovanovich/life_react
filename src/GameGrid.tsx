import React from 'react'
import Cell from './Cell'

const GameGrid:React.FC<{
    numCols: number,
    numRows: number,
    isCellAlive: (col:number, row:number) => boolean,
    toggleCell: (col:number, row:number) => void,
}> = ({
    numCols,
    numRows,
    isCellAlive,
    toggleCell,
}) => {
    console.log("GameGrid rendering.")

    // Build the grid as a 2d array indexed by [col,row] with (0,0) in the top left corner.
    // This makes it much easier to visualize for debugging and testing.
    const grid: React.ReactElement[][] = []

    for (let row = 0; row < numRows; row++) {
        grid.push([])
        for (let col = 0; col < numCols; col++) {
            const cellNumber = (row * numCols) + col
            grid[row].push(
                <Cell 
                    // I don't know why we need this, but the console complains if we don't have it.
                    key={cellNumber}
                    col={col}
                    row={row}
                    isAlive={isCellAlive(col,row)} 
                    onToggle={(col:number, row:number) => {toggleCell(col,row)}}
                />);
        }
    }

    return (
<div id="game-grid">
    {grid}
</div>
    )
}

export default GameGrid 
