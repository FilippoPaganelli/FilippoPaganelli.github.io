const ROWS = 11
const COLS = 10
var black_tiles = 0
var guessed = 0
var toWin = 0

$(function() {
    make_board()
    make_clues(9)
});

make_board = function() {
    for (var i = 0; i < COLS; i++) {
        $("#crossword").append('<tr id="' + 'row_' + i + '"></tr>')
        for (var j = 0; j < ROWS; j++) {

            var index = i * ROWS + j
            var sol = solutions[index].letter

            if (sol == '-') {
                $("#row_" + i).append('<td class="gray" id="' + index + '"></td>')
                black_tiles++
            } else {
                $("#row_" + i).append('<td id="td_' + index + '" class="cream">' +
                    '<input onkeyup="cellHandler(' + index + ')" onfocus="selectCell(' + index + ')" id="' + index +
                    '" maxlength="1" class="input-cell" type="text"/>' +
                    '<sup class="cell-number"></sup></td>')
            }
        }
    }
    toWin = COLS * ROWS - black_tiles
    $("#remaing_letters").text(toWin)
}

make_clues = function() {

}

cellHandler = function(index) {
    var cell = document.getElementById(index)
    var value = cell.value

    if (value === ' ' || value.length === 0) {
        cell.value = ''
    } else {
        var next = (index + 1) % 110

        while ($('#' + next).hasClass('gray')) {
            next = (next + 1) % 110
        }

        $('#' + next).focus()
    }
}

selectCell = function(index) {
    if ($("#" + index).val() !== undefined && $("#" + index) !== '') {
        document.getElementById(index).select()
        $("#" + index).removeAttr('style')
    }
}

checkLetters = function() {
    var correct = ''
    guessed = 0
    for (var index = 0; index < 110; index++) {
        var letter = document.getElementById(index).value
        if (letter !== undefined && letter.length !== 0) {
            correct = solutions[index].letter
            if (letter !== correct) {
                $("#" + index).css({ 'color': 'red' })
            } else guessed++
        }
        if (guessed === toWin) {
            $(":input").css({ 'color': 'green' })
            alert('Well done!\n\nYou completed this crossword.')
        }
        $("#remaing_letters").text(toWin - guessed)
    }
}

resetBoard = function() {
    $("#remaing_letters").text(toWin)
    $(":input").val('')
    $(":input").removeAttr('style')
    var index = 0
    while ($('#' + index).hasClass('gray')) {
        index = (index + 1) % 110
    }
    $("#" + index).focus()
}