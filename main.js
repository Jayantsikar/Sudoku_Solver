import { initializeBoard, updateBoard, clearBoard } from './board.js';
import { highlightCells, removeHighlights } from './highlight.js';
import { solveSudoku } from './solver.js';
import { generatePuzzle } from './generator.js';
import { loadExample } from './examples.js';

document.addEventListener('DOMContentLoaded', function() {
    const board = Array(9).fill().map(() => Array(9).fill(0));
    let fixedCells = Array(9).fill().map(() => Array(9).fill(false));
    const table = document.getElementById('sudoku-board');
    const solveBtn = document.getElementById('solve-btn');
    const clearBtn = document.getElementById('clear-btn');
    const exampleBtn = document.getElementById('example-btn');
    const generateBtn = document.getElementById('generate-btn');
    const difficultySelect = document.getElementById('difficulty');

    // Initialize the board
    initializeBoard(table, board, fixedCells);

    // Add event listeners for cell highlighting
    table.addEventListener('focusin', function(e) {
        if (e.target.tagName === 'INPUT') {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);
            highlightCells(table, row, col);
        }
    });

    table.addEventListener('focusout', function() {
        removeHighlights(table);
    });

    // Button event listeners
    solveBtn.addEventListener('click', function() {
        const result = solveSudoku(board);
        if (result.solved) {
            updateBoard(table, board, fixedCells);
        }
        alert(result.message);
    });

    clearBtn.addEventListener('click', function() {
        clearBoard(board, fixedCells);
        updateBoard(table, board, fixedCells);
    });

    exampleBtn.addEventListener('click', function() {
        loadExample(board, fixedCells);
        updateBoard(table, board, fixedCells);
    });

    generateBtn.addEventListener('click', function() {
        const difficulty = difficultySelect.value;
        generatePuzzle(board, fixedCells, difficulty);
        updateBoard(table, board, fixedCells);
    });
});