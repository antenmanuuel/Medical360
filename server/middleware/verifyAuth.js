const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config()

// verifys that a token is valid, and sets the req.user equal to the users id in database
const verifyAuth = (req, res, next) => {

    const { auth } = req.headers;

    if (!auth) {
        return res.status(401).json({message: "Token Required"})
    }

    const token = auth.split(" ")[1] // Bearer [token]

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.user = User.findById(id).select("_id")

        next();
    } catch (err) {
        res.status(401).json({message: "Request not authorized"});
    }


}