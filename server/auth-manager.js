const jwt = require("jsonwebtoken")
require("dotenv").config()

function authManager() {

    userVerify = (req) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const userToken = jwt.verify(token, process.env.JWT_SECRET);
            return userToken.userId;
        } catch (err) {
            return null;
        }
    }

    tokenSign = (userId) => {
        return jwt.sign({
            userId: userId
        }, process.env.JWT_SECRET);
    }
    return this;
}

const auth = authManager();
module.exports = auth;