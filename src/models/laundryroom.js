"use strict";

const mongoose = require("mongoose");

const ResidentialAreaSchema  = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true
    },
    address:{
        type: String
    },
    // machines : [MachineSchema],
    laundryRooms:  [     {
        type: String,
        ref: "LaundryRoomSchema"
    }],
});


const LaundryRoomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    address:{
        type: String
    },
    // machines : [MachineSchema],
    announcements: [     {
        type: String,
        ref: "AnnouncementSchema"
    }],
});


const AnnouncementSchema = new mongoose.Schema({
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


module.exports = mongoose.model("ResidentialArea", ResidentialAreaSchema);
module.exports = mongoose.model("LaundryRoom", LaundryRoomSchema);
module.exports = mongoose.model("Announcement", AnnouncementSchema);