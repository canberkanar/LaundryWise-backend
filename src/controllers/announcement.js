const {Announcement} = require("../models/laundryroom");

const list = async (req, res) => {
    try {
        // get all announcements in database
        let announcements = await Announcement.find({}).exec();

        return res.status(200).json(announcements);
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
        let announcement = await Announcement.findById(req.params.id).exec();

        if (!announcement)
            return res.status(404).json({
                error: "Not Found",
                message: `Announcement not found`,
            });

        return res.status(200).json(announcement);
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
        // create movie in database
        let announcement = await Announcement.create(req.body);

        // return created movie
        return res.status(201).json(announcement);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
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
        let announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        return res.status(200).json(announcement);
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
        await Announcement.findByIdAndRemove(req.params.id).exec();

        return res
            .status(200)
            .json({message: `Announcement with id ${req.params.id} was deleted`});
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
    read,
    create,
    update,
    remove
};
