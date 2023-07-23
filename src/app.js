import React, { useState } from "react";
import ReactDOM  from "react-dom/client";
import Login  from "./component/Login";
import Register from "./component/Register";
import { createBrowserRouter , Outlet , RouterProvider } from "react-router-dom";

const AppLayout = () => {
    const [ form , setForm ] = useState("login")

    const toggleForm = (formName) => {
        console.log(formName);
        setForm(formName)
    }

    return (
        <>
            { form === 'login' ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm}/>}
            {/* <Body/> */}
            {/* <Login/> */}
            {/* <Register/> */}
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)