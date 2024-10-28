const handleErrors = (err) => {
    console.log(err);
    // console.log(err.message);
    // console.log( err.errors.email.properties );
    let errors = { email : '' , password: '' , mail:'' }

    //Duplicate Emails
    if(err.code === 11000){
        errors.email = 'Email Already Registered'
    }

    //Email Error
    if(err.message.includes("Registration validations failed")){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    //Mail Sent Error
    if(err.code === 'EAUTH' || err.code === 'ECONNREFUSED' || err.response && err.response.includes('Mailbox quota exceeded') || err.responseCode === 500){
        // console.log(err.message , err.responseCode);
        errors.mail = "Mail Not Sent"
    }

    return errors
}

module.exports = handleErrors