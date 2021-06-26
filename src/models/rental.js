"use strict";

const mongoose = require("mongoose");
const MachineSchema = require('./laundryroom')

// // import MachineSchema from './laundryroom';
//
// const Role = require('./laundryroom/Machine')
// const RoleSchema = mongoose.model('Role').schema
// RoleSchema.mac

const FeedbackSchema = new mongoose.Schema({
    score: {
        type: "Number",
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: "String"
    }
})

const AllocatedTimeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
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

const PaymentSchema = new mongoose.Schema({
    cost: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }
})

const Rental = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     index: true,
    // },
    machine: {type: mongoose.Schema.Types.ObjectId, ref: MachineSchema},
    allocated_time: AllocatedTimeSchema,
    payment: PaymentSchema,
    feedback: FeedbackSchema,
});



