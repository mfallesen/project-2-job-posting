$(document).ready(function () {

    $(document).on("click", "#login", function () {
        $("#login-modal").addClass("is-active");
    })

    $(document).on("click", "#signup", function () {
        $("#signup-modal").addClass("is-active");
    })

    $(".delete").on("click", function () {
        $(".modal").removeClass("is-active")
    })

    $('.newAccountBtn').on('click', function () {
        const newAccountObj = {
            first_name: $('.firstNameInput'),
            last_name: $('.lastNameInput'),
            email: $('.emailInput'),
            phone: $('.phoneInput'),
            company_id: $('.companyInput'),
            password: $('.passwordInput')
        }

        $.ajax({
            url: '/api/account/manager/new',
            method: "POST",
            data: newAccountObj,
            statusCode: {
                401: function() {
                    alert('Incorrect email or password')
                }
            }
        }).then(function(response) {
            console.log('new manager account created')
        })
    })


})