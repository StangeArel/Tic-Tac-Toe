let fields = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let player = "X";

function init() {
    render();
}

function render() {
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = generiereTemplateForStartTable();
    showPlayer();
}

function generiereTemplateForStartTable() {
    return `<table>
                <tr><td id="cell-0" onclick="setValue(0)">${fields[0]}</td><td id="cell-1" onclick="setValue(1)">${fields[1]}</td><td id="cell-2" onclick="setValue(2)">${fields[2]}</td></tr>
                <tr><td id="cell-3" onclick="setValue(3)">${fields[3]}</td><td id="cell-4" onclick="setValue(4)">${fields[4]}</td><td id="cell-5" onclick="setValue(5)">${fields[5]}</td></tr>
                <tr><td id="cell-6" onclick="setValue(6)">${fields[6]}</td><td id="cell-7" onclick="setValue(7)">${fields[7]}</td><td id="cell-8" onclick="setValue(8)">${fields[8]}</td></tr>
            </table>`;
}

function setValue(fieldIndex) {
    if (fields[fieldIndex] == "") {
        if (player == "X") {
            fields[fieldIndex] = "X";
        } else if (player == "O") {
            fields[fieldIndex] = "O";
        }
        if (!checkWinner()) {
            togglePlayer();
        }
        render();
    }
}

function showPlayer() {
    let playerXO = document.getElementById('playerXO');
    playerXO.innerHTML = player;
}

function togglePlayer() {
    if (player == "X") {
        player = "O";
    } else {
        player = "X";
    }
}

function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
        let onePattern = winPatterns[i];
        let a = onePattern[0];
        let b = onePattern[1];
        let c = onePattern[2];

        if (fields[a] !== "" && fields[a] === fields[b] && fields[b] === fields[c]) {
            document.getElementById(`cell-${a}`).classList.add("winning-cell");
            document.getElementById(`cell-${b}`).classList.add("winning-cell");
            document.getElementById(`cell-${c}`).classList.add("winning-cell");
            showMessage(`🎉 Spieler ${fields[a]} hat gewonnen!`);
            return true;
        }
        if (!fields.includes("")) {
            showMessage("🤝 Unentschieden!");
            return true;
        }
    }
    return false;
}


function showMessage(message) {
    let messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
}