const {Rental} = require("../models/rental");

const list = async (req, res) => {
    try {

        const machine_list = req.machines;
        // get all rentals
        let rentals = await Rental.find({}).exec();

        rentals.filter(r => r.machine === machine_list).map(r => r.product_url)

        let total_revenue = 0;
        rentals.forEach(obj => {
            total_revenue += obj.payment.cost;
        })

        // return total revenue
        return res.status(200).json(total_revenue);
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
