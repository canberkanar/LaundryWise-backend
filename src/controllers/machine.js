const {Machine, LaundryRoom, TimeSlot} = require("../models/laundryroom");
const {Rental, Payment} = require("../models/rental");
const numberOfDaysToGenerate = 30;

const list = async (req, res) => {
    try {
        // get all laundryrooms in database
        let m = await Machine.find({}).exec();

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


const get = async (req, res) => {
    try {
        console.log(req.params.id)
        let m = await Machine.findById(req.params.id).exec();
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

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        try {
            const timeslots = [];

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

                    newStart.setHours(j);
                    newEnd.setHours(j, 59);

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

                today.setTime(today.getTime() + (24 * 60 * 60 * 1000));
                newStart.setTime(today.getTime() );
                newEnd.setTime(today.getTime())
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
        let added_machine = await LaundryRoom.findOneAndUpdate(
            {_id: req.body.deviceRoomId},
            {$push: {machines: m}});

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
    try {
        console.log("in update Machine")
        let filter = {_id: req.body.id};
        let updated_machine = req.body;
        let oldVersion = await Machine.findById(req.body.id).exec();

        let updated_version = await Machine.findOneAndUpdate(filter, updated_machine, {
            new: true
        });
        console.log("old version: " + oldVersion.isEnabled, " new version: " + req.body.isEnabled)
        if (!(oldVersion.isEnabled === req.body.isEnabled)) {
            console.log('Machine activity has changed')
            enable_disable_machine(req.body.id, req.body.isEnabled)
        }

        return res.status(200).send(updated_version);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    let m = await Machine.findById(req.query.id).exec();
    /*
    for (let ts of m.timeslots) {
        let removed_ts = await TimeSlot.findByIdAndDelete(ts);

    }*/
    let rentals = await Rental.find(
        {
            machine: req.query.id
        }
    )
    let timestampNow = Date.now();
    let timeSlotPastRentals = []
    for (let rental of rentals) {
        let allocatedTimeSlot = await TimeSlot.findById(rental.allocatedTime)
        //future rental
        if(timestampNow < allocatedTimeSlot.startTime ){
            console.log("FUTURE RENTAL")
            console.log(rental)
            let p = await Payment.findByIdAndDelete(rental.payment)
            let r = await Rental.findByIdAndDelete(rental._id)
        }
        else{//past rentals
            timeSlotPastRentals.push(allocatedTimeSlot._id.toString())
        }
    }
    console.log("PAST RENTALS")
    console.log(timeSlotPastRentals)
    console.log(typeof(timeSlotPastRentals[1]))
    var timeslot_counter = 0
    var deleted = 0
    for (let ts of m.timeslots) {
        //console.log(ts)
        //console.log(typeof(ts))
        if(timeSlotPastRentals.includes(ts.toString())){
            console.log("ESLESTI SILME")
        }else{
            let removed_ts = await TimeSlot.findByIdAndDelete(ts);

        }
    }
    console.log("timeslot counter: " + timeslot_counter + " deleted: " + deleted)
    let removed = await Machine.findOneAndRemove({_id: req.query.id}, function (err, response) {
        if (err) throw err;
        LaundryRoom.update(
            {"machines": req.query.id},
            {"$pull": {"machines": req.query.id}},
            async function (err, res1) {
                if (err) throw err;
                res.json(res1);
            }
        );
    });
};


const update_machine_price = async (req, res) => {
    try {
        let m = await Machine.findById(req.params.id).exec();
        if (!m)
            return res.status(404).json({
                error: "Not Found",
                message: `Machine not found`,
            });

        m.price = req.body.price;
        Machine.updateOne(m).exec();

        return res.status(200).json(m);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};


async function updateMachineTimeSlot(timeSlotId, newStatus) {
    console.log(timeSlotId, newStatus);

    try {
        let timeSlot = await TimeSlot.findById(timeSlotId).exec();
        timeSlot.status = newStatus;

        return TimeSlot.updateOne(timeSlot).exec();

    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
}

const enable_disable_machines_time_slots = async (req, res) => {
    let machine = await Machine.findById(req.params.id).populate({
        path: 'timeslots'
    }).exec();
    let matched_laundryRoom = null;
    let laundryRooms = await LaundryRoom.find({}).exec();
    for (let laundryRoom of laundryRooms) {
        for (let machine_id of laundryRoom.machines) {
            console.log(machine_id);
            if (machine_id == req.params.id) {
                matched_laundryRoom = laundryRoom;
                console.log('Room is matched');
            }
        }
    }
    let room_operation_start_time = matched_laundryRoom.operationStartHour;
    let room_operation_end_time = matched_laundryRoom.operationEndHour;
    const laundryRoomOperationStartTime = new Date();
    const laundryRoomOperationEndTime = new Date();
    laundryRoomOperationStartTime.setHours(0, 0, 0, 0);
    laundryRoomOperationEndTime.setHours(0, 0, 0, 0);

    laundryRoomOperationStartTime.setHours(room_operation_start_time);
    laundryRoomOperationEndTime.setHours(room_operation_end_time);
    if (req.body.operation === "disable") {
        machine.isEnabled = false;
        machine.save();
        //console.log(timeslot.status);
    }
    for (let timeslot of machine.timeslots) {
        if (req.body.operation === "disable") {
            console.log("Before " + timeslot.status);
            timeslot.status = "outOfService";
            timeslot.save();
            console.log("After " + timeslot.status);
        } else if (laundryRoomOperationStartTime <= timeslot.startTime &&
            laundryRoomOperationEndTime >= timeslot.endTime && req.body.operation === "enable") { // enable
            machine.isEnabled = true;
            machine.save();
            console.log("Timeslot id " + timeslot._id)
            console.log("Before " + timeslot.status);
            timeslot.status = "available";
            timeslot.save();
            console.log("After " + timeslot.status);
        }
    }
    console.log(machine.isEnabled);
    return res
        .status(200)
        .json({message: `Enable Disable is Done`});
};

async function enable_disable_machine(machineId, operation){
    console.log("Operation " + operation)
    let machine = await Machine.findById(machineId).populate({
        path: 'timeslots'
    }).exec();
    let matched_laundryRoom = null;
    let laundryRooms = await LaundryRoom.find({}).exec();
    for (let laundryRoom of laundryRooms) {
        for (let machine_id of laundryRoom.machines) {
            console.log(machine_id);
            if (machine_id == machineId) {
                matched_laundryRoom = laundryRoom;
                console.log('Room is matched');
            }
        }
    }
    let room_operation_start_time = matched_laundryRoom.operationStartHour;
    let room_operation_end_time = matched_laundryRoom.operationEndHour;
    const laundryRoomOperationStartTime = new Date();
    const laundryRoomOperationEndTime = new Date();
    laundryRoomOperationStartTime.setHours(0, 0, 0, 0);
    laundryRoomOperationEndTime.setHours(0, 0, 0, 0);

    laundryRoomOperationStartTime.setHours(room_operation_start_time);
    laundryRoomOperationEndTime.setHours(room_operation_end_time);
    /*if (!operation) {
        machine.isEnabled = false;
        machine.save();
        //console.log(timeslot.status);
    }*/
    console.log("operation for oncesi " + operation)
    console.log("operation for oncesi ! " + !operation)
    console.log("operation for oncesi type " + typeof(operation))
    var operation2 = (operation === 'true');
    for (let timeslot of machine.timeslots) {
        if (!operation2) {
            console.log("TIMESLOT CHANGE OUT OF SERVICE")
            console.log("Before " + timeslot.status);
            timeslot.status = "outOfService";
            timeslot.save();
            console.log("After " + timeslot.status);
        } else if (laundryRoomOperationStartTime <= timeslot.startTime &&
            laundryRoomOperationEndTime >= timeslot.endTime && operation2) { // enable
            //machine.isEnabled = true;
            //machine.save();
            console.log("Timeslot id " + timeslot._id)
            console.log("Before " + timeslot.status);
            timeslot.status = "available";
            timeslot.save();
            console.log("After " + timeslot.status);
        }
    }
}
module.exports = {
    list,
    create,
    get,
    update,
    remove,
    update_machine_price,
    updateMachineTimeSlot,
    enable_disable_machines_time_slots
};

