const { createVehicle } = require('logic')
const { extractCompanyIdFromAuthorization } = require('./helpersCompany')
const { errors: { DuplicityError, TypeError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const companyId = extractCompanyIdFromAuthorization(req)

        const { body: { lisense, brand, model, frame, active } } = req

        createVehicle(companyId, lisense, brand, model, frame, active)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(400).json({ error: error.message })
    }
}