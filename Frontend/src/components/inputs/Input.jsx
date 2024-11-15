import { useId , forwardRef } from 'react'

import { 
     emailCheckRegex ,
     numberCheckRegex ,
     upperCaseCheckRegex ,
     lowerCaseCheckRegex ,
     specialCharacterCheckRegex
    } from '../../constant/regex-pattern'

const Input = forwardRef( ({ label , type , placeholder , ...props } , ref) => {

    const id = useId()
    const { register , formState: { errors } , getValues , trigger , watch } = props
    
    //For email Validation
    const emailValidation = {
        emailCheck: (value) => emailCheckRegex.test(value) || "Invalid Email"
    } 
    
    //For password Validations
    const passwordValidation = {
        hasSpecialChar : (value) => specialCharacterCheckRegex.test(value) || 'Must have special characters',
        hasLowerCase: (value) => lowerCaseCheckRegex.test(value) || 'Must have lower-case characters',
        hasUpperCase: (value) => upperCaseCheckRegex.test(value) || 'Must have upper-case characters',
        hasNumber: (value) => numberCheckRegex.test(value) || 'Must have numbers', 
        minlength : (value) => value.length >= 6 || 'Must be atleast six characters',
    }

    //For confirm password validations
    const confirmPasswordValidation = {
        checkConfirmPassword : (value) => getValues("password") === value || "Passwords did not match"
    }
    //For some reason only after min length is satisfied and on the 7th character does the other password validations are triggering
    // console.log(errors[label])
    const normalizedLabel = label.toLowerCase().replace('-', ' ')
    
    return (
        <div className="flex flex-col w-full mb-3">
            <label htmlFor={id} className='capitalize text-base text-slate-600 mb-1 ml-1'>
                {normalizedLabel}
            </label>
            <input
                id={id} 
                type={type === 'confirm-password' ? "password" : type}
                placeholder={placeholder}
                ref={ref}
                className='p-2
                     font-medium 
                     border-1 rounded-lg border-input-field-border
                     bg-input-field-color
                     placeholder-opacity-60
                     focus:outline-none focus:border-button-color '
                
                {...register(label , {
                    required:{
                        value:true,
                        message:`Please fill the ${label}`,
                    },
                    validate:{
                        ...(type === 'email' && emailValidation),
                        ...(type === 'password' && passwordValidation),
                        ...(type === 'confirm password' && confirmPasswordValidation)
                    },
                    // onBlur:() => console.log(errors[label].message)
                })}
            />

            <p className='text-xs text-red-500 h-3'>{errors[label] && errors[label].message}</p>
        </div>
    )
})

export default Input
