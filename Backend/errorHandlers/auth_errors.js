const handleErrors = (err) => {
    
    let errors = { }

    //Duplicate Emails
    if(err.code === 11000){
        // errors.email = 'Email Already Registered'
        errors.email = 'Please complete verification before re-sending mail'
    }

    //Email Error
    else if(err.message.includes("Registration validations failed")){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
// err.code === 'EAUTH' || err.code === 'ECONNREFUSED'
    //Mail Sent Error
    else if((err.status == 400 || err.status == 500) && err.response || (err.errno && err.errno === 'ESOCKET')){
        // console.log(err.response.data.error_description);
        errors.mail = "Mail Not Sent , Try again after sometime"
    }

    else {
        errors.message = err.message
    }
    
    return errors
}

module.exports = handleErrors