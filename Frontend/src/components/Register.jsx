import React from 'react'
import { Input , Button } from './index'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { togglePopup , updateStatus_Message } from '../feature/customPopupSlice'
import { axiosClientAuth } from '../constant/axios-client'
import conf from '../config/config'

function Register() {

    const delay = conf.countDown.COUNTDOWN_INTERVAL

    const dispatch = useDispatch()

    const { handleSubmit , reset } = useFormContext()

    const submit = async ({ email , password }) => {
        
        //bring the popup out
        dispatch(togglePopup())
        // post data
        const response = await axiosClientAuth.post('/register', {
            email,
            password 
        })

        if(response.data){
            dispatch(updateStatus_Message(response.data))

            if(response.data.verified) setTimeout(() => {
                dispatch(togglePopup())
                reset()
            } , delay*2)   
        }

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