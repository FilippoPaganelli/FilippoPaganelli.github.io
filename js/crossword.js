const ROWS = 11
const COLS = 10
const TOTAL_CELLS = ROWS * COLS
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

                cell_html += '<div onclick="clickedCell(' + index + ')"><input onkeyup="focusNextCell(window.event, ' +
                    index + ')" onfocus="focusedCell(' + index + ')" onkeydown="checkArrows(window.event, ' + index + ')" id="' + index +
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

checkArrows = function(e, index) {
    var next = index
    if (e.keyCode == '40') { // arrow down
        var next = (index + ROWS) % TOTAL_CELLS
    } else if (e.keyCode == '38') { // arrow up
        var next = (index + ROWS * (COLS - 1)) % TOTAL_CELLS
    } else if (e.keyCode == '37') { // arrow left
        var next = (index - 1) % TOTAL_CELLS
    } else if (e.keyCode == '39') { // arrow right
        var next = (index + 1) % TOTAL_CELLS
    }
    $('#' + next).focus()
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

focusNextCell = function(e, index) {
    var cell = document.getElementById(index)
    var value = cell.value
    var isArrow = e.keyCode == '40' || e.keyCode == '39' || e.keyCode == '38' || e.keyCode == '37'

    if (value === ' ' || value.length === 0) {
        cell.value = ''
    } else {
        if (!isArrow) {
            var next = (index + 1) % 110

            while ($('#' + next).hasClass('gray')) {
                next = (next + 1) % 110
            }

            $('#' + next).focus()
        } else $('#' + index).focus()
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
            alertify.alert("Well done!\nYou completed this crossword.", function() { /*alertify.message('OK')*/ })
        }
        $("#remaing_letters").text(toWin - guessed)
    }
    if (missed === 0) {
        alertify.notify('No errors!', 'success', 3, function() {})
    } else alertify.notify('There are errors...', 'error', 3, function() {})
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