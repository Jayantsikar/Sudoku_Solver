export function highlightCells(table, row, col) {
    removeHighlights(table);
    // Highlight row and column
    for (let i = 0; i < 9; i++) {
        table.rows[row].cells[i].classList.add('cell-highlight');
        table.rows[i].cells[col].classList.add('cell-highlight');
    }
    // Highlight 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            table.rows[i].cells[j].classList.add('cell-highlight');
        }
    }
}

export function removeHighlights(table) {
    const cells = document.querySelectorAll('#sudoku-board td');
    cells.forEach(cell => {
        cell.classList.remove('cell-highlight');
    });
}