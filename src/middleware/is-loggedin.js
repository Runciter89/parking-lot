const userController = require('../controllers/user')
const jwtController = require('../controllers/jwt')

module.exports = async (req, res, proceed) => {
  console.log('isLoggedIn', req)

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error('missing authorization header');
      return res.status(400).json({ success: false, error: 'missing authorization header' })
    }

    const validationResult = await jwtController.validateToken(authHeader);

    const user = await userController.get(validationResult.id)
    if (!user) {
      console.error('user not exists');
      return res.status(403).json({ success: false, error: 'user not exists' })
    }

    req.user = user;
    return proceed();
  } catch (e) {
    console.error(e)
    return res.status(401).json({ success: false, error: e.message })
  }
}