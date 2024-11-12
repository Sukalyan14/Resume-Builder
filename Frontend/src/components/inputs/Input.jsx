import { useId , forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { 
     emailCheckRegex ,
     numberCheckRegex ,
     upperCaseCheckRegex ,
     lowerCaseCheckRegex ,
     specialCharacterCheckRegex
    } from '../../constant/regex-pattern'

const Input = forwardRef( ({ label , type , placeholder , ...props } , ref) => {

    const id = useId()

    const { register , formState: {errors} } = useForm({
        mode:"onBlur"
    })
    
    //For email Validation
    const emailValidation = (value) => emailCheckRegex.test(value) ||
                                    "Email address must be a valid address"

    //For password Validations
    const passwordValidation = {
        minlength : (value) => value.length >= 6 || 'Must be atleast six characters',
        hasSpecialChar : (value) => specialCharacterCheckRegex.test(value) || 'Must have special characters',
        hasLowerCase: (value) => lowerCaseCheckRegex.test(value) || 'Must have lower characters',
        hasUpperCase: (value) => upperCaseCheckRegex.test(value) || 'Must have upper characters',
        hasNumber: (value) => numberCheckRegex.test(value) || 'Must have numbers', 
    }

    return (
        <div className="flex flex-col w-full mb-3">
            <label htmlFor={id} className='capitalize text-base text-slate-600'>
                {label}
            </label>
            <input
                id={id} 
                type={type}
                placeholder={placeholder}
                ref={ref}
                className='p-2
                     font-medium 
                     border-1 rounded-lg border-input-field-border
                     bg-input-field-color
                     placeholder-opacity-60
                     focus:outline-none focus:border-button-color '
                {...props}
                {...register(label , {
                    required:{
                        value:true,
                        message:`Please fill the ${label}`,
                    },
                    validate:{
                        ...(type === 'email' && {
                            emailCheck:(value) => emailValidation(value) || 'Invalid Email'
                        }),
                        ...(type === 'password' && passwordValidation)
                    }
                })}
            />
            {/* <p className='text-xs text-red-500'>{errors[label] && errors[label].message}</p> */}
            <p className='text-xs text-red-500 h-3'>{errors[label] ? errors[label].message : " "}</p>
        </div>
    )
})

export default Input
