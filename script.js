let fields = [
    "", "", "",
    "", "", "",
    "", "", ""
]; 

function init() {
    render();
}

function render() {
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = generiereTemplateForStartTable();
}

function generiereTemplateForStartTable() {
    return `<table>
                <tr><td onclick="setValue(0)">${fields[0]}</td><td onclick="setValue(1)">${fields[1]}</td><td onclick="setValue(2)">${fields[2]}</td></tr>
                <tr><td onclick="setValue(3)">${fields[3]}</td><td onclick="setValue(4)">${fields[4]}</td><td onclick="setValue(5)">${fields[5]}</td></tr>
                <tr><td onclick="setValue(6)">${fields[6]}</td><td onclick="setValue(7)">${fields[7]}</td><td onclick="setValue(8)">${fields[8]}</td></tr>
            </table>`;
}

function setValue(fieldIndex) {
    fields[fieldIndex] = "X";
    render();
}

