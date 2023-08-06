import React, { createContext, useState } from "react";
import ReactDOM  from "react-dom/client";
import Wrapper from "./component/Wrapper";

export const BackDropState = createContext()

const AppLayout = () => {

    return (
        <>
            <Wrapper/>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)