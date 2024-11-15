import React from 'react'
import { Input , Button } from './index'
import { useForm } from 'react-hook-form'

function Register() {

    const formMethods = useForm({
        mode:"all",
        reValidateMode: 'onBlur',
    })

    const { handleSubmit } = formMethods

    const submit = async (data , errors) => {
        console.log(data)
        console.log(errors);
    }

  return (
    <form 
    className="mt-10 mb-3 container min-h-[360px]"
    noValidate
    onSubmit={handleSubmit(submit)}
    >   
        <Input 
            label="email"
            type="email"
            placeholder="Enter your email"
            {...formMethods}
        />

        <Input 
            label="password"
            type="password"
            placeholder="Enter your password"
            {...formMethods}
        /> 

        <Input 
            label='confirm-password'
            type='confirm-password'
            placeholder="Re-Enter your password"
            {...formMethods}
        />   
        
        <p className='text-slate-600 pb-2 text-sm text-end'>Forgot Password?</p>

        <Button btn_text = "Sign In"/>

    </form>
  )
}

export default Register