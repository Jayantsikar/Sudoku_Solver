// Initialize the Sudoku board and handle UI interactions
export function initializeBoard(table, board, fixedCells) {
    table.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = i;
            input.dataset.col = j;
            
            input.addEventListener('input', function(e) {
                const value = e.target.value;
                if (/^[1-9]$/.test(value)) {
                    board[i][j] = parseInt(value);
                    e.target.classList.remove('cell-error');
                } else {
                    e.target.value = '';
                    board[i][j] = 0;
                }
            });
            
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

export function updateBoard(table, board, fixedCells) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = table.rows[i].cells[j].querySelector('input');
            input.value = board[i][j] === 0 ? '' : board[i][j];
            if (fixedCells[i][j]) {
                input.classList.add('cell-fixed');
            } else {
                input.classList.remove('cell-fixed');
            }
        }
    }
}

export function clearBoard(board, fixedCells) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = 0;
            fixedCells[i][j] = false;
        }
    }
}