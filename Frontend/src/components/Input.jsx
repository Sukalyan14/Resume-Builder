import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Input = ({ label , id , type , placeholder }) => {

    const { register } = useFormContext()
    
    return (
        <div className="flex flex-col w-full gap-2">
            <label htmlFor={id} className='capitalize text-base text-slate-600'>
                {label}
            </label>
            <input
                id={id} 
                type={type}
                placeholder={placeholder}
                className='mb-4 p-2
                     font-medium 
                     border-1 rounded-lg border-input-field-border
                     bg-input-field-color
                     placeholder-opacity-60
                     focus:outline-none focus:border-button-color '
                {...register(label , {
                    required:{
                        value:true,
                        message:`Required`
                    }
                })}
            />
        </div>
    )
}