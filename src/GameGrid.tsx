import React from 'react'
import Cell from './Cell'

const GameGrid:React.FC<{
    numCols: number,
    numRows: number,
    paused: boolean,
    isCellAlive: (col:number, row:number) => boolean,
    onToggleCell: (col:number, row:number) => void,
}> = ({
    numCols,
    numRows,
    paused,
    isCellAlive,
    onToggleCell,
}) => {
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
                    paused={paused}
                    isAlive={isCellAlive(col,row)} 
                    onToggle={(col:number, row:number) => {onToggleCell(col,row)}}
                />);
        }
    }

    return (
<div id="game-grid" style={{
    gridTemplateColumns: `repeat(${numCols},1fr)`,
    gridTemplateRows: `repeat(${numRows},1fr)`
}}>
    {grid}
</div>
    )
}

export default GameGrid 
