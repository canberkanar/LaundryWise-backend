const {Rental, Feedback, Payment} = require("../models/rental")
const {Machine, TimeSlot} = require("../models/laundryroom")
const User = require("../models/user");
var FeedbackController = require("./feedback"); // bu lazim mi? -Talha
var MachineController = require("./machine");


// Fetches all the rentals in DB
const list = async (req, res) => {
    try {
        let rentals = await Rental.find({}).exec();

        return res.status(200).json(rentals);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};


// Creates a new rental
const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    try {
        // fecth machine and the respective timeslot from DB
        let machine = await Machine.findById(req.body.machineId).exec();
        let timeSlot = await TimeSlot.findById(req.body.allocatedTimeId).exec();

        // Create payment
        paymentReq = {
            cost: machine.price,
            isPaid: true
        }
        let payment = await Payment.create(paymentReq);
        //
        let allUsers = await User.find({}).exec();
        console.log(allUsers);
        let customer = await User.findById(req.body.customerId).exec();
        console.log(customer);
        let serviceProvider = await User.findOne(
            {
                laundrywiseCode: customer.laundrywiseCode,
                role: "admin"
            }
        ).exec();
        //
        // Create rental
        let rental = await Rental.create(
            {
                machine: machine._id,
                machineType: machine.machineType,
                allocatedTime: timeSlot._id,
                payment: payment._id,
                customer: req.body.customerId,
                serviceProvider: serviceProvider._id
            }
        );

        // Update timeslot status
        timeSlot.status = "occupied";
        await timeSlot.save()
        let activationCode = generateActivationCode()
        let result = {
            _id: rental._id,
            machineType: rental.machineType,
            allocatedTime: rental.allocatedTime,
            activationCode: activationCode
        }
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Rental Create",
            message: err.message,
        });
    }
};


// Fetches  rental by the given id
const get = async (req, res) => {
    try {
        let rental = await Rental.findById(req.body.rentalId).exec();
        return res.status(200).json(rental);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Rental Get",
            message: err.message,
        });
    }
};


// Fetches all rentals for given user
const getAllRentalsUser = async (req, res) => {
    try {
        let rentals = await Rental.find(
            {
                customer: req.body.customerId
            } 
        ).exec();
        pastRentals = [];
        futureRentals = [];
        console.log("RENTALS")
        console.log(rentals)
        var timestampNow= Date.now();
        for (rental of rentals) {
            let timeSlot = await TimeSlot.findById(rental.allocatedTime).exec();
            let payment = await Payment.findById(rental.payment).exec();
            let machine = await Machine.findById(rental.machine).exec();
            // future rentals
            if (timeSlot.startTime > timestampNow) {
                const futureRental = {
                    _id: rental._id,
                    date: timeSlot.startTime,
                    machineNumber: machine.deviceNumberInRoom,
                    machineType: machine.machineType,
                    price: payment.cost
                }
                futureRentals.push(futureRental)
            } else {
                const pastRental = {
                    date: timeSlot.startTime,
                    price: payment.cost
                }
                pastRentals.push(pastRental)
            }
        }
        return res.status(200).json(
            {
                futureRentals: futureRentals,
                pastRentals: pastRentals
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Rental Get",
            message: err.message,
        });
    }
};


// Remove rental
const remove = async (req, res) => {
    try {
        let rental = await Rental.findById(req.params.id).exec();
        let timeSlot = await TimeSlot.findByIdAndUpdate(rental.allocatedTime, 
            { 
                $set: { 
                    status: 'available' 
                }
            }
        )
        let removed_payment = await Payment.findByIdAndDelete(rental.payment)
        let removed = await Rental.findByIdAndDelete(req.params.id);
        
        // Add email service here
        return res.status(200).send(removed);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Rental Delete",
            message: err.message,
        });
    }
};


const give_feedback_to_rental = async (req, res) => {


    try {
        let fdbck = await Feedback.create(req.body);
        let updated_Rental = await Rental.findOneAndUpdate(
            { _id: req.params.id},
            { $set: { feedback: fdbck } },{
                new: true
            });
        console.log(updated_Rental);

        return res.status(200).json(updated_Rental);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }

};


function generateActivationCode() {
    var result = "";
    for ( var i = 0; i < 4; i++ ) {
        var a = Math.floor(Math.random() * 10)
        result += a
    }
    return result;
}

module.exports = {
    list,
    create,
    get,
    remove,
    give_feedback_to_rental,
    getAllRentalsUser
};
