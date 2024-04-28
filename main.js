/*---TIC TAC TOE----*/

function gameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i=0;i<rows*columns;i++){
        board[i] = "";
    }


    const getBoard = () => {return board};

    const dropMark = (cell, player) => {
        const availableCells = board.filter(cell => cell.getValue() === "");

        if (availableCells === 0){
            
        }
    }

}

const g = new gameBoard();
