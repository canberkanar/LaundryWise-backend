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
        default: false
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
        required: true
    },
    address: {
        type: String
    },
    operationStartHour: {
        type: Number,
        min: 0,
        max: 24,
        default: 6
    },
    operationEndHour: {
        type: Number,
        min: 0,
        max: 24,
        default: 24
    },
    machines: [{MachineSchema}],
    announcements: [AnnouncementSchema]
});

// module.exports = mongoose.model("ResidentialArea", ResidentialAreaSchema);
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
