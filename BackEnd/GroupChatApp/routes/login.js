const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', (req, res, next) => {
  res.send(`
    <form action="/login" method="POST" onsubmit="saveUsername(event)">
      <input id="username" type="text" name="username" placeholder="Enter your username">
      <button type="submit">Submit</button>
    </form>
    <script>
      function saveUsername(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        localStorage.setItem("username", username);
        console.log(username); // Log the value of username
        window.location.href = "/";
      }
    </script>
  `);
});

router.post('/login', (req, res, next) => {
    console.log(`${req.body.username}`);
    res.redirect('/');
});

module.exports = router;
