import { createContext , useContext , useState } from 'react'

const PopUpContext = createContext()
const UpdatePopUpContext = createContext()

export function useCustomPopUp() {
    return useContext(PopUpContext)
}

export function useCustomPopUpUpdate() {
    return useContext(UpdatePopUpContext)
}

export function CustomPopUpProvider({ children }){

    const [activeCustomPopup , setCustomPopup] = useState(false)

    function toggleCustomPopUp() {
        setCustomPopup(activeState => !activeState)
    }

    return (
        <PopUpContext.Provider value={ {activeCustomPopup , setCustomPopup} }>
            <UpdatePopUpContext.Provider value={toggleCustomPopUp}>
                {children}
            </UpdatePopUpContext.Provider>
        </PopUpContext.Provider>
    )
}