import { solveHelper, isValidPlacement } from './solver.js';
import {  clearBoard } from './board.js';

export function generatePuzzle(board, fixedCells, difficulty) {
    clearBoard(board, fixedCells);
    
    // First solve an empty board to get a complete solution
    solveHelper(board, 0, 0);
    
    // Then remove numbers based on difficulty
    let cellsToRemove;
    switch(difficulty) {
        case 'easy': cellsToRemove = 40; break;
        case 'medium': cellsToRemove = 50; break;
        case 'hard': cellsToRemove = 55; break;
        default: cellsToRemove = 50;
    }
    
    let cellsRemoved = 0;
    while (cellsRemoved < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        
        if (board[row][col] !== 0) {
            const temp = board[row][col];
            board[row][col] = 0;
            
            if (countSolutions(JSON.parse(JSON.stringify(board))) === 1) {
                fixedCells[row][col] = false;
                cellsRemoved++;
            } else {
                board[row][col] = temp;
            }
        }
    }
    
    // Mark remaining cells as fixed
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fixedCells[i][j] = board[i][j] !== 0;
        }
    }
}

function countSolutions(tempBoard) {
    let solutionCount = 0;
    
    function countHelper(row, col) {
        if (row === 9) {
            solutionCount++;
            return;
        }
        if (col === 9) return countHelper(row + 1, 0);
        if (tempBoard[row][col] !== 0) return countHelper(row, col + 1);
        
        for (let num = 1; num <= 9 && solutionCount < 2; num++) {
            if (isValidPlacement(tempBoard, row, col, num)) {
                tempBoard[row][col] = num;
                countHelper(row, col + 1);
                tempBoard[row][col] = 0;
            }
        }
    }
    
    countHelper(0, 0);
    return solutionCount;
}