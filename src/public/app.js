import React, { createContext, useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
import Wrapper from "./component/Wrapper";
import axios from "axios";
import { useGetRequest } from "./utils/httpUtils";

const axios_client = axios.create({
    baseURL: "http://localhost:3000" 
});


const AppLayout = () => {

    const [data , setData] = useState("")

    // const x = useGetRequest('/message')
    
    // console.log(x);
    // if (!x){
    //     console.log(x);
    // } else {
    //     console.log(x);
    // }

    useEffect(() => {
        axios_client.post('/post' , {
            title: "Hello World",
            body:"Hello There"
        })
        .then(respone => console.log(respone))
    } , [])
    return (
        <div>
            {/* <h1>{data}</h1> */}
            <Wrapper/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)