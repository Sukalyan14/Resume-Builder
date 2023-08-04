import React, { createContext, useState } from "react";
import ReactDOM  from "react-dom/client";
import Login  from "./component/Login";
import Register from "./component/Register";
import { createBrowserRouter , Outlet , RouterProvider } from "react-router-dom";
import LandingFormWrapper from "./component/LandingFormWrapper";

export const BackDropState = createContext()

const AppLayout = () => {
    const [ form , setForm ] = useState("login")

    const [showBackDrop , setShowBackDrop] = useState(false)

    const toggleForm = (formName) => {
        // toggleBackDrop()        
        setTimeout(()=> {
            setForm(formName)
            console.log(formName + "switch");
        } , 1800)
    }

    // const toggleBackDrop = () => {
    //     // if(showBackDrop === false){
    //         setShowBackDrop(true)
    //         // console.log(showBackDrop + "log");
    //         setTimeout(()=> {
    //             setShowBackDrop(false)
    //         } , 2100)
    //     // }
    // }

    // console.log(form + "render");
    return (
        <>
            {/* { form === 'login' ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm}/>} */}
            <LandingFormWrapper/>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)