const LaundryRoom = require("../models/laundryroom");


const read = async (req, res) => {
    try {
        // get laundryRoom with id from database
        let laundryRoom = await LaundryRoom.findById(req.params.id).exec();

        // if no laundryRoom with id is found, return 404
        if (!movie)
            return res.status(404).json({
                error: "Not Found",
                message: `Movie not found`,
            });

        // return gotten laundry
        return res.status(200).json(movie);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

module.exports = {
    read
};
