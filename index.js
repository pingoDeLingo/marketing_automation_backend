const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const sessions = require('express-session');
var parseUrl = require('body-parser');
const app = express();

var mysql = require('mysql');
const bcrypt = require('bcrypt');

let encodeUrl = parseUrl.urlencoded({extended: false});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//session middleware
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}, // 24 hours
    resave: false
}));


var con = mysql.createConnection({
    host: "localhost",
    user: "root", // my username
    password: "qwerty", // my password
    database: "login"
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', encodeUrl, async (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var password = req.body.password;

    con.connect(function (err) {
        if (err) {
            console.log(err);
        }
        ;
        // checking if the user is already registered
        con.query(`SELECT *
                   FROM users
                   WHERE username = '${userName}'`, async function (err, result) {
            if (err) {
                console.log(err);
            }
            ;
            if (Object.keys(result).length > 0) {
                res.sendFile(__dirname + '/public/failreg.html');
            } else {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);
                password = hash;

                // creating user page in userPage function
                function userPage() {
                    // We create a session for the dashboard (user page) page and save the user data to this session:
                    req.session.user = {
                        firstname: firstName,
                        lastname: lastName,
                        username: userName,
                        password: password
                    };

                    res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Login and register form with Node.js, Express.js and MySQL</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <h3>Hi, ${req.session.user.firstname} ${req.session.user.lastname}</h3>
                        <a href="/">Log out</a>
                    </div>
                </body>
                </html>
                `);
                }

                // inserting new user data
                var sql = `INSERT INTO users (firstname, lastname, username, password)
                           VALUES ('${firstName}', '${lastName}', '${userName}', '${password}')`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        // using userPage function for creating user page
                        userPage();
                    }
                    ;
                });

            }
        });
    });
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.post("/dashboard", encodeUrl, async (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;

    con.connect(async function (err) {
        if (err) {
            console.log(err);
        }
        ;
        con.query(`SELECT *
                   FROM users
                   WHERE username = '${userName}'`, async function (err, result) {
            if (err) {
                console.log(err);
            }
            ;

            if (Object.keys(result).length > 0) {
                const isPasswordMatch = await bcrypt.compare(password, result[0].password);

                if (isPasswordMatch) {
                    function userPage() {
                        // We create a session for the dashboard (user page) page and save the user data to this session:
                        req.session.user = {
                            firstname: result[0].firstname,
                            lastname: result[0].lastname,
                            username: userName,
                            password: result[0].password
                        };

                        res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <title>Login</title>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                    </head>
                    <body>
                        <div class="container">
                            <h3>Hi, ${req.session.user.firstname} ${req.session.user.lastname}</h3>
                            <a href="/">Log out</a>
                        </div>
                    </body>
                    </html>
                    `);
                    }

                    userPage();
                } else {
                    res.sendFile(__dirname + '/public/faillog.html');
                }
            } else {
                res.sendFile(__dirname + '/public/faillog.html');
            }
        });
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App running. Docs at http://localhost:${port}`);
});