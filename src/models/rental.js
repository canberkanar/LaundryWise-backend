"use strict";

const mongoose = require("mongoose");

const MachineSchema = mongoose.model('Machine').schema;

const FeedbackSchema = new mongoose.Schema({
    score: {
        type: "Number",
         min: 1,
        max: 5
    },
    message: {
        type: "String"
    }
})

const AllocatedTimeSchema = new mongoose.Schema({
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
    machine: {type: mongoose.Schema.Types.ObjectId, ref: "Machine"},
    allocatedTime: {type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot"},
    payment: {type: mongoose.Schema.Types.ObjectId, ref: "Payment"},
    feedback: {type: mongoose.Schema.Types.ObjectId, ref: "Feedback"},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    serviceProvider: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

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


