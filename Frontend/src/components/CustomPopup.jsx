import { io } from "socket.io-client";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup , updateStatus_Message } from '../feature/customPopupSlice'
import { useState , useEffect } from "react";
import { CustomPopupContainer } from './index'
import { useFormContext } from "react-hook-form";
import { axiosClientAuth } from "../constant/axios-client";
import { Loader } from './index'
import conf from "../config/config";

function CustomPopup() {

    const delay = conf.countDown.COUNTDOWN_INTERVAL
    const countStart = conf.countDown.COUNTDOWN_START

    const [timer , setTimer] = useState(countStart)
    const [enableReSend , setEnableReSend] = useState(false)

    const dispatch = useDispatch()
    // const popupToggleStatus = useSelector((state) => state.custom_popup.popupToggleStatus)
    const { popupToggleStatus , message , verified } = useSelector((state) => state.custom_popup)

    const { getValues , reset } = useFormContext()

    useEffect(() => {
        if(popupToggleStatus){
            
            const url = conf.server.SERVER_URL + conf.server.SERVER_PORT
            const socket = io(url)
    
            socket.on('email-verified' , (data) => {
                // console.log("verfication received" , data)
                dispatch(updateStatus_Message(data))
            })
        }
    }, []);

    useEffect(() => {
        // start time only if the popup is visible and have received a message
        if(popupToggleStatus && message){
        
            const countDown = setInterval(() => {
                setTimer((prevTimer) => {
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
        
    }, [timer , popupToggleStatus , message]);

    const resendMailClick = async (e) => {
        e.preventDefault()
        setEnableReSend(false)
        setTImer(countStart)

        const email = getValues('email')
        const password = getValues('password')
        const confirm_password = getValues('confirm_password')

        const response = await axiosClientAuth.post('/register', {
            email , password ,
            confirm_password
        })

        if(response.data){
            dispatch(updateStatus_Message(response.data))

            if(response.data.verified) setTimeout(() => {
                dispatch(togglePopup())
                reset()
            } , delay*2.5)   
        }
        
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
                            dispatch(updateStatus_Message({
                                message:null
                            }))
                        }}
                    />
                </div>
                <p className="message">{message}</p>
                {!verified && <button 
                    className='resend-mail'
                    disabled={!enableReSend} 
                    onClick={enableReSend ? resendMailClick : () => {}}
                >Resend Mail</button>}
                {!verified && <p className="timer">{timer}</p>}
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