import React from 'react'
import GameGrid from "./GameGrid"
import Life from './Life'

// TODO: Style for the game should match the logo - ink sketch with desert theme.
// Get AI to gen icons for the cells; make sure they're in a good format and file size
// is small.

// TODO: user can set these later.
const NUM_ROWS:number = 10;
const NUM_COLS:number = 10;

const App:React.FC = () => {
    // This is the hoisted variable for any component that needs to know about the game state.
    const gameState = new Life(NUM_ROWS, NUM_COLS);
    // const [gameState, setGameState] = React.useState(new Life(NUM_ROWS, NUM_COLS));
    React.useEffect(() => {
    }, [gameState]);

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
        <GameGrid gameState={gameState} />
    </div>
</>
    )
}

export default App
