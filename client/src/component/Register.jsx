import { useState , useReducer, useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import { UPDATE_FORM , onInputChange , onFocusOut , validateInput } from "../utils/formUtils";
import '../../public/style.css';
import IconBox from "./IconBox";
import Button from "./Button";
import axios from "axios";

const axios_client = axios.create({
    baseURL:"http://localhost:3000/auth/register"
})
console.log(1);
// console.log(process.env.MESSAGE);
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

const Register = (props) => {
    
    const [formState , dispatch] = useReducer(formReducer , {isFormValid:false})

    const [showError , setShowError] = useState(false)

    // useEffect(() => {
    //     console.log("In use effect");
    //     axios_client.get(`/message`)
    //     .then(res => console.log(res.data))
    // } , [])

    const handleSubmit = (event) =>{
        event.preventDefault()

        let isFormValid = true

        for (const name in formState){
            const item = formState[name]
            const { value } = item
            const { hasError , error } = validateInput( name , value , formState )

            if(hasError){
                isFormValid = false
            }

            if(name){
                dispatch({
                    type: UPDATE_FORM , 
                    data:{ name , value , hasError , error , touched:true , isFormValid }
                })
            }
        }

        if(!isFormValid) {
            setShowError(true)
        } else {
            //submit form to backend
            axios_client.post('/' , { 
                email:formState.email.value , 
                password : formState.password.value
             })
            .then(res => console.log(res.data))
            .catch(error => console.log(error.data))
        }

        setTimeout(() => {
            setShowError(false)
        } , 5000)
    }
    
    return (
        <>
            <form className="login-register-form" onSubmit={handleSubmit} >
            
                <div className="form_control">
                    <input 
                        type="text" 
                        name="email" 
                        value={formState.email ? formState.email.value : ""} 
                        onChange={e => {onInputChange("email" , e.target.value , dispatch , formState)}}  
                        onBlur={e => {onFocusOut("email" , e.target.value , dispatch , formState)}}
                        placeholder="Email"/>
    
                    <div className="error-message">{(formState.email && formState.email.touched && formState.email.hasError) ? formState.email.error : " "}</div>
                </div>
                    
                <div className="form_control">
                    <input 
                        type="password" 
                        name="password" 
                        value={formState.password ? formState.password.value : ""} 
                        onChange={e => {onInputChange("password" , e.target.value , dispatch , formState)}} 
                        onBlur={e => {onFocusOut("password" , e.target.value , dispatch , formState)}}
                        placeholder="Password" required />
                    <div className="error-message">{(formState.password && formState.password.touched && formState.password.hasError) ? formState.password.error : " "}</div>
                </div>
                                    
                <div className="form_control">
                    <input 
                        type="password" 
                        name="confirm_password" 
                        value={formState.confirm_password ? formState.confirm_password.value : ""} 
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