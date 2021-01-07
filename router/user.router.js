const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const user = require("../model/user.model");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {

    try {
        let { firstName, lastName, email, mobileNumber, password, confirmPassword } = req.body;

        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(password, salt);

        password = hash;
        confirmPassword = password;

        const userDocument = new user({ firstName, lastName, email, mobileNumber, password, confirmPassword });

        const saveData = await userDocument.save();

        if (saveData) {
            return res.send(saveData)
        }

    }

    catch (err) {
        return res.send(err);
    }
});

router.post("/login", async (req, res, next) => {

    try {
        const { email, password } = req.body;

        let userInfo = await user.findOne({ email });
        console.log(userInfo);

        if (userInfo) {
            console.log(1);
            const matched = await bcryptjs.compare(password, userInfo["password"]);
            console.log(matched);
            if (!matched) {
                return res.send({ Msg: "Invalid Credentials" });
            }
            else {
                const secretKey = "ASDFGHJKL";
                const token = jwt.sign({ id: userInfo._id }, secretKey, { expiresIn: "1d" });

                console.log(token);

                if (token) {
                    const updateToken = await user.findByIdAndUpdate(
                        { _id: userInfo._id },
                        {
                            $set: {
                                token: token
                            }
                        },
                        { new: true }
                    );

                    if (updateToken) {
                        return res.send(updateToken);
                    }
                }


            }
        }
        else if(!userInfo){
            return res.send({ Msg: "You are not registered with us" })
        }
    }

    catch (err) {
        return res.send(err);
    }
})

module.exports = router

