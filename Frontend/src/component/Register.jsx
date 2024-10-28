import { useState , useReducer, useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import { UPDATE_FORM , onInputChange , onFocusOut } from "../utils/formUtils";
import '../../public/style.css';
import IconBox from "./style component/IconBox";
import Button from "./style component/Button";
import { handleSubmit } from "../utils/handleSubmit"
import { useCustomPopUp , useCustomPopUpUpdate } from "../useContext/CustomPopUpContext";

const initialState = {
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    confirm_password: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false, 
    isSubmitClicked:false   
}
// http://localhost:5000/auth/register
function formReducer(state , action){
    switch (action.type){
        case UPDATE_FORM:
            const { name , value , hasError , error , touched , isFormValid , isSubmitClicked } = action.data
            return {
                ...state , 
                [name] : {...state[name] , value , hasError , error , touched},
                isFormValid,
                isSubmitClicked
            }
        default:
            return state
    }
}

const Register = (props) => {
    
    const route_key = "register"
    const [formState , dispatch] = useReducer(formReducer , initialState)

    const [showError , setShowError] = useState(false)

    const onSubmit = handleSubmit(formState, dispatch, setShowError , route_key)
    
    // useEffect(() => {
    //     if(formState.isFormValid === true && formState.isSubmitClicked === true){
    //         useCustomPopUpUpdate()
    //     }
    // } , [formState.isFormValid , formState.isSubmitClicked])
    
    // console.log(formState);
    

    return (
        <>
            <form className="login-register-form" onSubmit={onSubmit} >
            
                <div className="form_control">
                    <input 
                        type="text" 
                        name="email" 
                        value={formState.email.value} 
                        onChange={e => {onInputChange("email" , e.target.value , dispatch , formState)}}  
                        onBlur={e => {onFocusOut("email" , e.target.value , dispatch , formState)}}
                        placeholder="Email"/>
    
                    <div className="error-message">{(formState.email && formState.email.touched && formState.email.hasError) ? formState.email.error : " "}</div>
                </div>
                    
                <div className="form_control">
                    <input 
                        type="password" 
                        name="password" 
                        value={formState.password.value} 
                        onChange={e => {onInputChange("password" , e.target.value , dispatch , formState)}} 
                        onBlur={e => {onFocusOut("password" , e.target.value , dispatch , formState)}}
                        placeholder="Password" required />
                    <div className="error-message">{(formState.password && formState.password.touched && formState.password.hasError) ? formState.password.error : " "}</div>
                </div>
                                    
                <div className="form_control">
                    <input 
                        type="password" 
                        name="confirm_password" 
                        value={formState.confirm_password.value} 
                        onChange={e => {onInputChange("confirm_password" , e.target.value , dispatch , formState)}} 
                        onBlur={e => {onFocusOut("confirm_password" , e.target.value , dispatch , formState)}}
                        placeholder="Confirm Password" required />
                    <div className="error-message">{(formState.confirm_password && formState.confirm_password.touched && formState.confirm_password.hasError) ? formState.confirm_password.error : " "}</div>
                </div>

                <Button btn_text = "Sign Up"/>

                <p className="line_break">Or continue with</p>
                
                <div className="form_control flex">

                    <IconBox>
                        <FcGoogle/>
                    </IconBox>

                    <IconBox $github>
                        <FaGithub/>
                    </IconBox>

                    <IconBox>
                        <FaApple/>
                    </IconBox>

                    <IconBox $facebook>
                        <FaFacebookF/>
                    </IconBox>

                </div>
                
                <p className="register-link">
                    Not a member? 
                    <span onClick = {() => {
                        props.onFormSwitch('login')
                    }}>
                        Log In
                    </span>
                </p>
            </form>

            

        </>
    )
}

export default Register