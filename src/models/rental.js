"use strict";

const mongoose = require("mongoose");
const laundry_room = require("laundryroom");

const AllocatedTimeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
});


const Rental = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    machine: MachineSchema,
    allocated_time: AllocatedTimeSchema,
    title: {
        type: String,
        required: true
    },
    payment: PaymentSchema,
    feedback: FeedbackSchema,
});



