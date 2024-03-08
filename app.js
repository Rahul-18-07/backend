const express = require('express');
const userRouter = require('./routes/userRoutes')
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// GLOBAL Middlewares

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));
app.use(cookieParser());


//Routes

app.use('/api/v1/users', userRouter);

module.exports = app;