import React, { createContext, useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
import Wrapper from "./component/Wrapper";
import axios from "axios";

const AppLayout = () => {

    // const x = usePostRequest('/post')
    
    // console.log(x);
    // if (!x){
    //     console.log(x);
    // } else {
    //     console.log(x);
    // }

    return (
        <div>
            <Wrapper/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)