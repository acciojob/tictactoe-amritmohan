document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");
    const playerInput = document.getElementById("player-input");
    const gameDiv = document.getElementById("game");
    const messageDiv = document.getElementById("message");
    const boardDiv = document.getElementById("board");

    if (!submitButton || !playerInput || !gameDiv || !messageDiv || !boardDiv) {
        console.error("One or more required elements are missing!");
        return;
    }

    let player1 = "", player2 = "", currentPlayer;
    let board = ["", "", "", "", "", "", "", "", ""];
    let turn = "X";

    submitButton.addEventListener("click", () => {
        player1 = document.getElementById("player1").value.trim();
        player2 = document.getElementById("player2").value.trim();
        
        if (player1 && player2) {
            playerInput.style.display = "none";  // Hide input section
            gameDiv.style.display = "block";     // Show game board
            currentPlayer = player1;
            messageDiv.textContent = `${currentPlayer}, you're up`;
            createBoard();
        } else {
            alert("Both player names are required!");
        }
    });

    function createBoard() {
        boardDiv.innerHTML = "";
        board = Array(9).fill("");  // Reset board array

        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            cell.addEventListener("click", handleMove, { once: true });
            boardDiv.appendChild(cell);
        }
    }

    function handleMove(event) {
        let cell = event.target;
        let index = parseInt(cell.id);

        if (!board[index]) {
            board[index] = turn;
            cell.textContent = turn;

            if (checkWinner()) {
                messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
                disableBoard();
                return;
            }

            turn = turn === "X" ? "O" : "X";
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up`;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function disableBoard() {
        document.querySelectorAll(".cell").forEach(cell => cell.replaceWith(cell.cloneNode(true)));
    }
});
