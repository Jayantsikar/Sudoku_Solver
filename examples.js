import {  clearBoard } from './board.js';
export function loadExample(board, fixedCells) {
    clearBoard(board, fixedCells);
    
    const example = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (example[i][j] !== 0) {
                board[i][j] = example[i][j];
                fixedCells[i][j] = true;
            }
        }
    }
}