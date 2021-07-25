"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");
const user = require("../models/user");

const login = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a username property",
        });

    // handle the request
    try {
        // get the user form the database
        let user = await UserModel.findOne({
            username: req.body.username,
        }).exec();

        // check if the password is valid
        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) return res.status(401).send({ token: null });

        // if user is found and password is valid
        // create a token
        const token = jwt.sign(
            { 
                _id: user._id,
                username: user.username,
                email: user.email,
                address: user.address,
                mobileNumber: user.mobileNumber,
                role: user.role,
                laundrywiseCode: user.laundrywiseCode
            },
            config.JwtSecret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        return res.status(200).json({
            token: token,
            laundrywiseCode: user.laundrywiseCode
        });
    } catch (err) {
        return res.status(404).json({
            error: "User Not Found",
            message: err.message,
        });
    }
};

const register = async (req, res) => {
    console.log("REGISTER - Laundrywise Code")
    console.log(req.body)
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a username property",
        });

    if (req.body.role === "customer") {
        if (!Object.prototype.hasOwnProperty.call(req.body, "laundrywiseCode"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a laundrywise code property",
        });
        let myServiceProvicer = await UserModel.findOne(
            {
                role: "admin",
                laundrywiseCode: req.body.laundrywiseCode
            }
        ).exec();
        console.log("SERVICE PROVIDER NOT FOUND")
        if (!myServiceProvicer)
            return res.status(400).json({
                error: "Bad Request",
                message: "The laundrywise code does not exist",
            });
    }

    // handle the request
    try {
        if (req.body.role === "admin") {
            var laundrywiseCode = makeid(5);
            console.log("IT IS ADMIN")
            console.log(laundrywiseCode)
        }
        else if (req.body.role === "customer") {
            console.log("IT IS CUSTOMER")
            var laundrywiseCode = req.body.laundrywiseCode;
        }
            
        // hash the password before storing it in the database
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        // create a user object
        const user = {
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            password: hashedPassword,
            mobileNumber: req.body.mobileNumber,
            role: req.body.role,
            laundrywiseCode: laundrywiseCode,
        };

        // create the user in the database
        let retUser = await UserModel.create(user);

        // if user is registered without errors
        // create a token
        const token = jwt.sign(
            {
                _id: retUser._id,
                username: retUser.username,
                email: retUser.email,
                address: retUser.address,
                mobileNumber: retUser.mobileNumber,
                laundrywiseCode: retUser.laundrywiseCode,
                role: retUser.role,
                laundryRooms: retUser.laundryRooms,
            },
            config.JwtSecret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        // return generated token
        res.status(200).json({
            token: token,
            _id: retUser._id,
            laundrywiseCode: retUser.laundrywiseCode
        });
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: "User exists",
                message: err.message,
            });
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: err.message,
            });
        }
    }
};

const me = async (req, res) => {
    try {
        // get own user name from database
        let user = await UserModel.findById(req.userId)
            .select("username")
            .exec();

        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


const getMyServiceProvider = async (req, res) => {
    try {
        // get own user name from database
        let customer = await UserModel.findById(req.body.customerId).exec();
        console.log(customer)
        if (!customer)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });
        
        let serviceProvider = await UserModel.findOne(
            {
                laundrywiseCode: customer.laundrywiseCode,
                role: "admin"
            }
        ).exec();

        return res.status(200).json(
            {
                serviceProviderId: serviceProvider._id
            }
        );
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = {
    login,
    register,
    logout,
    me,
    getMyServiceProvider
};
