// Nodemailer Implementation
const nodemailer = require('nodemailer'); /* this wont work browser side. Ask TA for assistance tomorrow? browserify? */

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nextstep123@gmail.com',
        pass: 'MYtest123!@#'
    }
})
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

    $("#contact-close").on("click", function () {
        $(".modal").removeClass("is-active")
    })

    $(".modal-close").on("click", function () {
        $(".modal").removeClass("is-active")
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