let fields = [
    'circle',
    'circle',
    'circle',
    null,
    'cross',
    'cross',
    null,
    'circle',
    null
];

function init() {
    render();
}

function render() {
    let board = document.getElementById('content');
    board.innerHTML = '';
    createCells(board);
}

function createCells(board) {
    for (let i = 0; i < fields.length; i++) {
        let cell = createCell(i);
        board.appendChild(cell);
    }
}

function createCell(index) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    setCellContent(cell, index);
    cell.addEventListener('click', () => markField(index));
    return cell;
}

function setCellContent(cell, index) {
    if (fields[index] === 'cross') {
        cell.textContent = 'X';
    } else if (fields[index] === 'circle') {
        cell.textContent = 'O';
    }
}

function markField(index) {
    if (!fields[index]) {
        fields[index] = 'cross';
        render();
    }
}
