import { EmailCheckRegex } from "../constant";

const useEmailCheck = ({ email }) => {
    if(email && EmailCheckRegex.test(email)){
        console.log('e ok');
        return [true , 'Not a Valid Email']
    }
    return false
}

export default useEmailCheck