const { preferableType, pricePerSymbol, minPrice, minEditTime, symbPerHour } = require('../helpers/calculateOptions')

module.exports.makeOrder = (req, res, next) => {
    const options = req.body
    try {
        const price = calcPrice(options)
        const time = calcTime(options)
        res.status(201).send({
            price,
            time: Math.round(options.count / symbPerHour[options.language]),
            deadline: time.deadline_unix,
            deadline_date: time.deadline_date
        })
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
        const hoursToEdit = Math.round(options.count / symbPerHour[options.language]) < 1 ? 1 : Math.round(options.count / symbPerHour[options.language])
        const dateNow = new Date()
        dateNow.setDate(dateNow.getDate() + Math.floor(hoursToEdit / 9))
        dateNow.setHours(dateNow.getHours() + Math.round(hoursToEdit % 9))
        const deadLineTime = cleanUpTime(dateNow)
        return {
            deadline_date: `${deadLineTime.getDate()}/${deadLineTime.getMonth() + 1}/${deadLineTime.getFullYear()} ${deadLineTime.getHours()}:${deadLineTime.getMinutes()}:${deadLineTime.getSeconds()}`,
            deadline_unix: parseInt((deadLineTime.getTime() / 1000).toFixed(0))
        }
    } catch (error) {
        throw error
    }
}

function cleanUpTime(dateNow) {
    dateNow.setMinutes(dateNow.getMinutes() + 30)
    if (dateNow.getHours() > 19) {
        dateNow.setHours(dateNow.getHours() - 19 + 12)
        dateNow.setDate(dateNow.getDate() + 1)
    }
    return dateNow
}