$(document).ready(function () {
    // page load
    // games stats
    let X = 0
    let O = 0
    let tie = 0
    let start = 1 // X: 1, O: 0

    // game variables
    let arr = [[null, null, null], [null, null, null], [null, null, null]]
    let turn = start // X: 1, O: 0
    let turnCounter = 0

    // playing
    $("#board > div").on("click", function () {
        nextMove(this)
    })

    // reset button
    $("#reset").on("click", function () {
        X = 0
        O = 0
        tie = 0
        updateScore()
        resetBoard()
    })

    function nextMove(object){
        let position = Number($(object).attr('position'))
        let column = position % 10
        let row = (position - column) / 10
        if (arr[row][column] === null){
            turnCounter++
            if (turn === 1){
                arr[row][column] = 1
                markTile(object)
                checkWin()
                turn = 0
            }
            else {
                arr[row][column] = 0
                markTile(object)
                checkWin()
                turn = 1
            }
        }
    }

    function checkWin(){
        for (let turn = 0; turn <= 1; turn++) {
            let win = false
            for (let i = 0; i < 3; i++){
                if (arr[i][0] === turn && arr[i][1] === turn && arr[i][2] === turn){
                    win = true
                }
                if (arr[0][i] === turn && arr[1][i] === turn && arr[2][i] === turn){
                    win = true
                }
            }
            if (arr[0][0] === turn && arr[1][1] === turn && arr[2][2] === turn){
                win = true
            }
            if (arr[0][2] === turn && arr[1][1] === turn && arr[2][0] === turn){
                win = true
            }
            if (win === true){
                if (turn === 1){
                    X++
                    alert("X won.")
                }
                else {
                    O++
                    alert("O won.")
                }
                setTimeout(resetBoard, 1000)
                // resetBoard()
                updateScore()
                return
            }
        }
        // check Tie
        if (turnCounter === 9){
            tie++
            alert("Tie.")
            setTimeout(resetBoard, 1000)
            updateScore()
        }
        // not ended yet
    }

    function resetBoard(){
        $("#board > div").removeClass("X O")
        arr = [[null, null, null], [null, null, null], [null, null, null]]
        start = !start // changes the starting player each turn
        turn = Number(start) // X: 1, O: 0
        turnCounter = 0
    }

    function updateScore(){
        $("#x").text(X)
        $("#o").text(O)
        $("#tie").text(tie)
    }

    function markTile(object){
        // turn = 1 -> x
        if (turn === 0){
            $(object).addClass('O')
        }
        else if (turn === 1){
            $(object).addClass('X')
        }
    }
})

