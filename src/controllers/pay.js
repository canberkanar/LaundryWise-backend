const {Payment} = require("../models/rental");

const list = async (req, res) => {
    try {
        // get all rentals in database
        let payments = await Payment.find({}).exec();


        return res.status(200).json(payments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Payment List",
            message: err.message,
        });
    }
};

// fetches payment by given id
const get = async (req, res) => {
    try {
        console.log(req.body.id)
        let payment = await Payment.findById(req.param.id).exec();
        return res.status(200).json(payment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Get Payment",
            message: err.message,
        });
    }
};


// creates a new Payment and attaches it to an existing Rental
const create = async (req, res) => {
               
    // if (Object.keys(req.body).length === 0)
    //     return res.status(400).json({
    //         error: "Bad Request",
    //         message: "The request body is empty",
    // });

    try {
        let payment = await Payment.create(req.body);
        return res.status(201).json(added_payment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Payment Create",
            message: err.message,
        });
    }
};


// removes a payment entry from DB
const remove = async (req, res) => {
    try {
        let removed = await Payment.findByIdAndDelete(req.params.id);
        return res.status(200).send(removed);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Payment Delete",
            message: err.message,
        });
    }
};


module.exports = {
    list,
    get,
    create,
    remove
};
