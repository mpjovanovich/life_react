import React from 'react'
import GameGrid from "./GameGrid"
import Life from './Life'

// TODO:
// * Add way to load common configurations: 
//    - https://playgameoflife.com/lexicon
//    - https://conwaylife.com/ref/lexicon/lex_home.htm
// * Run accessibility/compatibility checks (lighthouse in browser dev toolbar)
// * favicon note working...
// * Add a link to the github repo in the footer.
// * Publish/host on replit. Send to friends and family.
// * Long term: Allow import of common game states.

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
        if (!timerId) {
            life.toggleCell(col,row);
            setGameState(life.board);
        }
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
                paused={timerId == null}
                isCellAlive={life.isCellAlive} 
                onToggleCell={handleCellToggle} 
            />
        </div>

        <div id="game-parameters">
            <label htmlFor="rows">Rows:</label>
            <div>
                <input disabled={timerId != null} type="range" id="rows" name="rows" min="10" max="50" value={rowCount}
                    onChange={(e) => setRowCount(parseInt(e.target.value))}></input>
                <span className='slider-label'>({rowCount})</span>
            </div>
            <label htmlFor="cols">Columns:</label>
            <div>
                <input disabled={timerId != null} type="range" id="cols" name="cols" min="10" max="50" value={columnCount}
                    onChange={(e) => setColumnCount(parseInt(e.target.value))}></input>
                <span className='slider-label'>({columnCount})</span>
            </div>
            <label htmlFor="increment">Increment (ms):</label>
            <input disabled={timerId != null} type="number" id="quantity" name="quantity" min="100" max="" step={100} value={stepIncrement} 
                style={{textAlign: 'right'}}
                onChange={(e) => setStepIncrement(parseInt(e.target.value))}></input>
        </div>

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
