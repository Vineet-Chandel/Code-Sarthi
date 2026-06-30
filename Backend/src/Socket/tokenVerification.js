const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenVerification = async (token) => {
    try {
        if (!token) {
            console.log("Please Login!");
            return null;
        }



        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }




        return user;
    } catch (err) {
        console.log("Error in token verification", err);
        return null;
    }
};

module.exports = {
    tokenVerification,
};