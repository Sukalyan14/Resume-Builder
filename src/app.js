import React from "react";
import ReactDOM  from "react-dom/client";
import Login_Register  from "./component/Login_Register";

const AppLayout = () => {
    return (
        <>
            <Login_Register/>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)