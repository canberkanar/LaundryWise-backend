const {Rental} = require("../models/rental");

const list = async (req, res) => {
    try {

        let rentals = await Rental.find({ serviceProvider: req.body.serviceProvider }).exec();

        // rentals.filter(r => r.machine === machine_list).map(r => r.payment)

        // let total_revenue = rentals.filter(r => r.machine === machine_list).map(r => r.payment);
        // rentals.forEach(obj => {
        //     total_revenue += obj.payment.cost;
        // })

        // return total revenue
        return res.status(200).json(rentals);
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
