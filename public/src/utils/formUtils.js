import { EmailCheckRegex , UpperCaseCheckRegex , LowerCaseCheckRegex , SpecialCharacterCheckRegex , NumberCheckRegex } from "../constant"

export const UPDATE_FORM = "UPDATE_FORM"

export const onInputChange = (name , value , dispatch , formState) => {

    dispatch({
        type: UPDATE_FORM , 
        data:{ name , value , hasError:false , error:"" , touched:false , isFormValid:false }
    })
}

export const onFocusOut = (name , value , dispatch , formState) => {
    const { hasError , error } = validateInput(name , value)
    let isFormValid = true
    
    for ( const key in formState){
        const item = formState[key]
        if(key === name && hasError){
            isFormValid = false
            break
        }else if(key !== name && item.hasError){
            isFormValid = false
            break
        }
    }

    dispatch({
        type: UPDATE_FORM , 
        data:{ name , value , hasError , error , touched:true , isFormValid }
    })
}

export const validateInput = (name , value) => {
    let hasError = false ,
        error = ""
    
    switch(name){
        case "email":
            if(value.trim() === ""){
                hasError = true
                error = "Email Cannot Be Empty"
            } else if (!EmailCheckRegex.test(value)){
                hasError = true 
                error = "Invalid Email. Please Check the Email"
            } else {
                hasError = false
                error = ""
            }
            break
        case "password":
            if(value.trim() === ""){
                hasError = true
                error = "Password Cannot Be Empty"
            } else if (value.length < 4){
                hasError = true
                error = "Password needs to be longer than 4 characters"
            } else if(!UpperCaseCheckRegex.test(value)){
                hasError = true
                error = "Password Must Contain an Upper Case"
            } else if(!LowerCaseCheckRegex.test(value)){
                hasError = true
                error = "Password Must Contain an Lower Case"
            } else if(!SpecialCharacterCheckRegex.test(value)){
                hasError = true
                error = "Password Must Contain an Special Character"
            } else if(!NumberCheckRegex.test(value)){
                hasError = true
                error = "Password Must Contain an Number"
            } else {
                hasError = false
                error = ""
            }
            break
        default:
            break
    }
    console.log(error);
    return { hasError , error }
}