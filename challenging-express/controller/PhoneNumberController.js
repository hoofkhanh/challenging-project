
const phoneNumberService = require('../service/PhoneNumberService');

// tham số là phoneNumber trong body
const createNewAccessCode = async (req, res) => {
    try {
        const data =req.body;

        const accessCode = await phoneNumberService.createNewAccessCode(data.phoneNumber);

        res.status(200).send(accessCode);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed" });
    }
};

// tham số là phoneNumber, và accessCode trong body
const validateAccessCode = async (req, res) => {
    try {
        const data =req.body;
        const validate = await phoneNumberService.validateAccessCode(data.phoneNumber, data.accessCode);
        console.log(validate)
        res.status(200).send(validate);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed" });
    }
};


module.exports = {
    createNewAccessCode,
    validateAccessCode,
}

