import axios from "axios"
import conf from '../config/config'

const serverUrl = conf.server.SERVER_URL
const serverPort = conf.server.SERVER_PORT

export const axiosClientAuth = axios.create({
  
    baseURL:`${serverUrl}${serverPort}/auth`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
      }
})