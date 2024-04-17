import axios from "axios"
import { UPDATE_FORM , validateInput } from "../utils/formUtils";

export const handleSubmit = (formState, dispatch, setShowError , route_key) => (event) =>{

    const axios_client = axios.create({
        baseURL:`${process.env.SERVER_URL}${process.env.SERVER_PORT}/auth/${route_key}`
    })

    event.preventDefault()

    let isFormValid = true

    for (const name in formState){
        const item = formState[name]
        const { value } = item
        const { hasError , error } = validateInput( name , value , formState )

        if(hasError){
            isFormValid = false
        }

        if(name){
            dispatch({
                type: UPDATE_FORM , 
                data:{ name , value , hasError , error , touched:true , isFormValid }
            })
        }
    }

    if(!isFormValid) {
        setShowError(true)
    } else {
        //submit form to backend
        axios_client.post('/' , { 
            email:formState.email.value , 
            password : formState.password.value
         })
        .then(res => console.log(res.data))
        .catch(error => console.log(error.data))
    }

    setTimeout(() => {
        setShowError(false)
    } , 5000)
}