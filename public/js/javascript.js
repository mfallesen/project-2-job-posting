$(document).ready(function() {

    $(document).on("click", "#login", function() {
        $("#login-modal").addClass("is-active");
    })

    $(document).on("click", "#signup", function() {
        $("#signup-modal").addClass("is-active");
    })

    $(".delete").on("click", function() {
        $(".modal").removeClass("is-active")
    })

    $(".dropdown-trigger").on("click", function() {
        $(".dropdown").addClass("is-active")
    })


})