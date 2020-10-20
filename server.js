const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// data
const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "scooby321",
database: ""
});

connection.connect(function(err) {
  if (err) throw err;
  
});

app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});