const handleErrors = (err) => {
    console.log(err)
    let errors = { }

    //Duplicate Emails
    if(err.code === 11000){
        // errors.email = 'Email Already Registered'
        errors.status = 400
        errors.message = 'Please complete verification before re-sending mail'
    }

    //Email Error
    else if(err.message.includes("Registration validations failed")){
        Object.values(err.errors).forEach(({ properties }) => {
            errors.status = 400
            errors[properties.path] = properties.message
        })
    }
// err.code === 'EAUTH' || err.code === 'ECONNREFUSED'
    //Mail Sent Error
    else if((err.status == 400 || err.status == 500) && err.response || (err.errno && err.errno === 'ESOCKET')){
        // console.log(err.response.data.error_description);
        errors.status = 500
        errors.message = "Mail Not Sent , Try again after sometime"
    }

    else {
        errors.status = 404
        errors.message = err.message
    }
    
    return errors
}

module.exports = handleErrors