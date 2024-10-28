import { useReducer, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import '../../public/style.css';
import IconBox from "./style component/IconBox";
import Button from "./style component/Button";
import { UPDATE_FORM , onFocusOut, onInputChange } from "../utils/formUtils";
import { handleSubmit } from "../utils/handleSubmit"

const initialState = {
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    confirm_password: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false, 
}

function formReducer(state , action){
    switch (action.type){
        case UPDATE_FORM:
            const { name , value , hasError , error , touched , isFormValid } = action.data
            return {
                ...state , 
                [name] : {...state[name] , value , hasError , error , touched},
                isFormValid,
            }
        default:
            return state
    }
}

const Login = (props) => {

    const route_key = "login"
    const [formState , dispatch] = useReducer(formReducer , initialState)
    
    const [showError , setShowError] = useState(false)

    const onSubmit = handleSubmit(formState, dispatch, setShowError , route_key)
    
    
    return (
        <>
            <form className="login-register-form" onSubmit={onSubmit}>
                            
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
                            
                <p className="forget_password">Forgot Password?</p>

                <Button btn_text = "Sign In" />  {/* Can try a backdrop state based expression for button disappearenc */}

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
                        props.onFormSwitch('register')
                    }}>
                        Register Now
                    </span>
                </p>
            </form>

        </>
    )
}

export default Login