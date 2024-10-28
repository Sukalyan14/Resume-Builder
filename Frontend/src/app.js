import React, { createContext, useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
import Wrapper from "./component/style component/Wrapper";
import CustomPopup from "./component/style component/CustomPopup";
import { CustomPopUpProvider } from "./useContext/CustomPopUpContext";

const AppLayout = () => {

        // const [activeCustomPopup , setCustomPopup] = useState(false)

    return (
        <>
            <CustomPopUpProvider>
                <Wrapper/>
                <CustomPopup/>
            </CustomPopUpProvider>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<AppLayout/>)