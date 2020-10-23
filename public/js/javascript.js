// Nodemailer Implementation
// const nodemailer = require('nodemailer'); /* this wont work browser side. Ask TA for assistance tomorrow? browserify? */

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'nextstep123@gmail.com',
//         pass: 'MYtest123!@#'
//     }
// })
// ++++++++++++++
// Place inside event listener for submit
// ++++++++++++++

// +++++++++++++








$(document).ready(function () {

    $(document).on("click", "#viewjobs", function () {
        location.href = "/job/listings";
    })

    $(document).on("click", "#login", function () {
        $("#login-modal").addClass("is-active");
    })

    $(document).on("click", "#signup", function () {
        $("#signup-modal").addClass("is-active");
    })

    $(document).on("click", ".manager-contact", function () {
        $(".modal").addClass("is-active");
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
            url: '/manager/create',
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
            window.location.href = '/manager/' + response.id
        })
    })

    // listener for log in button
    $('.loginBtn').on('click', function() {
        // grab input values from page
        const email = $('.loginEmail').val();
        const password = $('.loginPassword').val();

        // if user leave an input field blank, alert user
        if (!email || !password) {
            return alert('enter an email and password')
        }

        // make request to login manager
        $.ajax({
            url: '/manager/login',
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            statusCode: {
                401: function() {
                    // user entered incorrect email or password
                    alert('Incorrect email or password')
                }
            }
        }).done(function(response) {
            // if log in is successful, redirect to manager's profile page
            console.log(response)
            window.location.href = '/manager/' + response.manager.id
        })
    })

    $('.companyInput').on('change', function() {
        const companyDropdown = $('.companyInput');
        const companyForm = $('.companyForm')

        if (companyDropdown.val() === 'newCompany') {
            companyForm.css('display', 'block')
        } else {
            companyForm.css('display', 'none')
        }
    })

    $("#contact-close").on("click", function () {
        $(".modal").removeClass("is-active")
    })

    $(".modal-close").on("click", function () {
        $(".modal").removeClass("is-active")
    })

    $(".job-data").on("click", function () {
        jobId = $(this).attr("data-id");
        window.location.href= "/job/" + jobId;

    })

    $(".job-edit").on("click", function () {
        jobId = $(this).attr("data-id");
        window.location.href= "/job/update/" + jobId;

    })

    // +++++++++++++++
    // Work In Progress
    $("#contact-send").addEventListener("click", function (event) {
        event.preventDefault();

        const mailOptions = {
            from: `${"#contact-email".value}`,
            to: 'random manager'/* manager email inserted here */,
            subject: `${"#contact-name".value} is interested in a job on NextStep`,
            text: `${"#contact-message".value}`
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('message sent: ' + info.response);
            }
        });
    })
    // +++++++++++++++

})