/**
 * @author canberk.anar
 */
const {Rental, Feedback, Payment} = require("../models/rental")
var feedback_helpers = require("./feedback"); // bu lazim mi? -Talha


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
        let payment = await Payment.create(req.body);
        let rental = await Rental.create(req.body);
        let added_payment = await Rental.findOneAndUpdate({
                _id: rental._id
            },
            { 
                $set: { 
                    payment: payment 
                } 
            },
            {
                new: true
            }
        );

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


// Updates an existing Rental
const update = async (req, res) => {
    try {

        let filter = {_id: req.params.id};
        let updated_rental = req.body;
        let updated_version = await Rental.findOneAndUpdate(
            filter, 
            updated_rental, 
            {
                new: true
            }
        );
        return res.status(200).send(updated_version);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Update Rental",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        let rental = await Rental.findById(req.params.id).exec();
        let removed_payment = await Payment.findByIdAndDelete(rental.payment)
        let removed = await Rental.findByIdAndDelete(req.params.id);
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
    update,
    remove,
    give_feedback_to_rental
};
