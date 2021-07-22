const {Rental, Payment} = require("../models/rental");

const getStatistics = async (req, res) => {
    try {

        let rentals = await Rental.find(
            {
                serviceProvider: req.body.serviceProviderId
            }
        ).exec();
        console.log(rentals);
        // let x = await Payment.findById("60f4866660b4fd1c7d1af80d").exec();
        // console.log(x.cost)
        // let costs = rentals.map(r => Payment.findById(r.payment).cost);
        // console.log(costs);
        let costs = [];
        for (var r of rentals) {
            console.log(r);
            let p = await Payment.findById(r.payment).exec();
            costs.push(p.cost);
        }
        return res.status(200).json(costs);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};



module.exports = {
    getStatistics
};
