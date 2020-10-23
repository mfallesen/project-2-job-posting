$(document).ready(function () {

    $(document).on("click", "#viewjobs", function() {
        location.href="/job/listings";
    })

    $(document).on("click", "#login", function() {
        $("#login-modal").addClass("is-active");
    })

    $(document).on("click", "#signup", function () {
        $("#signup-modal").addClass("is-active");
    })

    $(".delete").on("click", function () {
        $(".modal").removeClass("is-active")
    })

    // listener for when user clicks 'create account' button
    $('.newAccountBtn').on('click', function () {
        // grab input field values from page
        const firstName = $('.firstNameInput').val()
        const lastName = $('.lastNameInput').val()
        const email = $('.emailInput').val()
        const phone = $('.phoneInput').val()
        const companyId = $('.companyInput').val()
        const password = $('.passwordInput').val()

        // check if any user inputs are blank
        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !companyId ||
            !password
        ) {
            // return to avoid running ajax request
            return alert('all fields are required')
        }
        
        // object of all values from input fields to send in ajax request
        const newAccountObj = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            company_id: companyId,
            password: password
        }

        // request to server to create a new manager account
        $.ajax({
            url: '/api/account/manager/new',
            method: "POST",
            data: newAccountObj,
            statusCode: {
                401: function() {
                    // 401 indicates account with email already exists
                    alert('Email already taken')
                }
            }
        }).done(function(response) {
            console.log('new manager account created')
        })
    })


})