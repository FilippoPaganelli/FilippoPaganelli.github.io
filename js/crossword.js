const ROWS = 11
const COLS = 10

$(function() {
    make_board()
});

make_board = function() {
    for (var i = 0; i < COLS; i++) {
        $("#crossword").append('<tr id="' + 'row_' + i + '"></tr>')
        for (var j = 0; j < ROWS; j++) {

            var index = i * ROWS + j
            var sol = solutions[index].letter

            if (sol == '-')
                $("#row_" + i).append('<td class="gray" id="' + index + '"></td>')
            else {
                $("#row_" + i).append('<td id="td_' + index + '" class="cream">' +
                    '<input onkeyup="cellHandler(' + index + ')" id="' + index + '" maxlength="1" class="input-cell" type="text"/>' +
                    '<sup class="cell-number"></sup></td>')
                $("#" + index).on("keyup", cellHandler(index))
            }
        }
    }
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

checkLetters = function() {

}

resetBoard = function() {
    $(":input").val('')
    var index = 0
    while ($('#' + index).hasClass('gray')) {
        index = (index + 1) % 110
    }
    $("#" + index).focus()
}