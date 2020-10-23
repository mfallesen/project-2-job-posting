const express = require('express');
const exphbs = require('express-handlebars');

// Nodemailer requirements
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nextstep123@gmail.com',
        pass: 'MYtest123!@#'
    }
})

// End Nodemailer requirements

const app = express();

const PORT = process.env.PORT || 8080;

const db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./controllers/html/login-html-routes')(app);
require('./controllers/api/company-api-routes')(app);
require('./controllers/api/job-api-routes')(app);
require('./controllers/api/manager-api-routes')(app);
require('./controllers/api/user-api-routes')(app);
require('./controllers/html/company-html-routes')(app);
require('./controllers/html/job-html-routes')(app);
require('./controllers/html/manager-html-routes')(app);
require('./controllers/html/user-html-routes')(app);

db.sequelize.sync({ force: false }).then(function () {

  app.listen(PORT, function () {
    console.log('App listening on PORT: ' + PORT);
  });
});

// Nodemailer call

// app.post('/')

// transporter.sendMail(mailOptions, function (err, info) {
//   if (err) {
//       console.log(err);
//   } else {
//       console.log('message sent: ' + info.response);
//   }
// });

// end nodemailer