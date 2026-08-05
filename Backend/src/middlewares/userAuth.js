const jwt = require("jsonwebtoken");
const User = require("../models/user");


// main task of this middleware to check the user's cookies setting and mangment
const userAuth = async (req, res, next) => {
    try {

        // taking the token from the cookies (the token is set in the user login time)
        const { token } = req.cookies;

        // if token not found then send error
        if (!token) {
            return res.status(401).send("Please Login!");
        }

        //decode the token to get user id
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = decodedObj;

        //now find the user by id
        const user = await User.findById(_id);
        //if user not found then throw error
        if (!user) {
            throw new Error("User not found");
        }

        // saving user object in req.user (now we can access user from any middleware or controller)
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });

    }
};

module.exports = {
    userAuth,
};