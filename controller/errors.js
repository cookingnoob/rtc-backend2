const wrongUrl =  (req, res, next) => {
    const err = new Error('not found')
    next(err)
}

module.exports = {
    wrongUrl
}