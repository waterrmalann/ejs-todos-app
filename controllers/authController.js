import User from '../models/User.js';
import { validateMailAddress } from "../helpers/validators.js";

const getLogin = async (req, res) => {
    if (req.session.userJustRegisteredAnAccount) {
        req.session.userJustRegisteredAnAccount = false;
        res.render('login', { userJustRegisteredAnAccount: true });
    } else {
        res.render('login');
    }
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).render("login", { errorMessage: "Invalid email or password" });
        }

        req.session.user = user;

        res.redirect('/todos');
    } catch (err) {
        res.status(500).render("login", { errorMessage: "An internal server error occurred." });
    }
};

const getRegister = async (_req, res) => {
    res.render('register');
};

const postRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !validateMailAddress(email)) {
        return res.status(400).render("register", { errorCode: 400, errorMessage: "invalid email address" });
    }

    if (!name) {
        return res.status(400).render("register", { errorCode: 400, errorMessage: "invalid name" });
    }

    if (!password || password.length < 8) {
        return res.status(400).render("register", { errorCode: 400, errorMessage: "invalid password" });
    }

    try {
        await User.create({ name, email, password });
        req.session.userJustRegisteredAnAccount = true;
        res.redirect('/login');
    } catch (err) {
        res.status(500).render("register", { errCode: 500, errorMessage: "An internal server error occured." })
    }
}

const getLogout = async (req, res) => {
    // Clear the session or token upon logout
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render("error", { errCode: 500, errorMessage: "An error occured while you were logging out." });
        }
        res.redirect('/login');
    });
};


export {
    getLogin,
    postLogin,

    getRegister,
    postRegister,

    getLogout
}