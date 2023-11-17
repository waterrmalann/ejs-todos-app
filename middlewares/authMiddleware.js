/** If the user is already logged in when a request passes through this middleware, they will be sent to the todos page. */
const redirectIfAlreadyLoggedIn = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/todos');
    } else {
        next();
    }
}
/** If the user is not already logged in when a request passes through this middleware, they will be sent to the login page. */
const preventIfNotLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        // Prompt the user to log in first.
        res.redirect('/login');
    }
}

export { redirectIfAlreadyLoggedIn, preventIfNotLoggedIn };