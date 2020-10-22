$(document).ready(function() {

    $(document).on("click", "#login", function() {
        $("#login-modal").addClass("is-active");
        console.log("Login clicked")
    })

    $(document).on("click", "#signup", function() {
        $("#signup-modal").addClass("is-active");
        console.log("Sign-up clicked")
    })
})