import { UpperCaseCheckRegex , SpecialCharacterCheckRegex , LowerCaseCheckRegex , NumberCheckRegex } from "../constant"

const usePasswordCheck = ({ password }) => {
    if(  password && password.length > 4 &&
         UpperCaseCheckRegex.test(password) && LowerCaseCheckRegex.test(password) &&
         SpecialCharacterCheckRegex.test(password) && NumberCheckRegex.test(password)) {
            console.log("p ok");
            return true
    }
    return false
}
// password.match(UpperCaseCheckRegex).length > 0 experimental piece
export default usePasswordCheck