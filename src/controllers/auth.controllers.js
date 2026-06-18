const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// function for registration of users
async function registerUser(req, res) {

    const { username, email, password, role } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exists"
        });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        role: role || "user"
    })
    const token = jwt.sign({
        id: user.id,
        role: user.role,

    }, process.env.JWT_SECRET)
    res.cookie("token", token);
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
//function for login of users

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: user.id,
        role: user.role,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = { registerUser, loginUser, logoutUser }
