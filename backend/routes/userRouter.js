const express = require('express');
const usersController = require("../controllers/usersCtrl.js");
const userRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");

// Routes for the API CRUD Operations
userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);
// isAuthenticated for the User who is already logged in and CRUD operations done using the token of the user.
userRouter.get("/profile", isAuthenticated, usersController.profile);
userRouter.put("/change-profile", isAuthenticated, usersController.changeUserPassword);
userRouter.put("/update-profile", isAuthenticated, usersController.updateUserProfile);
module.exports = userRouter;