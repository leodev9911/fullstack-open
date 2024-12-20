const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });

        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);
        
        if (!user || !passwordCorrect) {
            return res.status(401).send({ "error": "incorrect username or password" });
        };

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET);

        res
            .status(200)
            .send({ token, username: user.username, name: user.name });
    } catch (error) {
        next(error);
    }
});

module.exports = loginRouter;