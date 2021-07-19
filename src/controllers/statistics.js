const {Rental, Payment} = require("../models/rental");

const list = async (req, res) => {
    try {

        let rentals = await Rental.find({ serviceProvider: req.body.serviceProvider }).exec();
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

        // console.log(payments);
        // let total_revenue = 0;
        // for (let obj of payments){
        //     console.log(obj.cost);
        // }
        /*
        payments.forEach(obj => {
            // total_revenue += obj.cost;
            console.log(obj.cost);
        })*/

        // return total revenue
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
    list
};
