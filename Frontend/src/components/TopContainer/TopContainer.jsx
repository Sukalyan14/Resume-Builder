import React from 'react'
import { TopCurtain } from '../index'

function TopContainer() {
  return (
    <>
        <TopCurtain>
            <h2 className='text-3xl font-extrabold text-header-color tracking-wide'>Create</h2>
            <h2 className='text-3xl font-extrabold text-header-color tracking-wide'>Account</h2>
            <h5 className='text-lg font-medium text-header-color mt-1'>Please Sign Up To Continue!</h5>
        </TopCurtain>
    </>
  )
}

export default TopContainer