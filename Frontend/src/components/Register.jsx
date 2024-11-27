import React from 'react'
import axios from 'axios'
import { Input , Button } from './index'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { togglePopup } from '../feature/CustomPopupSlice'
import { axiosClientAuth } from '../constant/axios-client'

function Register() {

    const dispatch = useDispatch()

    const { handleSubmit } = useFormContext()

    const submit = async ({ email , password }) => {
    
        // post data
        const data = await axiosClientAuth.post('/register', {
            email,
            password 
        })

        //bring the popup out
        dispatch(togglePopup())

        // if(data.user){
            
        //     //Check for verification
        
        // }
    }

  return (
    <form 
    className="mt-10 container min-h-[360px]"
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

        <Input 
            label='confirm_password'
            type='confirm_password'
            placeholder="Re-Enter your password"
        />   
        
        {/* <p 
            className='text-slate-600 pb-2 text-sm text-end'
            onClick={triggerPopup}
        >Forgot Password?</p> */}

        <Button btn_text = "Sign In"/>

    </form>
  )
}

export default Register