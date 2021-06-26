"use strict";

const mongoose = require("mongoose");
const laundry_room = require("laundryroom");

const Rental = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
});