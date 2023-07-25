import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import '../style.css';
import IconBox from "./IconBox";
import Button from "./Button";
import { BackDrop } from "./Login";

const Register = (props) => {
    const [inputs , setInputs] = useState({})

    const handleChange = (event) => {
        const { target : { name , value } } = event
        // setInputs(values => ({...values , [name]:value})) //A function that creates a object and assign keys and value. ['key'] is a way to create dynamic keys
        setInputs(values => ({...values , [name]:value}))
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(inputs)
    }

    return (
        <>
            <div className="login-register-form">
                <div className="top-container">
                    <div className="header-container">
                        <h2>Create</h2>
                        <h2>Account</h2>
                        <h5>Please Sign Up To Continue!</h5>
                    </div>
                </div>

                <form onSubmit={handleSubmit} >
                
                    <div className="form_control">
                        <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} placeholder="Username" required/>
                        <p className="error-message">Error Message</p>
                    </div>
                        
                    <div className="form_control">
                        <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Password" required/>
                        <p className="error-message">Error Message</p>
                    </div>
                                        
                    <div className="form_control">
                        <input type="password" name="confirm_password" value={inputs.confirm_password || ""} onChange={handleChange} placeholder="Confirm Password" required/>
                        <p className="error-message">Error Message</p>
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
                    
                    <p className="register-link">Already A Member ? <span onClick = {() => props.onFormSwitch('login')}>Login Now</span></p>
            </form>

            </div>

        </>
    )
}

export default Register