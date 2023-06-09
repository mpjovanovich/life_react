import React from 'react'
import GameGrid from "./GameGrid"
import Life from './Life'

// TODO:
// * Add a reset button.
// * Disable all other buttons and functionality if the timer is running.
// * Better font for title. Something script-ish.
// * Get AI to gen icons for the cells; make sure they're in a good format and file size
// is small.
// * Allow user to select grid size.
// * Add a link to the github repo in the footer.
// * Publish/host on replit. Send to friends and family.

// React TypeScript Cheatsheets:
// https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

const NUM_ROWS:number = 15;
const NUM_COLS:number = 15;
const STEP_TIME_MS:number = 500;

const App:React.FC = () => {
    // The useMemo hook makes sure that the Life object is only created once; not
    // every time the component re-renders.
    const life = React.useMemo(() => new Life(NUM_ROWS, NUM_COLS), []);

    // This is the hoisted variable for any component that needs to know about the game state.
    const [_,setGameState] = React.useState(life.board);

    // The timer id is part of the state because it gets created/cleared on the button click.
    const [timerId,setTimerId] = React.useState<number|null>(null);

    // Text for the start/stop button.
    const [timerText,setTimerText] = React.useState("START");

    const handleCellToggle = (col:number, row:number) => {
        life.toggleCell(col,row);
        setGameState(life.board);
    }

    const handleTimerToggle = () => {
        if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
            setTimerText("START");
        } else {
            setTimerId (setInterval(() => {
                life.step(); 
                setGameState(life.board)
            }, STEP_TIME_MS));
            setTimerText("STOP");
        }
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
            <div id="generation">
                <span className="float-left">Generation: </span>
                <span className="float-right" style={{fontWeight: `${timerId ? "bold" : "normal"}`}}>{life.generation}</span>
            </div>
            <button id="timer-button" className={`${timerId && "running-button"}`} onClick={() => {handleTimerToggle();}}>{timerText}</button>
            <button disabled={timerId != null} id="step-button" onClick={() => {life.step(); setGameState(life.board);}}>STEP</button>
            <button disabled={timerId != null} id="reset-button" onClick={() => { /*TODO*/; setGameState(life.board);}}>CLEAR</button>
        </div>
    </div>
</>
    )
}

export default App
