

function init() {
    render();
}

let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle';

function checkForWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]            // Diagonalen
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;

        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinLine(condition); // Zeichnet die Linie im Falle eines Gewinns
            return fields[a]; // Gibt den Gewinner zurück ('circle' oder 'cross')
        }
    }

    if (!fields.includes(null)) {
        return 'draw'; // Unentschieden, wenn keine null im Feld vorhanden ist
    }

    return null; // Kein Gewinner oder Unentschieden
}
function drawWinLine(winCondition) {
    // Holen Sie sich die Position und Größe des Tisches
    const table = document.getElementById('content').querySelector('table');
    const tableRect = table.getBoundingClientRect();
    const cellSize = tableRect.width / 3;

    let startPos = getCellPosition(winCondition[0], cellSize);
    let endPos = getCellPosition(winCondition[2], cellSize);

    const svgHTML = `
        <svg class="win-line" style="position: absolute; top: ${tableRect.top}px; left: ${tableRect.left}px; width: ${tableRect.width}px; height: ${tableRect.height}px; pointer-events: none;">
            <line x1="${startPos.x}" y1="${startPos.y}" x2="${endPos.x}" y2="${endPos.y}" stroke="#FFFFFF" stroke-width="4"/>
        </svg>
    `;

    document.body.insertAdjacentHTML('beforeend', svgHTML); // Fügt die Linie zum Body hinzu
}

function getCellPosition(cellIndex, cellSize) {
    const x = (cellIndex % 3) * cellSize + cellSize / 2; // Zentrum der Zelle
    const y = Math.floor(cellIndex / 3) * cellSize + cellSize / 2; // Zentrum der Zelle
    return { x, y };
}




function cellClicked(i) {
    // Prüfen, ob das Feld bereits belegt ist
    if (fields[i] || checkForWin()) return;

    // Füge das Wort "circle" oder "cross" in das Array ein
    fields[i] = currentPlayer;

    // Aktualisiere das angeklickte Feld mit der entsprechenden Animation
    const clickedCell = document.getElementById(`cell-${i}`);
    if (currentPlayer === 'circle') {
        clickedCell.innerHTML = generateCircleSVG();
    } else if (currentPlayer === 'cross') {
        clickedCell.innerHTML = generateCrossSVG();
    }

    // Entferne das onclick-Attribut von dem jeweiligen <td>-Element
    clickedCell.removeAttribute('onclick');
    
    // Wechsle den Spieler
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    checkForWin();
}



function render() {
    let tableHtml = "";

    for (let i = 0; i < 3; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) {
            let cellIndex = i * 3 + j;
            let clickAttribute = fields[cellIndex] ? '' : `onclick="cellClicked(${cellIndex})"`;
            
            tableHtml += `<td id="cell-${cellIndex}" ${clickAttribute}></td>`; // Fügen Sie die Zelle hinzu
        }
        tableHtml += "</tr>";
    }

    document.getElementById("content").innerHTML = `<table>${tableHtml}</table>`;
}


// Ihre generateCircleSVG und generateCrossSVG Funktionen bleiben unverändert

function generateCircleSVG() {
    const svgHTML = `
        <svg width="70px" height="70px" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="#00B0EF" stroke-width="2">
                <animate attributeName="stroke-dasharray" from="0, 88" to="88, 0" dur="2s" repeatCount="1" fill="freeze"/>
            </circle>
        </svg>
    `;

    return svgHTML;
}

function generateCrossSVG() {
    return `
        <svg width="70px" height="70px" viewBox="0 0 32 32">
            <!-- Gruppe für das Kreuz -->
            <g transform="rotate(45 16 16)">
                <!-- Horizontale Linie -->
                <rect x="7" y="14" width="18" height="4" fill="#FFC000">
                    <animate attributeName="width" from="0" to="18" dur="2s" fill="freeze" repeatCount="1"/>
                </rect>
                <!-- Vertikale Linie -->
                <rect x="14" y="7" width="4" height="18" fill="#FFC000">
                    <animate attributeName="height" from="0" to="18" dur="2s" fill="freeze" repeatCount="1"/>
                </rect>
            </g>
        </svg>
    `;
}
