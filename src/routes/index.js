const express = require('express')
const router = express()

const authRouter = require('./auth')
const vehicleRouter = require('./vehicle')
const registerRouter = require('./register')
const reportRouter = require('./report')
const userRouter = require('./user')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/vehicle', vehicleRouter)
router.use('/register', registerRouter)
router.use('/report', reportRouter)


module.exports = router