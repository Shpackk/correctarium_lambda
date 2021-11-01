const { calcPrice, calcTime, correctionOfTime } = require('../controllers/priceController')
// const { symbPerHour, pricePerSymbol, preferableType, minPrice } = require('../helpers/calculateOptions')

describe('Unit testing', () => {
    test('[CorrectionOfTime] Should correct time between 12 and 19 oclock', () => {
        const dateNow = new Date()
        dateNow.setHours(dateNow.getHours() + Math.floor(Math.random() * (60 - 30 + 1) + 30))
        const time = correctionOfTime(dateNow, Math.floor(Math.random() * (8 - 3 + 1) + 3))
        const hours = time.getHours()
        expect(hours).toBeGreaterThanOrEqual(12)
        expect(hours).toBeLessThanOrEqual(19)
    })

    test('[CalcTime] should return object with unix and normal timestamps', () => {
        const result = calcTime({
            language: 'en',
            mimetype: 'rtf',
            count: 10000
        })
        expect(result).toEqual(expect.objectContaining({
            deadline_date: expect.any(String),
            deadline_unix: expect.any(Number)
        }))
    })
    test('[CalcTime] time can\'t be lower than 1 hour (en)', () => {
        const result = calcTime({
            language: 'en',
            mimetype: 'rtf',
            count: 1
        })
        const dateNow = new Date()
        dateNow.setHours(12)
        const hours = dateNow.getHours()
        const resultHours = result.deadline_date.split(' ')[1].split(':')[0]
        expect(resultHours > hours).toBeTruthy()
    })
    test('[CalcTime] time can\'t be lower than 1 hour (ua)', () => {
        const result = calcTime({
            language: 'ua',
            mimetype: 'rtf',
            count: 1
        })
        const dateNow = new Date()
        dateNow.setHours(12)
        const hours = dateNow.getHours()
        const resultHours = result.deadline_date.split(' ')[1].split(':')[0]
        expect(resultHours > hours).toBeTruthy()
    })
    test('[CalcTime] time can\'t be lower than 1 hour (ru)', () => {
        const result = calcTime({
            language: 'ru',
            mimetype: 'rtf',
            count: 1
        })
        const dateNow = new Date()
        dateNow.setHours(12)
        const hours = dateNow.getHours()
        const resultHours = result.deadline_date.split(' ')[1].split(':')[0]
        expect(resultHours > hours).toBeTruthy()
    })


    test('[CalcPrice] should return price of work', () => {
        const result = calcPrice({
            language: 'en',
            mimetype: 'rtf',
            count: 10000
        })
        expect(result).toEqual(expect.any(Number))
    })

    test('[CalcPrice] Preferable mimetype should cost less', () => {
        const preferableMime = calcPrice({
            language: 'en',
            mimetype: 'rtf',
            count: 10000
        })
        const nonPreferable = calcPrice({
            language: 'en',
            mimetype: 'txt',
            count: 10000
        })
        expect(preferableMime).toBeLessThan(nonPreferable)
    })

    test('[CalcPrice] 1 char of text can\'t cost lower than 50(ua)', () => {
        const result = calcPrice({
            language: 'ua',
            mimetype: 'rtf',
            count: 1
        })
        expect(result).not.toBeLessThan(50)
    })
    test('[CalcPrice] 1 char of text can\'t cost lower than 50(ru)', () => {
        const result = calcPrice({
            language: 'ru',
            mimetype: 'rtf',
            count: 1
        })
        expect(result).not.toBeLessThan(50)
    })
    test('[CalcPrice] 1 char of text can\'t cost lower than 120(en)', () => {
        const result = calcPrice({
            language: 'en',
            mimetype: 'rtf',
            count: 1
        })
        expect(result).not.toBeLessThan(120)
    })

})

