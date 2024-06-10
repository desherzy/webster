require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const initializeDatabase = require('./dbInit');
const cors = require('cors');
const app = express();

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const projectRouter = require('./routes/projectRouter');

initializeDatabase();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
