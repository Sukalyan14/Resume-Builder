import React from 'react'
import { Input , Button } from './index'
import { useForm } from 'react-hook-form'

const Login = () => {

    const { handleSubmit } = useForm()

    const onSubmit = handleSubmit(data => {
        console.log(data);
    })
    // console.log({...methods});
    
  return (

    <form 
        className="mt-10 mb-3 container"
        noValidate
        onSubmit={(e) => e.preventDefault()}
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

        <p className='text-slate-600 pb-2 text-sm text-end'>Forgot Password?</p>

        <Button btn_text = "Sign In" onClick={onSubmit} />

    </form>

  )
}

export default Login
{/* <p className='text-xs mt-1 p-1 min-h-3 text-error-color'></p> */}