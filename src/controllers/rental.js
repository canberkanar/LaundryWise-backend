const {Rental, Feedback, Payment} = require("../models/rental")
const {Machine, TimeSlot} = require("../models/laundryroom")
var FeedbackController = require("./feedback"); // bu lazim mi? -Talha
var MachineController = require("./machine");


// Fetches all the entals in DB
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

    // handle the request
    try {
        // let feedback = await FeedbackController.create({});
        // Fetch machine and timeslot
        let machine = await Machine.findById(req.body.machine_id).exec();
        let timeSlot = await TimeSlot.findById(req.body.allocated_time_id).exec();

        // Create payment
        payment_req = {
            cost: machine.price,
            isPaid: true
        }
        let payment = await Payment.create(payment_req);

        // Create rental
        rental_req = {
            machine: machine._id,
            allocatedTime: timeSlot._id,
            payment: payment._id,
            customer: req.body.customer_id,
            serviceProvider: req.body.service_provider_id
        }
        let rental = await Rental.create(rental_req);

        // Update timeslot status
        timeSlot.status = "occupied";
        await timeSlot.save()

        return res.status(201).json(rental);
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
        let rental = await Rental.findById(req.param.id).exec();
        return res.status(200).json(rental);
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

module.exports = {
    list,
    create,
    get,
    remove,
    give_feedback_to_rental
};
