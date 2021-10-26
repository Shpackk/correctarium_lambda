const { preferableType, pricePerSymbol, minPrice, minEditTime, symbPerHour } = require('../helpers/calculateOptions')

module.exports.makeOrder = (req, res, next) => {
    const options = req.body
    try {
        const price = calcPrice(options)
        const time = calcTime(options)
    } catch (error) {
        console.log(error)
    }
}

function calcPrice(options) {
    try {
        const price = preferableType.includes(options.mimetype)
            ? options.count * pricePerSymbol[options.language]
            : (options.count * pricePerSymbol[options.language]) + (options.count * pricePerSymbol[options.language] * 0.2)

        const finalPrice = price < minPrice[options.language] ? minPrice[options.language] : price
        return finalPrice
    } catch (error) {
        throw error
    }
}

function calcTime(options) {
    try {
        const hoursToEdit = Math.round(options.count / symbPerHour[options.language])
        const dateNow = new Date()
        console.log(`${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`)
    } catch (error) {

    }
}