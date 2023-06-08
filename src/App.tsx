import React from 'react'
import GameGrid from "./GameGrid"
import Life from './Life'

// TODO: Style for the game should match the logo - ink sketch with desert theme.
// Get AI to gen icons for the cells; make sure they're in a good format and file size
// is small.

// TODO: user can set these later.
const NUM_ROWS:number = 10;
const NUM_COLS:number = 10;

const life = new Life(NUM_ROWS, NUM_COLS);

const App:React.FC = () => {
    // This is the hoisted variable for any component that needs to know about the game state.
    // I guess I don't need to actually use the gameState variable?
    // const [gameState, setGameState] = React.useState(life.board);
    const [_,setGameState] = React.useState(life.board);

    const handleToggleCell = (col:number, row:number) => {
        life.toggleCell(col,row);
        setGameState(life.board);
    }

    return (
<>
    <header>
        <div id="logo-container">
            <h1 id="logo-text">Game of Life</h1>
        </div>
        <h2 className="subheading">Stuff and things.</h2>
    </header>

    {/* Maybe make this a component later. */}
    <div id="game-container">
        <GameGrid 
            numCols={life.numCols}
            numRows={life.numRows}
            isCellAlive={life.isCellAlive} 
            toggleCell={handleToggleCell} 
        />
    </div>
</>
    )
}

export default App
