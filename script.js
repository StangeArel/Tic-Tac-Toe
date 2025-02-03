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

let gameOver = false;
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
    if (fields[fieldIndex] == "" && !gameOver) {
        if (player == "X") {
            fields[fieldIndex] = generateAnimatedCross();
        } else if (player == "O") {
            fields[fieldIndex] = generateAnimatedSVG();

        }

        let winFields = checkWinner();

        if (winFields === false) {
            togglePlayer();
        }

        render();

        if (winFields) {
            highlightWinFields(winFields);
            gameOver = true;
        }
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
            showMessage(`🎉 Spieler <span id="playerXO">${fields[a]}</span> hat gewonnen!`);
            return onePattern;
        }
        if (!fields.includes("")) {
            showMessage("🤝 Unentschieden!");
            return;
        }
    }
    return false;
}

function highlightWinFields (onePattern) {
    let a = onePattern[0];
    let b = onePattern[1];
    let c = onePattern[2];
    document.getElementById(`cell-${a}`).classList.add("winning-cell");
    document.getElementById(`cell-${b}`).classList.add("winning-cell");
    document.getElementById(`cell-${c}`).classList.add("winning-cell");
}

function showMessage(message) {
    let messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
}

function resetGame() {
    fields = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    player = "X";
    showMessage("");
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).classList.remove("winning-cell");
    }
    render();
}

function generateAnimatedSVG(size = 60, color = "rgb(255, 94, 0)") {
    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 5}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="157 157" stroke-dashoffset="157">
                <animate attributeName="stroke-dashoffset" from="157" to="0" dur="0.8s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateAnimatedCross(size = 60, color = "rgb(217, 183, 14)") {
    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="${size - 10}" y2="${size - 10}" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="85" stroke-dashoffset="85">
                <animate attributeName="stroke-dashoffset" from="85" to="0" dur="0.8s" fill="freeze" />
            </line>
            <line x1="${size - 10}" y1="10" x2="10" y2="${size - 10}" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="85" stroke-dashoffset="85">
                <animate attributeName="stroke-dashoffset" from="85" to="0" dur="0.8s" fill="freeze" />
            </line>
        </svg>
    `;
}