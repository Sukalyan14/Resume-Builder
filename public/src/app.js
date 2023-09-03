import React, { createContext, useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
import Wrapper from "./component/Wrapper";

export const BackDropState = createContext()

const AppLayout = () => {

    const [data , setData] = useState("")

    useEffect(() => {
        console.log("effect");
        fetch("/message")
        .then((res) => res.json())
        .then((data) => { 
            setData(data.message)
            console.log(data);
        })
    } , [])

    return (
        <div>
            <h1>{data}</h1>
            {/* <Wrapper/> */}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)