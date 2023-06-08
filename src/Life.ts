import React from 'react'

export default class Life {
    // The board should be read only outside of the class to maintain a
    // single source of truth.

    // This is a nasty hack to make a readonly observable copy of the board.
    // I'm sure there's a library out there that does it better.

    // This is the "real" board.
    private _board: boolean[][];

    // This is a copy of the board that gets updated when the board is updated.
    board: readonly(readonly boolean[])[];

    numRows:number;
    numCols:number;

    constructor(numRows:number, numCols:number) {
        this.numRows = numRows;
        this.numCols = numCols;
        this._board = this.initializeBoard()
        this.board = [...this._board]
    }

    /* ******************************************************* */
    /* PRIVATE METHODS */
    /* ******************************************************* */
    private initializeBoard():boolean[][] {
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

    /* ******************************************************* */
    /* PUBLIC METHODS */
    /* ******************************************************* */
    isCellAlive(col:number, row:number):boolean { return this._board[col][row]; }

    toggleCell(col:number, row:number):void { 
        console.log(`Togglin before: ${col}, ${row}, ${this._board[col][row]}`);
        this._board[col][row] = !this._board[col][row];
        this.board = [...this._board]
        console.log(`Togglin after: ${col}, ${row}, ${this._board[col][row]}`);
    }
}