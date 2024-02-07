const board = document.querySelector('.board');
const bigbox = document.querySelector('.bigbox');
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
    const drawBoard = function(){
        drawScoreboard()
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
            [0,4,8], [2,4,6]
        ]
        winningCombinations.forEach(function(combination){
            [a,b,c] = combination;
            if(boardArr[a].symbol === boardArr[b].symbol &&
                boardArr[b].symbol === boardArr[c].symbol &&
                boardArr[a].symbol !== null){
                const winningPlayer = move % 2 === 0 ? player2.playerName : player1.playerName;
                
                const gridContainerWidth = board.offsetWidth;

                const startRow = Math.min(Math.floor(a / 3), Math.floor(b / 3), Math.floor(c / 3));
                const endRow = Math.max(Math.floor(a / 3), Math.floor(b / 3), Math.floor(c / 3)) + 1;
                const startCol = Math.min(a % 3, b % 3, c % 3);
                const endCol = Math.max(a % 3, b % 3, c % 3) + 1;

                const numRows = 3;
                const numColumns = 3;
                const cellWidth = gridContainerWidth / numColumns;
                const cellHeight = gridContainerWidth / numRows;
                
                const middleX = cellWidth / 2;
                const middleY = cellHeight / 2;

                const x1 = startCol * cellWidth + middleX;
                const y1 = startRow * cellHeight + middleY;
                const x2 = (endCol + 1) * cellWidth - middleX*3;
                const y2 = (endRow + 1) * cellHeight - middleY*3; 


                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.classList.add('line')
                line.setAttribute("x1", x1);
                line.setAttribute("y1", y1);
                line.setAttribute("x2", x2);
                line.setAttribute("y2", y2);
                // line.setAttribute("stroke", winningPlayer === player1.playerName ? '#FF615E' : '#3EC5F3');
                line.setAttribute("stroke", 'black')
                line.setAttribute("stroke-width", "20");

                svg.appendChild(line);
                board.appendChild(svg);
                if(player1.playerName === winningPlayer){
                    player1.addScore()
                }else{ player2.addScore() }
                drawScoreboard()
                showWinScreen(winningPlayer)
            }
        })
    }
    const drawScoreboard = function(){
        const scoreboard = document.querySelector('.scoreboard');
        scoreboard.innerHTML = '';
        const players = document.createElement('h2');
        players.textContent = `${player1.playerName} : ${player2.playerName}`;
        scoreboard.appendChild(players);
        const score = document.createElement('h1');
        score.textContent = `${player1.score} : ${player2.score}`;
        scoreboard.appendChild(score);
    }
    const resetBoard = function(){
        board.innerHTML = '';
    }
    const resetGame = function(){
        resetBoard();
        boardArr.forEach( (tile) => tile.symbol = null);
        drawBoard();
        move = 0;
        displayController.removeWinScreen()
    }
    const showWinScreen = function(winningPlayer){
        boardArr.forEach( (tile) => {
            const tileElement = document.getElementById(tile.id)
            if (tile.symbol === null){
                tileElement.removeEventListener('click', markTile)}});
        const winScreen = document.createElement('div');
        winScreen.classList.add('winscreen')
        const winText = document.createElement('h2');
        winText.textContent = `${winningPlayer} has won!`;
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttons')
        const restartButton = document.createElement('button');
        restartButton.addEventListener('click', resetGame)
        restartButton.textContent = 'PLAY AGAIN';
        const newGameButton = document.createElement('button');
        newGameButton.addEventListener('click', displayController.newGame)
        newGameButton.textContent = 'NEW GAME';
        buttonDiv.appendChild(restartButton);
        buttonDiv.appendChild(newGameButton);
        winScreen.appendChild(winText);
        winScreen.appendChild(buttonDiv);
        bigbox.appendChild(winScreen);
    }
    const markTile = function(which, symbol){
        boardArr[which].symbol = symbol;
        resetBoard();
        drawBoard();
        move++;
        checkWin();
    }
    return { board, drawBoard, markTile, resetBoard, resetGame, drawScoreboard}
})();

const displayController = (function() {
    const removeWinScreen = function(){
        const winScreen = document.querySelector('.winscreen');
        bigbox.removeChild(winScreen);
    }
    const newGame = function(){
        console.log('yo');
        gameboard.resetGame();
        player1 = makePlayer(prompt('Provide name for player one: '));
        player2 = makePlayer(prompt('Provide name for player two: '));
        gameboard.drawScoreboard();
    };
    return { newGame, removeWinScreen};
})();










gameboard.drawBoard()
