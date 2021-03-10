const ROWS = 11
const COLS = 10
var solutions = [{ "i": "1", "j": "1", "sol": "d" }, { "i": "1", "j": "2", "sol": "i" }, { "i": "1", "j": "3", "sol": "s" }, { "i": "1", "j": "4", "sol": "p" }, { "i": "1", "j": "5", "sol": "e" }, { "i": "1", "j": "6", "sol": "r" }, { "i": "1", "j": "7", "sol": "d" }, { "i": "1", "j": "8", "sol": "e" }, { "i": "1", "j": "9", "sol": "r" }, { "i": "1", "j": "10", "sol": "a" }, { "i": "1", "j": "11", "sol": "-" }, { "i": "2", "j": "1", "sol": "c" }, { "i": "2", "j": "2", "sol": "a" }, { "i": "2", "j": "3", "sol": "l" }, { "i": "2", "j": "4", "sol": "a" }, { "i": "2", "j": "5", "sol": "m" }, { "i": "2", "j": "6", "sol": "a" }, { "i": "2", "j": "7", "sol": "i" }, { "i": "2", "j": "8", "sol": "o" }, { "i": "2", "j": "9", "sol": "-" }, { "i": "2", "j": "10", "sol": "d" }, { "i": "2", "j": "11", "sol": "a" }, { "i": "3", "j": "1", "sol": "-" }, { "i": "3", "j": "2", "sol": "n" }, { "i": "3", "j": "3", "sol": "a" }, { "i": "3", "j": "4", "sol": "s" }, { "i": "3", "j": "5", "sol": "a" }, { "i": "3", "j": "6", "sol": "t" }, { "i": "3", "j": "7", "sol": "a" }, { "i": "3", "j": "8", "sol": "-" }, { "i": "3", "j": "9", "sol": "i" }, { "i": "3", "j": "10", "sol": "o" }, { "i": "3", "j": "11", "sol": "r" }, { "i": "4", "j": "1", "sol": "s" }, { "i": "4", "j": "2", "sol": "s" }, { "i": "4", "j": "3", "sol": "-" }, { "i": "4", "j": "4", "sol": "a" }, { "i": "4", "j": "5", "sol": "t" }, { "i": "4", "j": "6", "sol": "t" }, { "i": "4", "j": "7", "sol": "r" }, { "i": "4", "j": "8", "sol": "a" }, { "i": "4", "j": "9", "sol": "t" }, { "i": "4", "j": "10", "sol": "t" }, { "i": "4", "j": "11", "sol": "i" }, { "i": "5", "j": "1", "sol": "p" }, { "i": "5", "j": "2", "sol": "a" }, { "i": "5", "j": "3", "sol": "n" }, { "i": "5", "j": "4", "sol": "-" }, { "i": "5", "j": "5", "sol": "i" }, { "i": "5", "j": "6", "sol": "o" }, { "i": "5", "j": "7", "sol": "r" }, { "i": "5", "j": "8", "sol": "n" }, { "i": "5", "j": "9", "sol": "a" }, { "i": "5", "j": "10", "sol": "t" }, { "i": "5", "j": "11", "sol": "a" }, { "i": "6", "j": "1", "sol": "i" }, { "i": "6", "j": "2", "sol": "n" }, { "i": "6", "j": "3", "sol": "b" }, { "i": "6", "j": "4", "sol": "a" }, { "i": "6", "j": "5", "sol": "t" }, { "i": "6", "j": "6", "sol": "-" }, { "i": "6", "j": "7", "sol": "e" }, { "i": "6", "j": "8", "sol": "-" }, { "i": "6", "j": "9", "sol": "l" }, { "i": "6", "j": "10", "sol": "a" }, { "i": "6", "j": "11", "sol": "n" }, { "i": "7", "j": "1", "sol": "c" }, { "i": "7", "j": "2", "sol": "t" }, { "i": "7", "j": "3", "sol": "-" }, { "i": "7", "j": "4", "sol": "s" }, { "i": "7", "j": "5", "sol": "e" }, { "i": "7", "j": "6", "sol": "d" }, { "i": "7", "j": "7", "sol": "a" }, { "i": "7", "j": "8", "sol": "n" }, { "i": "7", "j": "9", "sol": "i" }, { "i": "7", "j": "10", "sol": "-" }, { "i": "7", "j": "11", "sol": "o" }, { "i": "8", "j": "1", "sol": "c" }, { "i": "8", "j": "2", "sol": "e" }, { "i": "8", "j": "3", "sol": "c" }, { "i": "8", "j": "4", "sol": "o" }, { "i": "8", "j": "5", "sol": "-" }, { "i": "8", "j": "6", "sol": "a" }, { "i": "8", "j": "7", "sol": "-" }, { "i": "8", "j": "8", "sol": "n" }, { "i": "8", "j": "9", "sol": "a" }, { "i": "8", "j": "10", "sol": "o" }, { "i": "8", "j": "11", "sol": "-" }, { "i": "9", "j": "1", "sol": "a" }, { "i": "9", "j": "2", "sol": "-" }, { "i": "9", "j": "3", "sol": "a" }, { "i": "9", "j": "4", "sol": "l" }, { "i": "9", "j": "5", "sol": "i" }, { "i": "9", "j": "6", "sol": "t" }, { "i": "9", "j": "7", "sol": "o" }, { "i": "9", "j": "8", "sol": "-" }, { "i": "9", "j": "9", "sol": "n" }, { "i": "9", "j": "10", "sol": "u" }, { "i": "9", "j": "11", "sol": "m" }, { "i": "10", "j": "1", "sol": "-" }, { "i": "10", "j": "2", "sol": "f" }, { "i": "10", "j": "3", "sol": "r" }, { "i": "10", "j": "4", "sol": "a" }, { "i": "10", "j": "5", "sol": "m" }, { "i": "10", "j": "6", "sol": "a" }, { "i": "10", "j": "7", "sol": "r" }, { "i": "10", "j": "8", "sol": "t" }, { "i": "10", "j": "9", "sol": "i" }, { "i": "10", "j": "10", "sol": "n" }, { "i": "10", "j": "11", "sol": "o" }]

$(function() {
    $("#crossword").hide()

    $("#play_btn").click(function() {
        $("#crossword").show()
    })

    $("#stop_btn").click(function() {
        $("#crossword").hide()
    })

    make_board()
});

make_board = function() {
    for (var i = 0; i < COLS; i++) {
        $("#crossword").append('<tr id="' + 'row_' + i + '"></tr>')
        for (var j = 0; j < ROWS; j++) {

            var index = i * ROWS + j
            var sol = solutions[index].sol

            if (sol == '-')
                $("#row_" + i).append('<td class="gray"></td>')
            else
                $("#row_" + i).append('<td id="' + index + '" class="cream">' + sol + '<sup class="cell-number">5</sup></td>')
            $("#" + index).text('')
        }
    }
}