const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const yamlJs = require('yamljs');
const swaggerDocument = yamlJs.load('./swagger.yaml');

require('dotenv').config();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Use the Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON
app.use(express.json());

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
})

// Handle the signup form submission
app.post('/users', (req, res) => {
    // Get the form data from the request body
    const {username, email, password, confirm_password} = req.body;

    // Check if the password and confirmation password match
    if (password !== confirm_password) {
        res.status(400).send('Passwords do not match');
        return;
    }

    // TODO: Check if the username and email are available and meet any other criteria you have for user accounts

    // If everything is valid, create the new user account
    // TODO: Write code to create a new user account

    res.send('Thanks for signing up!');
});

app.listen(port, () => {
    console.log(`App running. Docs at http://localhost:${port}/docs`);
});
