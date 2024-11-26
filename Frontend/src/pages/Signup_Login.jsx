import React from 'react'
import { BottomContainer, Login , Register , TopContainer , CustomPopup } from '../components/index'
import Bg from '../assets/pngegg.png'
import { useSelector } from 'react-redux'
import { useForm , FormProvider } from 'react-hook-form'

function Signup_Login() {

  const methods = useForm({
    defaultValues:{
      email:'',
      password:''
    },
    mode:"all",
    reValidateMode: 'onBlur',
  })
  
  const formState = useSelector((state) => state.register_login.formChange)

  return (
    <FormProvider {...methods}>
      <div className='max-w-screen-xl h-[850px] flex relative'>
      {/* Main page content */}
        <div 
          className="w-[350px]
                    h-[800px]
                    m-3 p-5
                    flex flex-col justify-evenly
                    bg-form-background 
                    shadow-lg 
                    backdrop-blur-xs
                    rounded-2xl 
                    overflow-hidden"
        >
            <TopContainer text={formState ? ["Create" , "An Account" , "Please Sign-Up to Contnue!"]  : ["Welcome" , "Back" , "Please Sign-In to Continue!"]}/>
            {formState ?  <Register /> : <Login />}
            <BottomContainer text={formState ? ["Already a member? " , "Login"]  : ["Not a member? " , "Register"] }/>          
        </div>
        
        <div className="h-full">
          <img 
            className='w-100 h-full object-cover'
            src={Bg} alt="logo" 
          />
        </div>

        {/*Popup*/}
        <CustomPopup/>

      </div>
    </FormProvider>
    
  )
}

export default Signup_Login