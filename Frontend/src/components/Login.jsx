import React from 'react'
import { Input , Button } from './index'
import { useFormContext } from 'react-hook-form'
import { axiosClientAuth } from '../constant/axios-client'
import { useDispatch } from 'react-redux'
import { togglePopup , updateStatus_Message } from '../feature/customPopupSlice'
import conf from '../config/config'

const Login = () => {
    
    const delay = conf.countDown.COUNTDOWN_INTERVAL

    const dispatch = useDispatch()

    const { handleSubmit } = useFormContext()

    const submit =  async ({ email , password }) => {
        dispatch(togglePopup())
        try {
            const response = await axiosClientAuth.post('/login' , {
                email , password
            })
            
            if(response.data && response.status == 200){
                dispatch(updateStatus_Message(response.data))
                sessionStorage.setItem("user" , response.data.user)
                setTimeout(() => {
                    dispatch(togglePopup())
                }, delay * 2.5);
            } else {
                
            } 
                
        } catch (error) {
            console.log(error.response.data.message , error.response.status)
            dispatch(updateStatus_Message({
                message:`${error.response.status} . ${error.response.data.message}`
            }))
        }
        
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