const CustomError = require('./CustomError')

const devError = (res , error) => {
    console.log("in dev error" , error)
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message,
        stackTrace:error.stack,
        error:error
    })
}

const prodError = (res , error) => {
    if(error.Operational){
        res.status(error.statusCode).json({
            status:error.statusCode,
            message:error.message,
        })
    } else {
        res.status(500).json({
            status: 'error',
            message : 'Something went wrong , Please try again later.'
        })
    }
}
//To catch mongoose based id error
const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}:${err.value}`
    return new CustomError(msg , 400)
}

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(value => value.message)
    const errorMessage = errors.join('. ')
    const msg = `Invalid Input data : ${errorMessage}`

    return new CustomError(msg , 400)
}

const globalErrorHandler = (error , req , res , next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        devError(res , error)
    } else if(process.env.NODE_ENV === 'production'){

        if(error.name === 'CastError') error = castErrorHandler(error)
        if(error.errors.name = 'ValidationError') error = validationErrorHandler(error)
        
        prodError(res , error)
    }
}

module.exports = globalErrorHandler