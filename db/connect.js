const mongoose = require('mongoose')

const connectString = 'mongodb+srv://thanatos5614:YxeBg8i5JYFaSZnG@cluster0.oatk9zp.mongodb.net/'

const connectDb = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDb

// .then(() => console.log('Connected to DB...'))
// .catch((error) => console.log(error))