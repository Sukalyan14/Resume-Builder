import axios from "axios"
import { useEffect, useState } from "react"
const axios_client = axios.create({
    baseURL:"http://localhost:3000"
})

export const useGetRequest = url => {

    const [data , setData] = useState()
    const [error , setError] = useState()

    useEffect(() => {
        // setState([null , true])
        axios_client.get(`${url}`)
        .then(res => setData(res.data))
        .catch(err => setError(err))   
    } , [url])

    if (error){
        return error.message
    }
    
    return data
}

export const usePostRequest = url => {
    
    const [state , setState] = useState()

    useEffect(() => {
        
    }, [url])
}