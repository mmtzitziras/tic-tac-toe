/*---TIC TAC TOE----*/

function gameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i=0;i<rows*columns;i++){
        board[i] = "E";
    }


    const getBoard = () => {return board};

    const printBoard = () =>{
        for (let i=0;i<(rows*columns);i+=columns){
            console.log(board[i] + " " + board[i+1] + " " + board[i+2] + " ");
        }
    }

    const dropMark = (cell, player) => {

        const availableCells = board.filter((cell) => (cell === "E")).length;
        console.log(availableCells);

        if (availableCells === 0){return;}
        
        if (player===1){
            board[cell] = "X"
        }
        else{
            board[cell] = "O"
        }
    }


    return {getBoard, dropMark, printBoard};

}




function GameController(){
    playerOneName = "Marios";
    playerTwoName = "Krystalia";
    let winner = "";
    const board = gameBoard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkForWinner = (currentBoard) => {
        const winningCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2],
        ];

        for (let comb of winningCombs) {
            if (
                currentBoard[comb[0]] == currentBoard[comb[1]] &&
                currentBoard[comb[1]] == currentBoard[comb[2]] &&
                currentBoard[comb[0]] != 'E'
            ) {
                return true;
            }
        }
        
        return false;
    }

    const announceWinner =(winner) => {
        const winnerDiv = document.querySelector(".game-info");
        const winnerElem = document.createElement('div');
        winnerElem.classList.add("winner");
        winnerElem.textContent = winner;
        winnerDiv.appendChild(winnerElem);
        const boardDiv = document.querySelector(".board");
        const btns = boardDiv.querySelectorAll(button);
        btns.forEach((btn) => btn.disabled = true)
    }

    const playRound = (cell) => {

        board.dropMark(cell, getActivePlayer().token);

        if(checkForWinner(board.getBoard())){
            winner = getActivePlayer().name;
            announceWinner(winner);
            return;
        }

        switchPlayer();
        printNewRound();
    }

    return {
        playRound,
        getActivePlayer,
        getBoard : board.getBoard()
    };
}




function ScreenController(){
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');  
    
    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard;
        const activePlayer = game.getActivePlayer();


        playerTurnDiv.textContent = `${activePlayer.name} turn!`

        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.textContent = cell;
            cellButton.addEventListener("click", function(){
                game.playRound(index);
                updateScreen();   
            }
            );
            if (cellButton.textContent !== "E"){
                cellButton.disabled = true;
            }
            boardDiv.appendChild(cellButton);
        });      
    }

    const disableAllButtons = () =>{
        const board = game.getBoard;
        const activePlayer = game.getActivePlayer();


        playerTurnDiv.textContent = `${activePlayer.name} turn!`

        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.textContent = cell;
            cellButton.addEventListener("click", function(){
                game.playRound(index);
                updateScreen();   
            }
            );
            if (cellButton.textContent !== "E"){
                cellButton.disabled = true;
            }
            boardDiv.appendChild(cellButton);
        });      
    }

    updateScreen();
}


const newGameBtn = document.querySelector('.new-game')
newGameBtn.addEventListener("click", ScreenController);
ScreenController();