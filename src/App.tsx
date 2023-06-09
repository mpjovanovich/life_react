import React from 'react'
import GameGrid from "./GameGrid"
import Life from './Life'

// TODO:

// Fix start/stop button. Text should change. Stop isn't working.

// Add a reset button.

// Get AI to gen icons for the cells; make sure they're in a good format and file size
// is small.

// Allow user to select grid size.

const NUM_ROWS:number = 15;
const NUM_COLS:number = 15;
const STEP_TIME_MS:number = 500;

const life = new Life(NUM_ROWS, NUM_COLS);

const App:React.FC = () => {
    // This is the hoisted variable for any component that needs to know about the game state.
    // I guess I don't need to actually use the gameState variable?
    // const [gameState, setGameState] = React.useState(life.board);
    const [_,setGameState] = React.useState(life.board);

    const handleCellToggle = (col:number, row:number) => {
        life.toggleCell(col,row);
        setGameState(life.board);
    }

    const handleTimerToggle = () => {
        const timer = setInterval(() => {
            life.step(); 
            setGameState(life.board)
        }, STEP_TIME_MS);
        return () => clearInterval(timer);
    }

    return (
<>
    <header>
        <div id="logo-container">
            <h1 id="logo-text">Game of Life</h1>
        </div>
    </header>

    {/* Maybe make this a component later. */}
    <div id="game-container">
        <GameGrid 
            numCols={life.numCols}
            numRows={life.numRows}
            isCellAlive={life.isCellAlive} 
            onToggleCell={handleCellToggle} 
        />

        <div id="game-controls">
            <span id="generation">Generation: {life.generation}</span>
            <button id="timer-button" onClick={() => {handleTimerToggle();}}>Start</button>
            <button id="step-button" onClick={() => {life.step(); setGameState(life.board);}}>Step</button>
        </div>
    </div>
</>
    )
}

export default App
