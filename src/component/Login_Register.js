import { useState } from "react"
import { FaGoogle , FaGithub , FaApple , FaFacebook } from "react-icons/fa"

const Login_Register = () => {
    const [inputs , setInputs] = useState({})

    const handleChange = (event) => {
        const { target : { name , value } } = event
        // setInputs(values => ({...values , [name]:value})) //A function that creates a object and assign keys and value. ['key'] is a way to create dynamic keys
        setInputs({ [name] : value })
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(inputs)
        alert(inputs)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="login_form">
                <h2>Login</h2>    
                <h3>Welcome Back !</h3>
                <div className="form_control">
                    <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} placeholder="Username"/>
                </div>
                    
                <div className="form_control">
                    <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Password"/>
                </div>
                
                <p className="forget_password">Forgot Password?</p>

                <div className="form_control">
                    <input type="submit" value={"Sign In"} className="btn"/>
                </div>

                <p className="line_break">or continue with</p>
                
                <div className="form_control flex">
                    <div className="sign-in-options">
                        {<FaGoogle/>}
                    </div>  

                    <div className="sign-in-options">
                        {<FaGithub/>}
                    </div>  

                    <div className="sign-in-options">
                        {<FaApple/>}
                    </div>  

                    <div className="sign-in-options">
                        {<FaFacebook/>}
                    </div>  

                </div>
                <p className="register-link">Not a member? <span>Register Now</span></p>
            </form>
        </>
    )
}

export default Login_Register