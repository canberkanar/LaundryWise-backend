"use strict";
const mongoose = require("mongoose");
// Define the user schema
const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    registrationDate: {
        type: Date,
    },
    taxNumber: {
        type: Number,
    },
    balance: {
        type: Number,
    },


    // role of the user, used for rights management
    userType: {
        type: String,
        // role can only take the value "member" and "admin"
        enum: ["customer", "serviceProvider", "admin"],
        // if not specified the role customer is chosen
        default: "customer",
    },
});

UserSchema.set("versionKey", false);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
