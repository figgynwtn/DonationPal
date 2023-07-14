const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
    res.send('Root API route');
});

router.post("/register", passport.authenticate("register", {session: false}), async (req, res) => {
    res.status(200).json({
        message: "Registration Successful",
        user: req.user
    });
});

router.post("/login", 
            passport.authenticate("login", {session: false, failWithError: true}),
            function (req, res) {
                console.log(req.user);
                // Create a payload in the middle part of the token
                const payload = { id: req.user._id, email: req.user.email} // Do not put a password in here
                // Create a token
                const token  = jwt.sign({ payload }, process.env.TOP_SECRET_KEY, { expiresIn: "1d"}) ;
                // Create an object that includes user info for the client and the token
                loginObject = {};
                loginObject._id = req.user_id;
                loginObject.email = req.user.email;
                loginObject.accessToken = token;
                console.log(loginObject);
                return res.status(200).json(loginObject);
            },
            function (err, req, res) {
                errorResponse = {
                    "error": {
                        'name': "LoginError"
                    },
                    "message": "User not found",
                    "statusCode": 401,
                    "data": [],
                    "success": false
                };
                return res.status(401).json(errorResponse);
            }
)

router.get("/me", passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;