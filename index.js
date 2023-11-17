import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRouter from './routers/authRoutes.js';
import todoRouter from './routers/todoRoutes.js';

// Inject the `.env` file into `process.env`
dotenv.config();

// Connect with the database.
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("[database] A connection has been established with MongoDB."))
    .catch(err => console.error("[database] A connection could not be established: " + err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use('/', authRouter);
app.use('/todos', todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[server] Server has started listening on http://localhost:${PORT}`)
});