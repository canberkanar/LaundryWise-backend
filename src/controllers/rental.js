/**
 * @author canberk.anar
 */
const {Rental} = require("../models/rental")
const {Feedback} = require("../models/rental");
var feedback_helpers = require("./feedback");


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

        let r = await Rental.findById(req.params.id).exec();
        if (!r)
            return res.status(404).json({
                error: "Not Found",
                message: `Machine not found`,
            });
        console.log(r.feedback);
        r.feedback = undefined;
        await r.save();
        console.log(r.feedback);
        r.feedback = req.body;
        await r.save();
        console.log(r.feedback);

        //Rental.updateOne(r).exec();

        return res.status(200).json(r);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
    /*
    try {

        let r = await Rental.findById(req.params.id).exec();
        if (!r)
            return res.status(404).json({
                error: "Not Found",
                message: `Machine not found`,
            });

        let filter = { _id: req.params.id };

        r.feedback._doc['score'] = req.body.score;
        r.feedback._doc['message'] = req.body.message;
        var productToUpdate = {};
        productToUpdate = Object.assign(productToUpdate, r.feedback._doc);
        delete productToUpdate._id;
        let updated_version = await Rental.findOneAndUpdate(filter, productToUpdate, {
            new: true
        });
        return res.status(200).json(updated_version);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }*/
    /*
    try {

        let r = await Rental.findById(req.params.id).exec();
        if (!r)
            return res.status(404).json({
                error: "Not Found",
                message: `Machine not found`,
            });

        //let feedback = feedback_helpers.create(req,res);
        //const feedback= Feedback.findById(r.feedback.id).exec();
        //feedback.score = req.body.score;
        //feedback.message = req.body.message;
        //Feedback.updateOne(feedback).exec();
        //r.feedback = feedback;
        return res.status(200).json(r);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }*/
    /*
    try {
        // get all laundryrooms in database
        //let feedback = await Feedback.find({}).exec();
        //let feedback = await Feedback.findById(req.body.id).exec();
        //feedback['score'] =  req.body.score;
        //feedback['message'] = req.body.message;
        // return gotten movies
        let filter = { _id: req.params.id };
        let updated_feedback = req.body;
        let updated_version = await Rental.findOneAndUpdate(filter,{ $set: updated_feedback }, {
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
    */
 /*
    try {

        let r = await Rental.findById(req.params.id).exec();
        if (!r)
            return res.status(404).json({
                error: "Not Found",
                message: `Machine not found`,
            });


        r.feedback.score = req.body.score;
        r.feedback.message = req.body.message;ben

        Rental.updateOne(r).exec();

        return res.status(200).json(r);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
    // check if the body of the request contains all necessary properties
    //let feedback = create(req,res);
    //console.log(feedback)
*/
};

module.exports = {
    list,
    create,
    give_feedback_to_rental
};
