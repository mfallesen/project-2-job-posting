$(document).ready(function() {

    $(document).on("click", "#viewjobs", function() {
        location.href="/job/listings";
    })

    $(document).on("click", "#login", function() {
        $("#login-modal").addClass("is-active");
    })

    $(document).on("click", "#signup", function() {
        $("#signup-modal").addClass("is-active");
    })

    $(".delete").on("click", function() {
        $(".modal").removeClass("is-active")
    })

   
    
})