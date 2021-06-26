"use strict";

const mongoose = require("mongoose");
const machine = require('./laundryroom').machine

// // import MachineSchema from './laundryroom';
//
// const Role = require('./laundryroom/Machine')
// const RoleSchema = mongoose.model('Role').schema
// RoleSchema.mac

const FeedbackSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
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

const RentalSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     index: true,
    // },
    //machine: machine,
    allocated_time: AllocatedTimeSchema,
    payment: PaymentSchema,
    feedback: FeedbackSchema,
});

// module.exports = mongoose.model("ResidentialArea", ResidentialAreaSchema);
const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);
const AllocatedTimeModel = mongoose.model("AllocatedTime", AllocatedTimeSchema);
const PaymentModel = mongoose.model("Payment", PaymentSchema);
const RentalModel = mongoose.model("Rental", RentalSchema);

module.exports = {
    Feedback: FeedbackModel,
    AllocatedTime: AllocatedTimeModel,
    Payment: PaymentModel,
    Rental: RentalModel
}


