import React from 'react'
import Button from './styled-components/Button'
import {Input} from './Input'
import { FormProvider, useForm } from 'react-hook-form'

export const Login = () => {

    const methods = useForm()

    const onSubmit = methods.handleSubmit(data => {
        console.log(data);
    })
    // console.log({...methods});
    
  return (
    <FormProvider {...methods}>
        <form 
            className="my-10 container"
            noValidate
            onSubmit={(e) => e.preventDefault()}
        >
            
            <Input 
                id='email'
                label="email"
                type="text"
                placeholder="Enter your email"
            />

            <Input 
                id='password'
                label="password"
                type="password"
                placeholder="Enter your password"
            />

            <p className='text-slate-600 pt-2 pb-1 text-xs text-end'>Forgot Password?</p>

            <Button btn_text = "Sign In" onClick={onSubmit} />

        </form>
    </FormProvider>
  )
}

{/* <p className='text-xs mt-1 p-1 min-h-3 text-error-color'></p> */}