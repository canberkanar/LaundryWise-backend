const {Rental, Payment} = require("../models/rental");


const getStatistics = async (req, res) => {
    try {
        let statistics = await getTotalRevenue(req.body.serviceProviderId)
        return res.status(200).json(statistics);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

async function getTotalRevenue(serviceProviderId) {
    var totalRevenue = 0;
    var washerRevenue = 0;
    var dryerRevenue = 0;

    var dryerCount = 0;
    var washerCount = 0;
    var totalCount = 0;
    let rentals = await Rental.find(
        {
            serviceProvider: serviceProviderId
        }
    ).exec();
    for (var rental of rentals) {
        let payment = await Payment.findById(rental.payment).exec();
        if (rental.machineType == "washer") {
            washerRevenue = washerRevenue + payment.cost;
            washerCount = washerCount + 1;
        } 
        else if (rental.machineType == "dryer") {
            dryerRevenue = dryerRevenue + payment.cost;
            dryerCount = dryerCount + 1;
        }
        totalRevenue = totalRevenue + payment.cost;
        totalCount = totalCount + 1;
    }
    console.log(
        {
            washerRevenue: washerRevenue,
            dryerRevenue: dryerRevenue,
            totalRevenue: totalRevenue,
            washerCount: washerCount,
            dryerCount: dryerCount,
            totalCount: totalCount
        }
    )
    return {
        washerRevenue: washerRevenue,
        dryerRevenue: dryerRevenue,
        totalRevenue: Math.round(totalRevenue * 10) / 10,
        washerCount: washerCount,
        dryerCount: dryerCount,
        totalCount: totalCount
    }

}


module.exports = {
    getStatistics
};
