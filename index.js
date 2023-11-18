import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';

import authRouter from './routers/authRoutes.js';
import todoRouter from './routers/todoRoutes.js';

// Inject the `.env` file into `process.env`
dotenv.config();

// class UserNotSubscribedError extends Error {};
// throw new UserNotSubscribedError("You are not subscribed to the channel yet.");

// Connect with the database.
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("[database] A connection has been established with MongoDB."))
    .catch(err => console.error("[database] A connection could not be established: " + err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.set('view engine', 'ejs');

// Handle index.
app.get('/', (req, res) => res.render('index'));

app.use('/', authRouter);
app.use('/todos', todoRouter);

// Handle our 404.
app.get('*', (_req, res) => res.render('not-found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[server] Server has started listening on http://localhost:${PORT}`)
});