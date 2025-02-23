const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

// User Controller for User CRUD operations
const usersController = {
    // Register User
    register: asyncHandler(async(req, res) => {
        console.log(req.body);
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            // Return 401 Status Error Code if any of the fields are empty
            return res.status(401).send({ message: "All fields are required." });
        }
        const userExists = await User.findOne({email});
        if(userExists){
            // Return 400 Status Error Code if User already exists
            return res.status(400).send({ message: "User already exists." });;
        }
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Adding the User to the MongoDB Database
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        // If the Registration is successful then send the status code 201 and User credentials to Frontend
        res.status(201).send({
            message: "Registered Successfully!",
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
        })
    }),
    // Login User
    login: asyncHandler(async(req, res) => {
        console.log(req.body);
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            // Return 400 Status Error Code if User is not found.
            return res.status(400).send({message: "User not found."});
        }
        // Check if the hash is correct by comparing hash stored and hash of entered password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            // Return 401 Status Error Code if Hash of both do not match.
            return res.status(401).send({message: "Incorrect Password."});
        }
        // Generate a token for the User once logged in
        const token = jwt.sign({ id: user._id }, "akhil", {
            expiresIn: "30d",
          });
        // If the Login is successful then send the status code 200 and User credentials to Frontend
        res.status(200).send({
            message: "Login Success",
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        })
    }),
    // Profile of User
    profile: asyncHandler(async(req, res) => {
        // Find the User by ID of user that is stored in Database
        const user = await User.findById(req.user);
        if(!user){
            // Give an Error if User is not Found
            throw new Error("User not Found");
        }
        // Else return the User credentials
        res.send({username: user.username, email: user.email});
    }),
    // User Change Password
    changeUserPassword: asyncHandler(async(req, res) => {
        const {newPassword} = req.body;
        // Find the User by ID of user that is stored in Database
        const user = await User.findById(req.user);
        if(!user){
            // Give an Error if User is not Found
            throw new Error("User not Found");
        }
        // If User is found then hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Update the User password credentials
        user.password = hashedPassword;
        await user.save()
        res.send({message: "Password changed Successfully"});
    }),
    // Update User Profile
    updateUserProfile: asyncHandler(async(req, res) => {
        const {email, username} = req.body;
        // Finding the User by ID and Update the User Credentials
        const updatedUser = await User.findByIdAndUpdate(req.user, 
            {
                username,
                email,
            },
            {
                // To ensure the updated user object is returned
                new: true,
            }
        );
        res.send({message: "Updated User Successfully", updatedUser});
    }),
}
module.exports = usersController;