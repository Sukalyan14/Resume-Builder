import { useState } from "react"
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
            <div className="login_form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">
                        Username 
                        <input type="text" name="username" value={inputs.username || ""} onChange={handleChange}/> 
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={inputs.password || ""} onChange={handleChange}/>
                    </label>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

export default Login_Register