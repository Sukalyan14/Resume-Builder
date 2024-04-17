import React, { createContext, useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
import Wrapper from "./component/style component/Wrapper";
import CustomPopup from "./component/style component/CustomPopup";

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
            {/* <Wrapper/> */}
            <CustomPopup/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)