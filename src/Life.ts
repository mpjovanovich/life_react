
export default class Life {
    // The board should be read only outside of the class to maintain a
    // single source of truth.

    // This is a nasty hack to make a readonly observable copy of the board.
    // I'm sure there's a library out there that does it better.

    // This is the "real" board.
    private _board: boolean[][];

    // This is a copy of the board that gets updated when the board is updated.
    board: readonly(readonly boolean[])[] = [];

    generation:number;
    numRows:number;
    numCols:number;

    constructor(numRows:number, numCols:number) {
        this.generation = 0;
        this.numRows = numRows;
        this.numCols = numCols;
        this._board = this.initializeBoard()
        this.cloneBoard();
    }

    /* ******************************************************* */
    /* PRIVATE METHODS */
    /* ******************************************************* */
    private initializeBoard = () => {
        // We'll start with a boolean 2d array to represent the board state.
        const board: boolean[][] = []
        for (let row = 0; row < this.numRows; row++) {
            board.push([])
            for (let col = 0; col < this.numCols; col++) {
                board[row].push(false)
            }
        }
        return board;
    }

    // private cloneBoard = () => this.board = structuredClone(this._board)
    private cloneBoard = () => this.board = [...this._board]

    private countNeighbors = (col:number, row:number) => {
        let numNeighbors = 0;
        for (let i = -1; i <= 1; i++) {
            const neighborCol = col + i;
            if (neighborCol < 0 || neighborCol >= this.numCols) 
                continue;
            for (let j = -1; j <= 1; j++) {
                const neighborRow = row + j;
                if (neighborRow < 0 || neighborRow >= this.numRows) 
                    continue;
                if (i === 0 && j === 0) 
                    continue;
                if (this._board[neighborCol][neighborRow]) 
                    numNeighbors++;
            }
        }
        return numNeighbors;
    }

    /* ******************************************************* */
    /* PUBLIC METHODS */
    /* ******************************************************* */
    isCellAlive = (col:number, row:number) => { return this._board[col][row]; }

    step = () => {
        // This is the game of life algorithm.
        // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
        const newBoard = this.initializeBoard();
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const numNeighbors = this.countNeighbors(col, row);
                if (this._board[col][row]) {
                    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                    // Any live cell with two or three live neighbours lives on to the next generation.
                    // Any live cell with more than three live neighbours dies, as if by overpopulation.
                    if (numNeighbors < 2 || numNeighbors > 3) {
                        newBoard[col][row] = false;
                    } else {
                        newBoard[col][row] = true;
                    }
                } else {
                    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                    if (numNeighbors === 3) {
                        newBoard[col][row] = true;
                    } else {
                        newBoard[col][row] = false;
                    }
                }
            }
        }
        this._board = newBoard;
        this.cloneBoard();
        this.generation++;
    }

    toggleCell = (col:number, row:number) => { 
        this._board[col][row] = !this._board[col][row];
        this.cloneBoard();
    }
}