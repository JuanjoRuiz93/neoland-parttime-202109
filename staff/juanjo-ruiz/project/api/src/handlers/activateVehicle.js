const { extractCompanyIdFromAuthorization } = require('./helpersCompany')
const { activateVehicle } = require('logic')
const { errors: { AuthError, NotFoundError, TypeError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const companyId = extractCompanyIdFromAuthorization(req)

        const { params: { vehicleId }, body: { password, active } } = req

        activateVehicle(companyId, vehicleId, password, active)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
                    status = 401
                else if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}