import Cell from './Cell'
import Life from './Life'

const GameGrid:React.FC<{
    gameState: Life,
}> = ({
    gameState,
}) => {
    // Build the grid as a 2d array indexed by [col,row] with (0,0) in the top left corner.
    // This makes it much easier to visualize for debugging and testing.
    const grid: React.ReactElement[][] = []

    for (let row = 0; row < gameState.numRows; row++) {
        grid.push([])
        for (let col = 0; col < gameState.numCols; col++) {
            const cellNumber = (row * gameState.numCols) + col
            grid[row].push(
                <Cell 
                    // I don't know why we need this, but the console complains if we don't have it.
                    key={cellNumber}
                    col={col}
                    row={row}
                    isAlive={gameState.isCellAlive(col,row)} 
                    // ^^^^ This is a stateful variable.
                    // We need to make a call to the setState handler from useState when toggling.
                    // I don't want to make a state hook for each cell though.
                    onToggle={(col:number, row:number) => {gameState.toggleCell(col,row)}}
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
