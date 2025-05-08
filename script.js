// Pobieramy referencję do elementu planszy
const board = document.querySelector("#board");
let currentPlayer = "X";

// Inicjalizujemy pustą planszę
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let winningCombo = [0, 0, 0];

// Prosimy użytkowników o podanie nazw graczy
let gracz_1 = prompt("Podaj nazwe 1 gracza");
let gracz_2 = prompt("Podaj nazwe 2 gracza");

// Funkcja do tworzenia planszy
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; 
        cell.addEventListener('click', handleCellClick); 
        board.appendChild(cell);
    }
}

// Funkcja obsługująca kliknięcie na komórce
function handleCellClick(event) {
    const messageTur = document.querySelector("#message");
    console.log('Kliknięto komórkę:', event.target.dataset.index);
    event.target.textContent = currentPlayer; 
    gameBoard[event.target.dataset.index] = currentPlayer; 
    console.log(checkWin()); // Sprawdzamy, czy ktoś wygrał

    if (checkWin()) {
        // Jeśli aktualny gracz wygrał, wyświetlamy komunikat
        if (currentPlayer === "X") {
            messageTur.textContent = `${gracz_1} wygrał!`;
        } else {
            messageTur.textContent = `${gracz_2} wygrał!`;
        }
        console.log(`${currentPlayer} wygrał!`);
        drawWinningLine(); 
    } else {
        // Jeśli nie ma zwycięzcy, zmieniamy gracza
        if (currentPlayer === "X") {
            currentPlayer = "O";
            messageTur.textContent = `Tura: ${gracz_2}`;
        } else {
            currentPlayer = "X";
            messageTur.textContent = `Tura: ${gracz_1}`;
        }
        // Usuwamy możliwość kliknięcia w tę komórkę
        event.target.removeEventListener("click", handleCellClick);
    }
}

createBoard(); // Tworzymy planszę

// Funkcja do sprawdzania, czy ktoś wygrał
function checkWin() {
    const winConditions = [
        [0, 1, 2], // Linie poziome
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Linie pionowe
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonale
        [2, 4, 6],
    ];

    // Sprawdzamy wszystkie warunki zwycięstwa
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winningCombo = condition; 
            return true; 
        }
    }
    
    return false; // Zwracamy false, jeśli nie ma zwycięzcy
}

// Obsługa przycisku resetowania gry
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetGame);

// Funkcja resetująca grę
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""]; 
    currentPlayer = "X"; 
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.textContent = ""; 
        cell.addEventListener("click", handleCellClick); 
    });

    // Usuwamy linię zwycięstwa, jeśli istnieje
    const jestLine = document.querySelector(".line");
    if (jestLine) {
        jestLine.remove();
    }

    document.getElementById("message").textContent = `Tura: ${gracz_1}`;
}

resetGame(); // Inicjujemy grę

// Funkcja rysująca linię zwycięstwa
function drawWinningLine() {
    const line = document.createElement("div");
    line.classList.add("line");
    board.appendChild(line);

    const start = winningCombo[0];
    const end = winningCombo[2];

    console.log(winningCombo[0], winningCombo[1], winningCombo[2]);
    console.log(winningCombo);

    // Logika rysowania linii w zależności od zwycięskiej kombinacji
    if (start === 0 && end === 2) {
        line.style.top = "50px";
        line.style.left = "0";
    } else if (start === 3 && end === 5) {
        line.style.top = "155px";
        line.style.left = "0";
    } else if (start === 6 && end === 8) {
        line.style.top = "260px";
        line.style.left = "0";
    } else if (start === 0 && end === 6) {
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "55px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 1 && end === 7) {
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "160px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 2 && end === 8) {
        line.style.width = "322px";
        line.style.top = "";
        line.style.left = "265px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 0 && end === 8) {
        line.style.width = "444px";
        line.style.top = "0";
        line.style.left = "3px";
        line.style.transform = "rotate(45.7deg)";
    } else if (start === 2 && end === 6) {
        line.style.width = "444px";
        line.style.top = "318px";
        line.style.left = "0";
        line.style.transform = "rotate(-45.5deg)";
    }
}

// Obsługa przycisku powiadomienia
document.getElementById('notifyButton').addEventListener('click', function() {
    var notification = document.getElementById('notification');
    
    if (notification.style.display === 'none' || notification.style.display === '') {
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
        }, 7000);
    } else {
        notification.style.display = 'none';
    }
});
