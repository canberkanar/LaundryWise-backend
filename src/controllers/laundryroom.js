const {LaundryRoom} = require("../models/laundryroom");

const list = async (req, res) => {
    try {
        // get all laundryrooms in database
        let laundryRooms = await LaundryRoom.find({}).exec();

        return res.status(200).json(laundryRooms);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const read = async (req, res) => {
    try {
        let laundryRoom = await LaundryRoom.findById(req.params.id).exec();

        if (!laundryRoom)
            return res.status(404).json({
                error: "Not Found",
                message: `LaundryRoom not found`,
            });

        return res.status(200).json(laundryRoom);
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
        let laundryRoom = await LaundryRoom.create(req.body);

        // return created movie
        return res.status(201).json(laundryRoom);
    } catch (err) {
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
        let laundryRoom = await LaundryRoom.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        return res.status(200).json(laundryRoom);
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
        await LaundryRoom.findByIdAndRemove(req.params.id).exec();

        return res
            .status(200)
            .json({message: `LaundryRoom with id ${req.params.id} was deleted`});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const updateWorkingHours = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        let laundryRoom = await LaundryRoom.findById(req.body._id).populate({
            path: 'machines',
            populate: {path: 'timeslots'}
        }).exec();

        const laundryRoomOperationStartTime = new Date();
        const laundryRoomOperationEndTime = new Date();
        laundryRoomOperationStartTime.setHours(0, 0, 0, 0);
        laundryRoomOperationEndTime.setHours(0, 0, 0, 0);

        laundryRoomOperationStartTime.setHours(req.body.operationStartHour);
        laundryRoomOperationEndTime.setHours(req.body.operationEndHour);

        // Update individual machine slot availabilities
        for (let machine of laundryRoom.machines) {
            for (let timeslot of  machine.timeslots) {
                if (laundryRoomOperationStartTime <= timeslot.startTime &&
                    laundryRoomOperationEndTime >= timeslot.endTime) {
                    timeslot.status = "available";
                    timeslot.save();
                } else if (timeslot.status.toString() != "occupied") {
                    timeslot.status = "outOfService";
                    timeslot.save();
                }
            }
        }

        laundryRoom = await LaundryRoom.updateOne(req.body).exec(); // final update to db

        return res.status(200).json(laundryRoom);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
}


module.exports = {
    list,
    read,
    create,
    update,
    remove,
    updateWorkingHours
};
