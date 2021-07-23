"use strict";
const mongoose = require("mongoose");
// Define the user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
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
    // bunu sil
    balance: {
        type: Number,
    },
    laundrywiseCode: {
        type: String
    },
    laundryRooms: [
        {type: mongoose.Schema.Types.ObjectId, ref: "LaundryRoom"}
    ],

    // role of the user, used for rights management
    role: {
        type: String,
        // role can only take the value "member" and "admin"
        enum: ["customer", "admin", "superAdmin"],
        // if not specified the role customer is chosen
        default: "customer",
    },
});

UserSchema.set("versionKey", false);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
