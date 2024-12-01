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
  // max-w-screen-xl
  return (
    <FormProvider {...methods}>
      <div className='w-screen h-[900px] flex relative justify-center items-center px-10'>
      {/* Main page content */}
        <div 
          className="w-[300px]
                    h-[750px]
                    max-w-[300px]
                    m-3 p-5
                    flex flex-col justify-evenly flex-shrink-0
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