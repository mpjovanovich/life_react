import React from 'react'
import GameGrid from "./GameGrid"
import Life from './Life'

// TODO:
// * Get AI to gen icons for the cells; make sure they're in a good format and file size
// is small.
// * Add favicon. favicon should match cell icons.
// * Allow user to select grid size. Maybe use a vertical and horizontal slider. Should go below the game controls.
// * Allow user to select time increment using a ??? control. Should go below the game controls.
// * Disable the new elements above.
// * Add a link to the github repo in the footer.
// * Publish/host on replit. Send to friends and family.

// React TypeScript Cheatsheets:
// https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

const App:React.FC = () => {
    // State for parameters.
    const [stepIncrement,setStepIncrement] = React.useState(500);
    const [columnCount,setColumnCount] = React.useState(15);
    const [rowCount,setRowCount] = React.useState(15);

    // The useMemo hook makes sure that the Life object is only created once; not
    // every time the component re-renders.
    const life = React.useMemo(() => new Life(columnCount, rowCount), [columnCount,rowCount]);

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
            }, stepIncrement));
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
        <div id="game-cells">
            <GameGrid 
                numCols={life.numCols}
                numRows={life.numRows}
                isCellAlive={life.isCellAlive} 
                onToggleCell={handleCellToggle} 
            />
        </div>

        <div id="game-parameters">
            <div className='game-parameter-container clear'>
                <label htmlFor="rows">Rows:</label>
                <input disabled={timerId != null} type="range" id="rows" name="rows" min="10" max="50" value={rowCount}
                    onChange={(e) => setRowCount(parseInt(e.target.value))}></input>
            </div>
            <div className='game-parameter-container clear'>
                <label htmlFor="cols">Columns:</label>
                <input disabled={timerId != null} type="range" id="cols" name="cols" min="10" max="50" value={columnCount}
                    onChange={(e) => setColumnCount(parseInt(e.target.value))}></input>
            </div>
            <div className='game-parameter-container clear'>
                <label htmlFor="increment">Step Increment (ms):</label>
                <input disabled={timerId != null} type="number" id="quantity" name="quantity" min="100" max="" step={100} value={stepIncrement} 
                    onChange={(e) => setStepIncrement(parseInt(e.target.value))}></input>
            </div>
        </div>
        <div className='clear' />

        <div id="game-controls">
            <div id="generation">
                <span className="float-left">Generation: </span>
                <span className="float-right" style={{fontWeight: `${timerId ? "600" : "normal"}`}}>{life.generation}</span>
            </div>
            <div id="game-button-container">
                <button id="timer-button" className={`${timerId && "running-button"}`} onClick={() => {handleTimerToggle();}}>{timerText}</button>
                <button disabled={timerId != null} id="step-button" onClick={() => {life.step(); setGameState(life.board);}}>STEP</button>
                <button disabled={timerId != null} id="reset-button" onClick={() => { life.resetBoard(); setGameState(life.board);}}>CLEAR</button>
            </div>
        </div>
    </div>
</>
    )
}

export default App
