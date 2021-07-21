const {LaundryRoom} = require("../models/laundryroom");
const {Announcement} = require("../models/laundryroom");

const list = async (req, res) => {
    try {
        // get all announcements in database
        let announcements = await Announcement.find({}).exec();

        return res.status(200).json(announcements);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

// Give the laundryRoomId as req.
const listInRoom = async (req, res) => {
    try {
        // Getting all announcements of the room.
        let room = await LaundryRoom.findById(req.body.laundryRoomId).exec();
        let announcements = room.announcements;
        console.log("Getting all announcements of the room.");
        console.log(announcements);
        return res.status(200).json(announcements);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error on listing Announcements",
            message: err.message,
        });
    }
};


const read = async (req, res) => {
    try {
        let announcement = await Announcement.findById(req.params.id).exec();

        if (!announcement)
            return res.status(404).json({
                error: "Not Found",
                message: `Announcement not found`,
            });

        return res.status(200).json(announcement);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        // create movie in database
        let announcement = await Announcement.create(req.body);

        // return created movie
        return res.status(201).json(announcement);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const createx = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        try {

            if (req.body.deviceRoomId == null) {
                console.log("RoomID Machine belongs to must be given!");
                return res.status(500).json({
                    error: "RoomID Machine belongs to must be given!",
                    message: "RoomID Machine belongs to must be given!",
                });
            }

            let laundryRoom = await LaundryRoom.findById(req.body.deviceRoomId).exec();

            if (laundryRoom == null) {
                console.log("RoomID Machine belongs to does not exist!");
                return res.status(500).json({
                    error: "RoomID Machine belongs to does not exist!",
                    message: "RoomID Machine belongs to does not exist!",
                });
            }

            const roomOperationStartHour = laundryRoom.toJSON().operationStartHour;
            const roomOperationEndHour = laundryRoom.toJSON().operationEndHour;

            let today = new Date();
            let newStart = new Date();
            let newEnd = new Date();

            today.setHours(0, 0, 0, 0);
            newStart.setHours(0, 0, 0, 0);
            newEnd.setHours(0, 0, 0, 0);

            for (i = 0; i < numberOfDaysToGenerate; i++) {
                for (j = 0; j < 24; j++) {

                    newStart.setHours(j)
                    newEnd.setHours(1 + j)

                    let newStatus = "outOfService";
                    if (j >= roomOperationStartHour && j < roomOperationEndHour) {
                        newStatus = "available";
                    }

                    let slot = {
                        date: new Date(today),
                        startTime: new Date(newStart),
                        endTime: new Date(newEnd),
                        status: newStatus
                    };

                    let pushedTimeSlot;
                    pushedTimeSlot = await TimeSlot.create(slot);
                    timeslots.push(pushedTimeSlot); // new object creation is needed since values are overwritten due to pass by reference
                }

                today.setDate(today.getDate() + 1);
                newStart.setDate(today.getDate() );
                newEnd.setDate(today.getDate())
            }

            req.body.timeslots = timeslots; // merge created timeslots with create machine request

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: "Internal Server Error",
                message: err.message,
            });
        }


        // create movie in database
        let m = await Machine.create(req.body);
        //const xx = req.body.deviceRoomId;
        let added_machine = await LaundryRoom.findOneAndUpdate(
            {_id: req.body.deviceRoomId},
            {$push: {machines: m}});

        console.log(added_machine);

        //LaundryRoom.updateOne({"id": req.body.deviceRoomId},)
        // handle the request
        // create machine in database
        return res.status(201).json(m);

    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }


};

const update = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        let announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        return res.status(200).json(announcement);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        // find and remove LaundryRoom
        await Announcement.findByIdAndRemove(req.params.id).exec();

        return res
            .status(200)
            .json({message: `Announcement with id ${req.params.id} was deleted`});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};


module.exports = {
    list,
    listInRoom,
    read,
    create,
    update,
    remove
};
