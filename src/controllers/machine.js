const {Machine, LaundryRoom, TimeSlot} = require("../models/laundryroom");

const numberOfDaysToGenerate = 1;

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
        console.log(req.body.id)
        let m = await Machine.findById(req.body.id).exec();
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
                for (j = 0; j < roomOperationEndHour - roomOperationStartHour - 1; j++) {

                    newStart.setHours(roomOperationStartHour + j)
                    newEnd.setHours(roomOperationStartHour + 1 + j)

                    let slot = {
                        date: new Date(today),
                        startTime: new Date(newStart),
                        endTime: new Date(newEnd)
                    };
                    let pushedTimeSlot;
                    pushedTimeSlot = await TimeSlot.create(slot);
                    timeslots.push(pushedTimeSlot); // new object creation is needed since values are overwritten due to pass by reference
                }

                today.setDate(today.getDate() + 1);
                newStart.setDate(newStart.getDate() + 1);
                newEnd.setDate(newStart.getDate())
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
    try {

        let filter = {_id: req.params.id};
        let updated_machine = req.body;
        let updated_version = await Machine.findOneAndUpdate(filter, updated_machine, {
            new: true
        });
        // Feedback.findOneAndUpdate({id:req.body.id}, req.body, function (err) {

        //   res.send(req.body);
        //});
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
    let removed = await Machine.findOneAndRemove({ _id: req.params.id }, function (err, response) {
        if (err) throw err;
        LaundryRoom.update(
            { "machines": req.params.id },
            { "$pull": { "machines": req.params.id } },
            function (err, res1){
                if (err) throw err;
                res.json(res1);
            }
        );
    });
    /*
    try {
        let matched_laundryRoom = null;
        let laundryRooms = await LaundryRoom.find({}).exec();
        for (let laundryRoom of laundryRooms){
            for(let machine_id of laundryRoom.machines){
                console.log(machine_id);
                if(machine_id == req.params.id){
                    matched_laundryRoom = laundryRoom;
                    matched_laundryRoom.machines
                    console.log('Room is matched');
                }
            }
        }
        let removed = await Machine.findByIdAndDelete(req.params.id);

        return res.status(200).send(removed);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
            */
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
    let machine= await Machine.findById(req.params.id).populate({
        path: 'timeslots'
    }).exec();
    let matched_laundryRoom = null;
    let laundryRooms = await LaundryRoom.find({}).exec();
    for (let laundryRoom of laundryRooms){
        for(let machine_id of laundryRoom.machines){
            console.log(machine_id);
            if(machine_id == req.params.id){
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
    if(req.body.operation === "disable"){
        machine.isEnabled = false;
        machine.save();
        //console.log(timeslot.status);
    }
    /*else{ // enable
        machine.isEnabled = true;
        machine.save();
    }*/


    for (let timeslot of machine.timeslots){
        if(req.body.operation === "disable"){
            console.log("Before " + timeslot.status);
            timeslot.status = "outOfService";
            timeslot.save();
            console.log("After "+ timeslot.status);
        }else if(laundryRoomOperationStartTime <= timeslot.startTime &&
            laundryRoomOperationEndTime >= timeslot.endTime && req.body.operation === "enable"){ // enable
            machine.isEnabled = true;
            machine.save();
            console.log("Timeslot id " + timeslot._id)
            console.log("Before " + timeslot.status);
            timeslot.status = "available";
            timeslot.save();
            console.log("After "+ timeslot.status);
        }

    }
    console.log(machine.isEnabled);
    //console.log("sa");
    return res
        .status(200)
        .json({ message: `Enable Disable is Done` });
};
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

