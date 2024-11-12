import React from 'react'
import { IconBox, StyledLine } from '../index'
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"

function BottomContainer() {
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

        <p>Not a member? <span>Register</span></p>

    </div>
  )
}

export default BottomContainer