/**
 * @author canberk.anar
 */
const {Rental} = require("../models/rental")
const {Feedback} = require("../models/rental");
var feedback_helpers = require("./feedback"); // bu lazim mi? -Talha


const list = async (req, res) => {
    try {
        // get all rentals in database
        let rentals = await Rental.find({}).exec();

        // return gotten movies
        return res.status(200).json(rentals);
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
        let rental = await Rental.create(req.body);

        return res.status(201).json(rental);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
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
    give_feedback_to_rental
};
