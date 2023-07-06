document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.grid-cell');
    const currentPlayer = document.querySelector('.current-player');
    const gameOverText = document.querySelector('.game-over-text');
    const restartButton = document.querySelector('.restart');

    let turn = 'X';
    let gameOver = false;

    // Initialize the game
    currentPlayer.textContent = "It's X's turn";
    cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });
    restartButton.addEventListener('click', restartGame);

    function handleClick() {
      if (gameOver || this.classList.contains('disabled')) {
        return;
      }

      this.classList.add(turn.toLowerCase());
      this.classList.add('disabled');
      this.textContent = turn;

      if (checkWin(turn)) {
        currentPlayer.textContent = '';
        gameOverText.textContent = `${turn} wins!`;
        gameOver = true;
        return;
      }

      if (checkDraw()) {
        currentPlayer.textContent = '';
        gameOverText.textContent = 'Draw!';
        gameOver = true;
        return;
      }

      turn = turn === 'X' ? 'O' : 'X';
      currentPlayer.textContent = `It's ${turn}'s turn`;
    }
    function checkWin(player) {
        const winningCombinations = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
          [0, 4, 8], [2, 4, 6] // diagonals
        ];
      
        return winningCombinations.some(combination => {
          return combination.every(index => {
            const cell = cells[index];
            return cell.classList.contains(player.toLowerCase());
          });
        });
      }
      
      function checkDraw() {
        return Array.from(cells).every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
      }
      
      function restartGame() {
        cells.forEach(cell => {
          cell.classList.remove('x', 'o', 'disabled');
          cell.textContent = '';
        });
      
        currentPlayer.textContent = "It's X's turn";
        gameOverText.textContent = '';
        gameOver = false;
        turn = 'X';
      }
      
      });