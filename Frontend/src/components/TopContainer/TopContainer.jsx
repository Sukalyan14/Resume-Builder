import { useState , useEffect } from 'react'
import { TopCurtain } from '../index'
import { useSelector } from 'react-redux'

function TopContainer({ text }) {
  
  const formState = useSelector((state) => state.register_login.formChange)
  const [ triggerAnimation , setTriggerAnimation ] = useState(false)

  useEffect(() => {
    setTriggerAnimation((state) => !state)
    setTimeout(() => {
      setTriggerAnimation((state) => !state)
    }, 1550);    
  } , [formState])

  return (
    <>
        <TopCurtain $animationTrigger = {triggerAnimation} $formState={formState}>
            <h2 className='text-3xl font-extrabold text-header-color tracking-wide'>{text[0]}</h2>
            <h2 className='text-3xl font-extrabold text-header-color tracking-wide'>{text[1]}</h2>
            <h5 className='text-base font-medium text-header-color mt-1'>{text[2]}</h5>
        </TopCurtain>
    </>
  )
}

export default TopContainer