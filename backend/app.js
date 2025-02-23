require('dotenv').config();
var cors = require('cors')
const express = require('express');
const userRouter = require("./routes/userRouter.js");
const mongoose = require('mongoose');
const errorHandler = require("./middlewares/errorHandlerMiddleware.js");
const app = express();

// CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());
// Redirecting to the Router middleware
app.use('/', userRouter);
app.use(errorHandler);

// Managing User Database using MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('DB Connected')).catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`listening on port... ${process.env.PORT}`);
});
