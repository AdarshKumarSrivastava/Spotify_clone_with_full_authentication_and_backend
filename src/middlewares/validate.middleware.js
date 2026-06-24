const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { email, password, username } = req.body;
    if ((!email && !username) || !password) {
        return res.status(400).json({ error: "Email/Username and password are required" });
    }
    next();
};

module.exports = {
    validateRegistration,
    validateLogin
};
