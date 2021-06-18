/**
 * @author canberk.anar
 */

"use strict";

var schemas = require('announcement');

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
    isActive: {
        type: Boolean,
        required: true
    },
    address:{
        type: String
    },
    // machines : [MachineSchema],
    announcements: [AnnouncementSchema],
});

module.exports = mongoose.model("LaundryRoom", LaundryRoomSchema);