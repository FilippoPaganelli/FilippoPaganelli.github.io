var count = 1
const BOARD_LENGTH = 11

$(function() {
    // onload functions here
    $("#play_btn").click(function() {
        $("#crossword").show()
    })

    $("#stop_btn").click(function() {
        $("#crossword").hide()
    })

    init()

    make_board()
});

make_board = function() {
    for (var i = 0; i < BOARD_LENGTH; i++) {
        for (var j = 0; j < BOARD_LENGTH; j++) {
            if (count % 2 == 0)
                $("#crossword").append('<div class="cream"></div>')
            else
                $("#crossword").append('<div class="gray"></div>')
            count++
        }
    }
}