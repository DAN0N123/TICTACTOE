const board = document.querySelector('.board');
let move = 0;


const makePlayer = function(name){
    const playerName = name;
    let score = 0;
    const addScore = function(){
        this.score++;
    } 
    return { playerName, score, addScore }
}
let player1 = makePlayer('Player 1')
let player2 = makePlayer('Player 2')


const makeTile = function(id){
    this.symbol = null;
    this.id = id
    return { symbol, id }
}
const gameboard = (function() {
    let boardArr = [];
    
    for (let i = 0; i < 9; i++){
        tileObj = makeTile(i);
        boardArr.push(tileObj)
        
    }
    const printBoard = function(){
        boardArr.forEach((tile) => {
            switch(tile.symbol){
                case 'X':
                    const xNodeDiv = document.createElement('div')
                    xNodeDiv.classList.add('tile')
                    const xNode = document.createElement('img');
                    xNode.setAttribute('src', 'ttcX.png') ;
                    xNodeDiv.appendChild(xNode)
                    board.appendChild(xNodeDiv)
                    break;
                case 'O':
                    const oNodeDiv = document.createElement('div')
                    oNodeDiv.classList.add('tile')
                    const oNode = document.createElement('img');
                    oNode.setAttribute('src', 'ttcO.png');
                    oNodeDiv.appendChild(oNode)
                    board.appendChild(oNodeDiv)
                    break;
                default:
                    const tileNode = document.createElement('div');
                    tileNode.classList.add('tile');
                    tileNode.addEventListener('click', () => markTile(tile.id, move % 2 == 0 ? 'X':'O'))
                    tileNode.setAttribute('id', tile.id);
                    board.appendChild(tileNode);
            }
        })
    }

    const checkWin = function(){
        const winningCombinations = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [1,4,8], [2,4,6]
        ]
        winningCombinations.forEach(function(combination){
            [a,b,c] = combination;
            if(boardArr[a].symbol === boardArr[b].symbol &&
                boardArr[b].symbol === boardArr[c].symbol &&
                boardArr[a].symbol !== null){
                const winningPlayer = move % 2 === 0 ? player2.playerName : player1.playerName;
                const line = document.createElement('div');
                const max_row = Math.floor((Math.max(a,b,c) + 1) / 3) + 1;
                const min_row = Math.floor((Math.min(a,b,c) + 1) / 3) + 2;
                const min_col = Math.min(a, b, c) % 3 + 1;
                const max_col = Math.max(a, b, c) % 3 + 2;
                line.classList.add('line')
                line.style.cssText = `background-color: ${winningPlayer === player1.playerName ? 'red':'blue'}; 
                                      position: absolute;
                                      height: 20px;
                                      width: calc(100% - 3px);`

                line.style.gridRow = `${min_row} / ${max_row}`;
                line.style.gridColumn = `${min_col} / ${max_col}`;
                board.appendChild(line)
                console.log(`${winningPlayer} has won!`)
            }
        })
    }

    const resetBoard = function(){
        board.innerHTML = '';
    }
    const markTile = function(which, symbol){
        boardArr[which].symbol = symbol;
        resetBoard();
        printBoard();
        move++;
        checkWin();
    }
    return { board, printBoard, markTile, resetBoard}
})();

const displayController = (function() {
    return { }
})









const scoreboard = document.querySelector('.scoreboard')
const players = document.createElement('h2')
players.textContent = `${player1.playerName} : ${player2.playerName}`
scoreboard.appendChild(players)
const score = document.createElement('h1');
score.textContent = `${player1.score} : ${player2.score}`
scoreboard.appendChild(score)
gameboard.printBoard()
