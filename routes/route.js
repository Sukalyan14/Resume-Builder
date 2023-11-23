const express = require('express')
const router = express.Router()
const { dummy , register } = require('../controllers/auth')
// module.exports = app => {
//     app.get("/api", (req, res) => {
//         console.log("Hit the route");
//         res.json({ message: '👋 from Express!' });
//     });
    
// };

router.route('/').get(dummy)

router.route('/').post(register)

module.exports = router