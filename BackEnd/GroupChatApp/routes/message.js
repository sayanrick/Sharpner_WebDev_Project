const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
    fs.readFile("username.txt", (err, data) => {
        if(err)
        {
            console.log(err);
            data = 'No chat exists';
        }
        res.send(`
        ${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
            <input id="message" name="message" type="text" placeholder="message">
            <input type="hidden" name="username" id="username"> <!-- Corrected name attribute -->
            <button type="submit">Send</button>
        </form>
    `);
    });
    
});

router.post('/', (req, res, next) => {

    console.log(`${req.body.username}: ${req.body.message}`);
    // res.send(`<h6>${req.body.username}: ${req.body.message}</h6>`);
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, {flag: 'a'}, (err) => {
        err ? console.log(err) : res.redirect("/");
    });
    // res.redirect('/');
});

module.exports = router;
