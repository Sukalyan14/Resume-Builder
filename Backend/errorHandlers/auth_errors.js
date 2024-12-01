const handleErrors = (err) => {
    console.log(err.response.data.error_description , err.status);
    // console.log(err.message);
    // console.log( err.errors.email.properties );
    let errors = { email : '' , password: '' , mail:'' }

    //Duplicate Emails
    if(err.code === 11000){
        // errors.email = 'Email Already Registered'
        errors.email = 'Please complete verification before re-sending mail'
    }

    //Email Error
    if(err.message.includes("Registration validations failed")){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
// err.code === 'EAUTH' || err.code === 'ECONNREFUSED'
    //Mail Sent Error
    if((err.status == 400 || err.status == 500) && err.response){
        // console.log(err.response.data.error_description);
        errors.mail = "Mail Not Sent , Try again after sometime"
    }

    return errors
}

module.exports = handleErrors