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

    // board restart button
    $("#end_reset").on("click", function () {
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
            let tiles = []
            for (let i = 0; i < 3; i++){
                if (arr[i][0] === turn && arr[i][1] === turn && arr[i][2] === turn){
                    win = true
                    tiles = [i+'0', i+'1', i+'2']
                }
                if (arr[0][i] === turn && arr[1][i] === turn && arr[2][i] === turn){
                    win = true
                    tiles = ['0'+i, '1'+i, '2'+i]
                }
            }
            if (arr[0][0] === turn && arr[1][1] === turn && arr[2][2] === turn){
                win = true
                tiles = ['00', '11', '22']
            }
            if (arr[0][2] === turn && arr[1][1] === turn && arr[2][0] === turn){
                win = true
                tiles = ['02', '11', '20']
            }
            if (win === true){
                if (turn === 1){
                    X++
                }
                else {
                    O++
                }
                setTimeout(function (){animateWin(tiles)}, 200)
                restartBoardPopup()
                updateScore()
                return
            }
        }
        // check Tie
        if (turnCounter === 9){
            tie++
            restartBoardPopup()
            setTimeout(function (){animateTie()}, 200)
            updateScore()
        }
        // not ended yet
    }

    function resetBoard(){
        $("#board > div").empty()
        $("#end_reset").css("z-index", 1)
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
        // turn = 0 -> O
        if (turn === 0){
            let tile = "<div class='O h-100 w-100' style='opacity: 0'></div>"
            $(object).append(tile)
            $(object).children().animate({opacity: 1}, 200)
        }
        // turn = 1 -> X
        else if (turn === 1){
            let tile = "<div class='X h-100 w-100' style='opacity: 0'></div>"
            $(object).append(tile)
            $(object).children().animate({opacity: 1}, 200)
        }
    }

    function animateWin(tiles){
        // reduce other tiles opacity
        $('#board').children().children().animate({opacity: 0.2}, 100)
        // make winning tiles blink
        setTimeout(function (){
            for (let tile of tiles){
                let object = $("[position='" + tile + "']").children()
                object.animate({opacity: 1}, 100)
                object.animate({opacity: 0.2}, 100)
                object.animate({opacity: 1}, 100)
                object.animate({opacity: 0.2}, 100)
                object.animate({opacity: 1}, 100)
            }
        }, 100)
    }

    function animateTie(){
        // reduce all tiles opacity
        $('#board').children().children().animate({opacity: 0.2}, 100)}

    function restartBoardPopup(){
        $("#end_reset").css("z-index", 3)
    }
})