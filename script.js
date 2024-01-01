// let fields = [null, null, cross, null, circle, null, null, null, null];

function init() {
    // Rufen Sie die render-Funktion auf, um das Spielbrett anzuzeigen
    render();
}

// Das Array, das den Zustand des Spielfelds speichert
let fields = [
    null, 'circle', 'circle',
    null, 'cross', 'cross',
    'cross', null, null,
];

// Die alternative render-Funktion
function render() {
    // Definieren Sie einen leeren String für die Tabelle
    let tableHtml = '';

    // Generieren Sie die Tabelle als String mit Template-Literalen
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>'; // Start einer neuen Zeile
        for (let j = 0; j < 3; j++) {
            let cellValue = fields[i * 3 + j];
            let cellText = cellValue === 'circle' ? 'O' : cellValue === 'cross' ? 'X' : '';
            tableHtml += `<td>${cellText}</td>`; // Fügen Sie Zellen hinzu
        }
        tableHtml += '</tr>'; // Ende der Zeile
    }

    // Fügen Sie die generierte Tabelle zum div-Container hinzu
    document.getElementById('content').innerHTML = `<table>${tableHtml}</table>`;
}

