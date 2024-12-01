import React from 'react'
import { Input , Button } from './index'
import { useFormContext } from 'react-hook-form'

const Login = () => {

    const { handleSubmit } = useFormContext()

    const submit =  async (data) => {
        console.log(data)
    }
    
  return (

    <form 
        className="mt-10 mb-3 container"
        noValidate
        onSubmit={handleSubmit(submit)}
    >   
        <Input 
            label="email"
            type="email"
            placeholder="Enter your email"
        />

        <Input 
            label="password"
            type="password"
            placeholder="Enter your password"
        />    

        <p 
            className='text-slate-600 pb-2 text-sm text-end'
        >Forgot Password?</p>

        <Button btn_text = "Sign In" />

    </form>

  )
}

export default Login
{/* <p className='text-xs mt-1 p-1 min-h-3 text-error-color'></p> */}