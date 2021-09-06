$("h1").addClass("big-title margin-50")
// $("h1").text("Good bye")
// $("h1").click(function () {
//     $("h1").css("color", "purple")
// })

// $("button").html("<em>Hey</em>")

// $("a").attr("href", "https://www.youtube.com/")

$("button").click(function () {
    $("h1").slideUp().slideDown().animate({opacity: 0.5})
})

$(document).keypress(function (event) {
    $("h1").text(event.key)
})

$("h1").on("mouseover", function() {
    $("h1").css("color", "purple")
})