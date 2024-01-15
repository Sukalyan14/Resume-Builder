const mongoose = require('mongoose')

const connectDb = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDb

// .then(() => console.log('Connected to DB...'))
// .catch((error) => console.log(error))