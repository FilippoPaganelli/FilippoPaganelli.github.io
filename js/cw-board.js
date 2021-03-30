var ROWS = 0
var COLS = 0
var TOTAL_CELLS = 0
const DEFAULT_CLUE = '- click on a cell to show clue -'
const DEFAULT_CLUE_EMPTY = '- no crossword selected -'
var currentOption = 'no_selection'
var solutions = []
var clues = []
var black_tiles = 0
var toWin = 0
var guessed = 0
var missed = 0
var isMobile = false

$(function() {
    document.onclick = function() {
        if ($('*:focus').length == 0) {
            setDefaultClues()
        }
    }
    detectMobile()
    resetAll()
    $("#board_selection").val('no_selection') // resets the default value
});

detectMobile = function() { // same maxwidth as for CSS
    if (window.innerWidth <= 992) isMobile = true
}

resetAll = function() {
    guessed = 0
    missed = 0
    toWin = 0
    black_tiles = 0
    currentOption = 'no_selection'
    $('#check_btn').prop('disabled', true)
    $('#reset_btn').prop('disabled', true)
    $('table').empty()
    $('table').hide(300)
    $("#remaing_letters").text('- -')
    setDefaultClues()
}

// --- ONCHANGE
prepareSelection = function(selected) {
    resetAll()
    if (selected != 'no_selection') {
        $('#' + selected).fadeIn(400)
        $('#check_btn').prop('disabled', false)
        $('#reset_btn').prop('disabled', false)
        var cw = window[selected]
        currentOption = selected

        // 1- set rows and cols
        ROWS = cw.info.cols
        COLS = cw.info.rows
        TOTAL_CELLS = ROWS * COLS

        // 2- set solutions and reset guessed/missed
        solutions = cw.sol
        clues = cw.clues

        // 3- make table for selected board
        makeBoard(selected)
    }
}

makeBoard = function(cw_id) {
    var cell_html = ''
    var index = 0
    for (var i = 0; i < COLS; i++) {
        $("#" + cw_id).append('<tr id="' + 'row_' + i + '"></tr>')
        for (var j = 0; j < ROWS; j++) {

            index = i * ROWS + j
            var sol = solutions[index]

            if (sol == '-') {
                $("#row_" + i).append('<td class="gray" id="' + index + '"></td>')
                black_tiles++
            } else {
                cell_html = '<td id="td_' + index + '" class="cream">'

                keydownListener = isMobile ? '' : 'onkeydown="checkArrows(window.event, ' + index + ')"'

                cell_html += '<div><input onkeyup="focusNextCell(window.event, ' +
                    index + ')" onfocus="focusedCell(' + index + ')" ' + keydownListener + ' id="' + index +
                    '" maxlength="1" class="input-cell" type="text"/></div>'

                $("#row_" + i).append(cell_html + '</td>')
            }
        }
    }
    toWin = TOTAL_CELLS - black_tiles
    $("#remaing_letters").text(toWin)
    setDefaultClues()
}

// --- ONKEYDOWN
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
    var found = false
    clues.forEach(function(clue) {
        if (clue.number === index) {
            writeClue(index)
            found = true
        }
    })
    if (!found) setDefaultClues()
}

// --- ONKEYUP
focusNextCell = function(e, index) {
    var cell = document.getElementById(index)
    var value = cell.value
    var isArrow = e.keyCode == '40' || e.keyCode == '39' || e.keyCode == '38' || e.keyCode == '37'

    if (value === ' ' || value.length === 0) {
        cell.value = ''
    } else {
        if (!isArrow) {
            var next = (index + 1) % 110

            while ($('#' + next).hasClass('gray')) { // finds next white cell
                next = (next + 1) % 110
            }
            $('#' + next).focus()
        } else $('#' + index).focus()
    }
}

// --- ONFOCUS
focusedCell = function(index) {
    if ($("#" + index).val().length !== 0) {
        document.getElementById(index).select()
        $("#" + index).removeAttr('style')
    }
    clickedCell(index)
}

writeClue = function(num) {
    var elem = clues.find(obj => { return obj.number == num })
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
    if (currentOption != 'no_selection') {
        $("#clue_span_v").text(DEFAULT_CLUE)
        $("#clue_span_h").text(DEFAULT_CLUE)
    } else {
        $("#clue_span_v").text(DEFAULT_CLUE_EMPTY)
        $("#clue_span_h").text(DEFAULT_CLUE_EMPTY)
    }
}

checkLetters = function() {
    var correct = ''
    guessed = 0
    missed = 0
    for (var index = 0; index < 110; index++) {
        var letter = document.getElementById(index).value
        if (letter !== undefined && letter.length !== 0) {
            correct = solutions[index]
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
    $("#board_selection").val(currentOption)
}