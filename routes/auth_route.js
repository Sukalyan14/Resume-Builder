const express = require('express')
const router = express.Router()
const { register , verifyEmail } = require('../controllers/auth')

// module.exports = app => {
//     app.get("/api", (req, res) => {
//         console.log("Hit the route");
//         res.json({ message: '👋 from Express!' });
//     });
// };

router.route('/register').post(register)
router.route('/verifyEmail').get(verifyEmail)

module.exports = router