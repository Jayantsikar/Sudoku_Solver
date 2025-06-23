export function solveSudoku(board) {
    if (!isValidBoard(board)) {
        return { solved: false, message: 'The current board has conflicts.' };
    }
    
    const result = solveHelper(board, 0, 0);
    return {
        solved: result,
        message: result ? 'Solved successfully!' : 'No solution exists.'
    };
}

export function solveHelper(board, row, col) {
    if (row === 9) return true;
    if (col === 9) return solveHelper(board, row + 1, 0);
    if (board[row][col] !== 0) return solveHelper(board, row, col + 1);
    
    for (let num = 1; num <= 9; num++) {
        if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (solveHelper(board, row, col + 1)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}

export function isValidPlacement(board, row, col, num) {
    // Check row
    for (let j = 0; j < 9; j++) {
        if (board[row][j] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }
    
    return true;
}

export function isValidBoard(board) {
    // Check rows
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                if (rowSet.has(board[i][j])) return false;
                rowSet.add(board[i][j]);
            }
        }
    }
    
    // Check columns
    for (let j = 0; j < 9; j++) {
        const colSet = new Set();
        for (let i = 0; i < 9; i++) {
            if (board[i][j] !== 0) {
                if (colSet.has(board[i][j])) return false;
                colSet.add(board[i][j]);
            }
        }
    }
    
    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const boxSet = new Set();
            for (let i = boxRow * 3; i < boxRow * 3 + 3; i++) {
                for (let j = boxCol * 3; j < boxCol * 3 + 3; j++) {
                    if (board[i][j] !== 0) {
                        if (boxSet.has(board[i][j])) return false;
                        boxSet.add(board[i][j]);
                    }
                }
            }
        }
    }
    
    return true;
}