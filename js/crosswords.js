const ROWS = 11
const COLS = 10
const DEFAULT_CLUE = '< click on a cell to show clue >'
var black_tiles = 0
var guessed = 0
var missed = 0
var toWin = 0
var clueing = false

$(function() {
    document.onclick = function() {
        if ($('*:focus').length == 0) {
            setDefaultClues()
        }
    }
    make_board()
});

make_board = function() {
    var title = ''
    var cell_html = ''
    var index = 0
    for (var i = 0; i < COLS; i++) {
        $("#crossword").append('<tr id="' + 'row_' + i + '"></tr>')
        for (var j = 0; j < ROWS; j++) {

            index = i * ROWS + j
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

                cell_html += '<div onclick="clickedCell(' + index + ')"><input onkeyup="focusNextCell(' + index + ')" onfocus="focusedCell(' + index + ')" id="' + index +
                    '" maxlength="1" class="input-cell"' + ' title="' + title + '"'
                'type="text"/></div>'

                $("#row_" + i).append(cell_html + '</td>')
            }
        }
    }
    toWin = COLS * ROWS - black_tiles
    $("#remaing_letters").text(toWin)
    setDefaultClues()
}

clickedCell = function(index) {
    var num = solutions[index].number // clue number or '-' for no clue

    if (num !== '-') { // gets the right clue if there's one
        clueing = true
        writeClue(num)
    } else {
        clueing = false
        setDefaultClues()
    }
}

focusedCell = function(index) {
    if ($("#" + index).val() !== undefined && $("#" + index) !== '') {
        document.getElementById(index).select()
        $("#" + index).removeAttr('style')
    }
    clickedCell(index)
}

writeClue = function(num) {
    var elem = clues.find(obj => { return obj.number === num })
    var clue = ''

    $("#clue_span_v").text('- - -')
    $("#clue_span_h").text('- - -')

    if (elem.v_clue !== '-') {
        clue = elem.v_clue
        $("#clue_span_v").text(clue)
    }
    if (elem.h_clue !== '-') {
        clue = elem.h_clue
        $("#clue_span_h").text(clue)
    }
}

setDefaultClues = function() {
    //$("#clue_span_v").css({ 'font-style': 'italic' })
    //$("#clue_span_h").css({ 'font-style': 'italic' })
    $("#clue_span_v").text(DEFAULT_CLUE)
    $("#clue_span_h").text(DEFAULT_CLUE)
}

focusNextCell = function(index) {
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

checkLetters = function() {
    var correct = ''
    guessed = 0
    missed = 0
    for (var index = 0; index < 110; index++) {
        var letter = document.getElementById(index).value
        if (letter !== undefined && letter.length !== 0) {
            correct = solutions[index].letter
            if (letter.toLowerCase() !== correct) { // for some reason it used upper case letters on mobile
                $("#" + index).css({ 'color': 'red' })
                missed++
            } else guessed++;
        }
        if (guessed === toWin) {
            $(":input").css({ 'color': 'green' })
            alert('Well done!\n\nYou completed this crossword.')
        }
        $("#remaing_letters").text(toWin - guessed)
    }
    if (missed === 0) {
        //alert('There are no errors!')
        $("#dialog").dialog()
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