"use strict";

const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ["available", "occupied", "outOfService"],
        default: "available",
        required: true
    },
});

const MachineSchema = new mongoose.Schema({
    deviceNumberInRoom: {
        type: Number,
        required: true
    },
    machineType: {
        type: String,
        enum: ["washer", "dryer"],
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    operationCount: {
        type: Number,
        required: true,
        default: 0,
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    timeslots: [{type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot"}],
    price: {
        type: Number,
        required: true
    }
})

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
});

const LaundryRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    address: {
        type: String
    },
    operationStartHour: {
        type: Number,
        min: 0,
        max: 24, 
        required: true
    },
    operationEndHour: {
        type: Number,
        min: 0,
        max: 24,
        required: true
    },
    machines: [{type: mongoose.Schema.Types.ObjectId, ref: "Machine"}],
    announcements: {type: mongoose.Schema.Types.ObjectId, ref: "Announcement"},
});

const LaundryRoomModel = mongoose.model("LaundryRoom", LaundryRoomSchema);
const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);
const MachineModel = mongoose.model("Machine", MachineSchema);
const TimeSlotModel = mongoose.model("TimeSlot", TimeSlotSchema);

module.exports = {
    LaundryRoom: LaundryRoomModel,
    Announcement: AnnouncementModel,
    Machine: MachineModel,
    TimeSlot: TimeSlotModel
}
