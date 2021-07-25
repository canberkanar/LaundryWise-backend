const {Feedback} = require("../models/rental");

const list = async (req, res) => {
    try {
        // get all laundryrooms in database
        let feedback = await Feedback.find({}).exec();


        return res.status(200).json(feedback);
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
        // get all laundryrooms in database
        console.log(req.body.id)
        let feedback = await Feedback.findById(req.body.id).exec();

        return res.status(200).json(feedback);
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
    // if (Object.keys(req.body).length === 0)
    //     return res.status(400).json({
    //         error: "Bad Request",
    //         message: "The request body is empty",
    //     });

    // handle the request
    try {
        // create feedback in database
        let feedback = await Feedback.create(req.body);

        // return created feedback
        return res.status(201).json(feedback);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error - Create Feedback",
            message: err.message,
        });
    }
};

const update = async (req, res) => {
    try {

        let filter = { _id: req.params.id };
        let updated_feedback = req.body;
        let updated_version = await Feedback.findOneAndUpdate(filter, updated_feedback, {
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
    try {
        let removed = await Feedback.findByIdAndDelete(req.params.id);
        return res.status(200).send(removed);

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
    remove
};
