import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from '../feature/CustomPopupSlice'
import { useState , useEffect } from "react";
import { CustomPopupContainer } from './index'
import { useFormContext } from "react-hook-form";
import { axiosClientAuth } from "../constant/axios-client";
import conf from "../config/config";

function CustomPopup() {

    const delay = conf.countDown.COUNTDOWN_INTERVAL
    const countStart = conf.countDown.COUNTDOWN_START

    const [timer , setTImer] = useState(countStart)
    const [enableReSend , setEnableReSend] = useState(false)

    const dispatch = useDispatch()
    const popUpStatus = useSelector((state) => state.custom_popup.popupToggleStatus)

    const { getValues } = useFormContext()
    
    useEffect(() => {

        // start time only if the popup is visible
        if(popUpStatus){
        
            const countDown = setInterval(() => {
                setTImer((prevTimer) => {
                    // If the next value would be zero or less, stop at zero
                    if(prevTimer <= 1){
                        clearInterval(countDown)
                        return 0
                    } 
                    return prevTimer - 1 
                })
            }, delay);
            
            if(timer === 0) setEnableReSend(true)
            
            return () => clearInterval(countDown);
        }
        
    }, [timer , popUpStatus]);


    const resendMailClick = async (e) => {
        e.preventDefault()
        setEnableReSend(false)
        setTImer(countStart)

        const email = getValues('email')

        const data = await axiosClientAuth.post('/register', {
            email,
        })
        
    }

  return (
    <CustomPopupContainer popUpStatus={popUpStatus} enableReSend={enableReSend}>
        <h4 >Verify Your Email</h4>
        <div className="cross"> 
            <RxCross2 className="cross" 
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(togglePopup())
                }}
            />
        </div>
        <p className="message">An mail has been sent to your email id, Please verify</p>
        <button 
            className='resend-mail'
            disabled={!enableReSend} 
            onClick={enableReSend ? resendMailClick : () => {}}
        >Resend Mail</button>
        <p className="timer">{timer}</p>  
    </CustomPopupContainer>
  )
}

export default CustomPopup