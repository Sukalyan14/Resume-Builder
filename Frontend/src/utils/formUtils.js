import { EmailCheckRegex , UpperCaseCheckRegex , LowerCaseCheckRegex , SpecialCharacterCheckRegex , NumberCheckRegex } from "../constant"

export const UPDATE_FORM = "UPDATE_FORM"

export const validateInput = (name , value , formState) => {
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
            } else if(!value.match(UpperCaseCheckRegex)){
                hasError = true
                error = "Password must contain an Upper case"
            } else if(!value.match(LowerCaseCheckRegex)){
                hasError = true
                error = "Password must Contain an Lower Case"
            } else if(!value.match(SpecialCharacterCheckRegex)){
                hasError = true
                error = "Password must Contain an Special Character"
            } else if(!value.match(NumberCheckRegex)){
                hasError = true
                error = "Password must Contain an Number"
            } else {
                hasError = false
                error = ""
            }
            break

        case "confirm_password":
            if(value.trim() === ""){
                hasError = true
                error = "Confirm Password cannot be empty"
            } else if(formState.password && formState.password.value && formState.password.value !== value){
                hasError = true
                error = "Password and confirm password must be same"
            }
            break
            
        default:
            break
    }

    return { hasError , error }
}

export const onInputChange = (name , value , dispatch , formState) => {
    // console.log(formState);
    const { hasError, error } = validateInput(name, value , formState)
    let isFormValid = true
    let isSubmitClicked = false
    
    
    for (const key in formState) {

      const item = formState[key]

      if (key === name && hasError) {   // Check if the current field has error
        isFormValid = false
        break
      } else if (key !== name && item.hasError) {  // Check if any other field has error
        isFormValid = false
        break
      }
  
    }
  
    dispatch({
      type: UPDATE_FORM,
      data: { name, value, hasError, error, touched: false, isFormValid , isSubmitClicked },
    })
}

export const onFocusOut = (name , value , dispatch , formState) => {
    
    const { hasError , error } = validateInput(name , value , formState)
    
    let isFormValid = true
    let isSubmitClicked = false
    
    for ( const key in formState){
        const item = formState[key]
        if(key === name && hasError){
            isFormValid = false
            break
        } else if(key !== name && item.hasError){
            isFormValid = false
            break
        }
    }

    dispatch({
        type: UPDATE_FORM , 
        data:{ name , value , hasError , error , touched:true , isFormValid , isSubmitClicked}
    })
}
