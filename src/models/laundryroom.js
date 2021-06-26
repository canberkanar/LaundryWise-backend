"use strict";

const mongoose = require("mongoose");

// const ResidentialAreaSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true,
//         index: true,
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String
//     },
//     laundryRooms: [{
//         type: String,
//         ref: "LaundryRoomSchema"
//     }],
// });


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
    price: {
        type: Number,
        required: true
    }

})

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
    address: {
        type: String
    },
    machines: [MachineSchema],
    announcements: [{
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


// module.exports = mongoose.model("ResidentialArea", ResidentialAreaSchema);
module.exports = mongoose.model("LaundryRoom", LaundryRoomSchema);
module.exports = mongoose.model("Announcement", AnnouncementSchema);