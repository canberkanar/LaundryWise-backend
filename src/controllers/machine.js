const LaundryRoom = require("../models/laundryroom");

const list = async (req, res) => {
    try {
        // get all laundryrooms in database
        let machines = await LaundryRoom.find({}).exec();

        // return gotten movies
        return res.status(200).json(machines);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};


module.exports = {
    list
};
