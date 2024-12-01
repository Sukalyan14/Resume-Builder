import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from '../feature/customPopupSlice'
import { useState , useEffect } from "react";
import { CustomPopupContainer } from './index'
import { useFormContext } from "react-hook-form";
import { axiosClientAuth } from "../constant/axios-client";
import { Loader } from './index'
import conf from "../config/config";

function CustomPopup() {

    const delay = conf.countDown.COUNTDOWN_INTERVAL
    const countStart = conf.countDown.COUNTDOWN_START

    const [timer , setTImer] = useState(countStart)
    const [enableReSend , setEnableReSend] = useState(false)

    const dispatch = useDispatch()
    // const popupToggleStatus = useSelector((state) => state.custom_popup.popupToggleStatus)
    const { popupToggleStatus , message , verified } = useSelector((state) => state.custom_popup)

    const { getValues } = useFormContext()
    
    useEffect(() => {

        // start time only if the popup is visible
        if(popupToggleStatus){
        
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
        
    }, [timer , popupToggleStatus]);

    const resendMailClick = async (e) => {
        e.preventDefault()
        setEnableReSend(false)
        setTImer(countStart)

        const email = getValues('email')

        const response = await axiosClientAuth.post('/register', {
            email,
        })
        
    }

  return (
    <CustomPopupContainer popUpStatus={popupToggleStatus} enableReSend={enableReSend} showMessage={!message ? true : false}>
        {!message ? <Loader className="loader"/> : 
            <>
                <h4 >Verify Your Email</h4>
                <div className="cross"> 
                    <RxCross2 className="cross" 
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(togglePopup())
                        }}
                    />
                </div>
                <p className="message">{message}</p>
                {verified && <button 
                    className='resend-mail'
                    disabled={!enableReSend} 
                    onClick={enableReSend ? resendMailClick : () => {}}
                >Resend Mail</button>}
                {verified && <p className="timer">{timer}</p>}
            </>
        } 
    </CustomPopupContainer>
  )
}

export default CustomPopup
{/* <h4 >Verify Your Email</h4>
        <div className="cross"> 
            <RxCross2 className="cross" 
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(togglePopup())
                }}
            />
        </div>
        <p className="message">A verification link has been sent to your email id, Please verify</p>
        <button 
            className='resend-mail'
            disabled={!enableReSend} 
            onClick={enableReSend ? resendMailClick : () => {}}
        >Resend Mail</button>
        <p className="timer">{timer}</p>   */}