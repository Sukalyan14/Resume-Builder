import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub , FaApple , FaFacebookF } from "react-icons/fa"
import '../style.css';
import IconBox from "./IconBox";
import Button from "./Button";
import { styled } from "styled-components";
import { motion } from "framer-motion";

// A trial with both styled-components and css
// const TopContainer = styled.div`
//     width: 100%;
//     height: 250px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     padding: 0 1.8em;
//     padding-bottom: 5em;
//     z-index: 0;
// `

export const BackDrop = styled(motion.div)`
    width: 200%;
    height: 550px;
    position: absolute;
    top: -360px;
    left: -150px;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    background-color: #FFD700;
    z-index: -20;
`
const BackDropVariant = {
    expanded:{
        width:"233%"        
    }
}
const Login = (props) => {
    const [inputs , setInputs] = useState({})

    const [isExpanded , setExpanded] = useState(false)

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
                        <h2>Welcome</h2>
                        <h2>Back</h2>
                        <h5>Please Sign In To Continue!</h5>
                    </div>
                </div>

                {/* <TopContainer> 
                    <BackDrop/>
                </TopContainer> */}

                <form onSubmit={handleSubmit}>
                                
                    <div className="form_control">
                        <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} placeholder="Username" required/>
                        <p className="error-message">Error Message</p>
                    </div>
                        
                    <div className="form_control">
                        <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Password" required/>
                        <p className="error-message">Error Message</p>
                    </div>
                                
                    <p className="forget_password">Forgot Password?</p>

                    <Button btn_text = "Sign In" />

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
                    
                    <p className="register-link">Not a member? <span onClick = {() => props.onFormSwitch('register')}>Register Now</span></p>
                </form>

            </div>

        </>
    )
}

export default Login