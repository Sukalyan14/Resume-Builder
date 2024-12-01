import { useId , forwardRef } from 'react'
import { RxCross2 } from "react-icons/rx";
import { 
     emailCheckRegex ,
     numberCheckRegex ,
     upperCaseCheckRegex ,
     lowerCaseCheckRegex ,
     specialCharacterCheckRegex
    } from '../../constant/regex-pattern'
import { useFormContext } from 'react-hook-form';

const Input = forwardRef( ({ label , type , placeholder , ...props } , ref) => {

    const id = useId()
    // const { register , formState: { errors } , getValues } = props
    const { register , formState: { errors } , getValues } = useFormContext()
    //For email Validation
    const emailValidation = {
        emailCheck: (value) => emailCheckRegex.test(value) || "Invalid Email"
    } 
    
    //For password Validations
    const passwordValidation = {
        hasLowerCase: (value) => lowerCaseCheckRegex.test(value) || 'Must have lower-case characters',
        hasUpperCase: (value) => upperCaseCheckRegex.test(value) || 'Must have upper-case characters',
        hasSpecialChar : (value) => specialCharacterCheckRegex.test(value) || 'Must have special characters',
        hasNumber: (value) => numberCheckRegex.test(value) || 'Must have numbers', 
        minlength : (value) => value.length >= 6 || 'Must be atleast six characters',
    }

    //For confirm password validations
    const confirmPasswordValidation = {
        checkConfirmPassword : (value) => getValues("password") === value || "Passwords did not match"
    }
    
    const normalizedLabel = label.toLowerCase().replace('_', ' ')

    //Clear Input field
    const clearField = (e) => {
        e.preventDefault()
        e.target.previousElementSibling.value = ''
    }
    
    return (
        <div className="flex flex-col w-full mb-3 relative">
            <label htmlFor={id} className='capitalize text-base text-slate-600 mb-1 ml-1'>
                {normalizedLabel}
            </label>
            <input
                id={id} 
                type={type === 'confirm_password' ? "password" : type}
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
                        ...(type === 'confirm_password' && confirmPasswordValidation)
                    },
                    // onBlur:() => console.log(errors[label].message)
                })}
            />
            <RxCross2 
                className='absolute top-1/2 right-0 -translate-x-3/4 mx-1 hover:cursor-pointer'
                onClick={clearField}
            />
            <p className='text-xs text-error-color h-3'>{errors[label] && errors[label].message}</p>
        </div>
    )
})

export default Input
