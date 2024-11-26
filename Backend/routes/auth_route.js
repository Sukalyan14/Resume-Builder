const express = require('express')
const router = express.Router()
const register = require('../controllers/auth/registerEmail')
const verifyEmail = require('../controllers/auth/verifyEmail')
const { checkDisposableEmail } = require('../middleware/checkDisposableEmail')
// module.exports = app => {
//     app.get("/api", (req, res) => {
//         console.log("Hit the route");
//         res.json({ message: '👋 from Express!' });
//     });
// };

router.route('/register').post(checkDisposableEmail , register)
router.route('/verifyEmail').get(verifyEmail)

module.exports = router