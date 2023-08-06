import { useContext, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import '../style.css';
import IconBox from "./IconBox";
import Button from "./Button";

const Login = (props) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [inputs , setInputs] = useState({})

    const handleChange = (event) => {
        const { target : { name , value } } = event 
        setInputs(values => ({...values , [name]:value}))  //A function that creates a object and assign keys and value. ['key'] is a way to create dynamic keys
    }
 
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(inputs)
    }

    return (
        <>
            <form className="login-register-form" onSubmit={handleSubmit}>
                            
                <div className="form_control">
                    <input type="text" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="Email" required/>
                    <p className="error-message">Error Message</p>
                </div>
                    
                <div className="form_control">
                    <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Password" required/>
                    <p className="error-message">Error Message</p>
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