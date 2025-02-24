import React from 'react'
import { IconBox, StyledLine } from '../index'
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { switchForm } from '../../feature/formSwitchSlice'
import { useFormContext } from 'react-hook-form'

function BottomContainer({ text }) {

    const dispatch = useDispatch()
    
    const { reset } = useFormContext()

    const triggerSwitch = (e) => {
        e.preventDefault()
        reset()
        dispatch(switchForm())    
    }
    
  return (
    <div className='w-full'>
        <StyledLine/>
        <div className='grid grid-cols-4 gap-4'>
            
            <IconBox>
                <FcGoogle/>
            </IconBox>

            <IconBox $github>
                <FaGithub/>
            </IconBox>

            <IconBox>
                <FaApple />
            </IconBox>

            <IconBox $facebook>
                <FaFacebookF/>
            </IconBox>
        </div>
        
        <p className='text-center text-sm tracking-wide mt-4'>{text[0]} <span className='text-button-color hover:cursor-pointer' onClick={triggerSwitch}>{text[1]}</span></p>

    </div>
  )
}

export default BottomContainer