const ROWS = 11
const COLS = 10
var black_tiles = 0
var guessed = 0
var toWin = 0

let solutions = [{ "letter": "d", "number": 1 }, { "letter": "i", "number": 2 }, { "letter": "s", "number": 3 }, { "letter": "p", "number": 4 }, { "letter": "e", "number": 5 }, { "letter": "r", "number": 6 }, { "letter": "d", "number": 7 }, { "letter": "e", "number": 8 }, { "letter": "r", "number": "-" }, { "letter": "a", "number": 9 }, { "letter": "-", "number": "-" }, { "letter": "c", "number": 10 }, { "letter": "a", "number": "-" }, { "letter": "l", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "m", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "i", "number": "-" }, { "letter": "o", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "d", "number": 11 }, { "letter": "a", "number": 12 }, { "letter": "-", "number": "-" }, { "letter": "n", "number": 13 }, { "letter": "a", "number": "-" }, { "letter": "s", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "t", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "i", "number": 14 }, { "letter": "o", "number": "-" }, { "letter": "r", "number": "-" }, { "letter": "s", "number": 15 }, { "letter": "s", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "a", "number": 16 }, { "letter": "t", "number": "-" }, { "letter": "t", "number": "-" }, { "letter": "r", "number": "-" }, { "letter": "a", "number": 17 }, { "letter": "t", "number": "-" }, { "letter": "t", "number": "-" }, { "letter": "i", "number": "-" }, { "letter": "p", "number": 18 }, { "letter": "a", "number": "-" }, { "letter": "n", "number": 19 }, { "letter": "-", "number": "-" }, { "letter": "i", "number": 20 }, { "letter": "o", "number": "-" }, { "letter": "r", "number": "-" }, { "letter": "n", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "t", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "i", "number": 21 }, { "letter": "n", "number": "-" }, { "letter": "b", "number": "-" }, { "letter": "a", "number": 22 }, { "letter": "t", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "e", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "l", "number": 23 }, { "letter": "a", "number": "-" }, { "letter": "n", "number": "-" }, { "letter": "c", "number": 24 }, { "letter": "t", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "s", "number": 25 }, { "letter": "e", "number": "-" }, { "letter": "d", "number": 26 }, { "letter": "a", "number": "-" }, { "letter": "n", "number": 27 }, { "letter": "i", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "o", "number": "-" }, { "letter": "c", "number": 28 }, { "letter": "e", "number": "-" }, { "letter": "c", "number": 29 }, { "letter": "o", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "n", "number": 30 }, { "letter": "a", "number": "-" }, { "letter": "o", "number": 31 }, { "letter": "-", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "-", "number": "-" }, { "letter": "a", "number": 32 }, { "letter": "l", "number": "-" }, { "letter": "i", "number": 33 }, { "letter": "t", "number": "-" }, { "letter": "o", "number": 34 }, { "letter": "-", "number": "-" }, { "letter": "n", "number": 35 }, { "letter": "u", "number": "-" }, { "letter": "m", "number": 36 }, { "letter": "-", "number": "-" }, { "letter": "f", "number": 37 }, { "letter": "r", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "m", "number": "-" }, { "letter": "a", "number": "-" }, { "letter": "r", "number": "-" }, { "letter": "t", "number": "-" }, { "letter": "i", "number": "-" }, { "letter": "n", "number": "-" }, { "letter": "o", "number": "-" }]

$(function() {
    make_board()
});

make_board = function() {
    var title = ''
    var cell_html = ''
    for (var i = 0; i < COLS; i++) {
        $("#crossword").append('<tr id="' + 'row_' + i + '"></tr>')
        for (var j = 0; j < ROWS; j++) {

            var index = i * ROWS + j
            var sol = solutions[index].letter
            var num = solutions[index].number

            if (sol == '-') {
                $("#row_" + i).append('<td class="gray" id="' + index + '"></td>')
                black_tiles++
            } else {
                cell_html = '<td id="td_' + index + '" class="cream">'
                title = ''

                if (num !== '-') {
                    title = num
                }

                cell_html += '<div onmouseover="setClue(' + index + ')" onclick="setClue(' + index + ')"><input onkeyup="cellHandler(' + index + ')" onfocus="selectCell(' + index + ')" id="' + index +
                    '" maxlength="1" class="input-cell"' + ' title="' + title + '"'
                'type="text"/></div>'

                $("#row_" + i).append(cell_html + '</td>')
            }
        }
    }
    toWin = COLS * ROWS - black_tiles
    $("#remaing_letters").text(toWin)
}

setClue = function(index) {
    $("#clue_span").text('this is cell: ' + index)
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
            if (letter.toLowerCase() !== correct) { // for some reason it used upper case letters on mobile
                $("#" + index).css({ 'color': 'red' })
            } else guessed++;
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