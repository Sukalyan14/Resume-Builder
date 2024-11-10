import axios from "axios"
import { UPDATE_FORM , validateInput } from "./formUtils";

export const handleSubmit = (formState, dispatch, setShowError , route_key) => (event) =>{

    const axios_client = axios.create({
        baseURL:`${process.env.SERVER_URL}${process.env.SERVER_PORT}/auth/${route_key}`
    })

    event.preventDefault()

    let isFormValid = true
    let isSubmitClicked = true

    for (const name in formState){
        const item = formState[name]
        
        const { value } = item
        const { hasError , error } = validateInput( name , value , formState )

        if(hasError){
            isFormValid = false
            isSubmitClicked = false
        }

        if(name){
            console.log(isSubmitClicked);
            dispatch({
                type: UPDATE_FORM , 
                data:{ name , value , hasError , error , touched:true , isFormValid , isSubmitClicked }
            })
        }
    }

    if(!isFormValid) {
        setShowError(true)
    } else {
        // isSubmitClicked = true
        // dispatch({
        //     type: UPDATE_FORM , 
        //     data:{ isSubmitClicked }
        // })
        // console.log(formState);
        //submit form to backend
        // axios_client.post('/' , { 
        //     email:formState.email.value , 
        //     password : formState.password.value
        //  })
        // .then(res => {
        //     console.log(res.data);
        //     // console.log(activeCustomPopUp , setCustomPopup);
        //     return res.data
        // })
        // .catch(error => error.data)
    }

    setTimeout(() => {
        setShowError(false)
    } , 5000)
}