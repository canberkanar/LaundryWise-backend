const {LaundryRoom, Machine} = require("../models/laundryroom");
const User = require("../models/user");
var UserController = require("./auth.js");


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

const getMachinesInRoom = async (req, res) => {
    try {
        console.log(req.query.id)
        let laundryroom = await LaundryRoom.findById(req.query.id).exec();
        let machines = []
        //console.log("input machine type " + req.query.machineType )
        for(let m_id of laundryroom.machines){
            let m = await Machine.findById(m_id).exec();
            //console.log("res " + m.machineType.localeCompare(req.query.machineType))
            if(!m.machineType.localeCompare(req.query.machineType)){
                //console.log("in " + m.machineType);
                machines.push(m);
            }


        }

        return res.status(200).json(machines);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const get = async (req, res) => {
    try {
        console.log(req.body.id)
        let m = await LaundryRoom.findById(req.body.id).exec();
        // return gotten movies
        return res.status(200).json(m);
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
        let matcher = new Object();
        let timeSlotQuery = new Object();
        timeSlotQuery.path = 'timeslots';

        let filteringQuery = new Object();
        filteringQuery.path = 'machines';
        filteringQuery.match = new Object();
        filteringQuery.populate = new Object();

        if (req.query.machineType && (!"washer".localeCompare(req.query.machineType) || !"dryer".localeCompare(req.query.machineType))) {
            matcher.machineType = req.query.machineType
            filteringQuery.match = matcher;
        }

        if (req.query.beginningDateToPullReservations) {
            let dateComparator = new Object();
            let filteringStartDate = new Date(req.query.beginningDateToPullReservations);
            filteringStartDate.setHours(0, 0, 0, 0);
            dateComparator.$gte = new Date(filteringStartDate); // dates after
            // dateComparator.$lt = new Date("2021-07-09T03:00:00.000+00:00"); // dates before
            timeSlotQuery.match = new Object();
            timeSlotQuery.match.date = dateComparator;
        }

        filteringQuery.populate = timeSlotQuery;


        let laundryRoom = await LaundryRoom.findById(req.query.id).populate(filteringQuery).exec();

        // let laundryRoom = await LaundryRoom.findById(req.query.id).populate({
        //         path: 'machines',
        //         populate: {
        //             path: 'timeslots', match: {
        //                 date: new Date("2021-07-02T21:00:00.000Z")
        //             }
        //         }
        //     }
        // ).exec();

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
        reqLaundryRoom = {
            name: req.body.name,
            address: req.body.address,
            operationStartHour: req.body.operationStartHour,
            operationEndHour: req.body.operationEndHour
        }
        let newLaundryRoom = await LaundryRoom.create(reqLaundryRoom);
        let reqAnnouncement = {
            "title": "   ",
            "body": "   "
        }
        let announcement = await Announcement.create(reqAnnouncement);
        let finalLaundryRoom = await LaundryRoom.findOneAndUpdate(
            {newLaundryRoom},
            {announcements: announcement});
        let serviceProvider = await User.findOneAndUpdate(
            {
                _id: req.body.serviceProviderId
            },
            {
                $push: {
                    laundryRooms: finalLaundryRoom
                }
            }
        );
        
        return res.status(201).json(finalLaundryRoom);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Laundry Create",
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
            for (let timeslot of machine.timeslots) {
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
    get,
    read,
    create,
    update,
    remove,
    updateWorkingHours,
    getMachinesInRoom
};
