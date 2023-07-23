import { styled } from "styled-components"
import { FaGithub } from "react-icons/fa"
import  '../style.css'
const Body = () => {
    const color = "#000";
    const GithubBox = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 9px 18px;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        z-index: 1;
        /* background: linear-gradient(145deg, #e6e6e6, #ffffff); */
        background: ${props => props.$github ? color : null};
        color: #fff;
        box-shadow:  1px 1px 5px #c7c7c7,
                -1px -1px 5px #c7c7c7;
    `

    return(
        // <div className="sign-in-options" $github>
        //     {<FaGithub/>}
        // </div>  
        <GithubBox $github>
            <FaGithub/>
        </GithubBox>
    )
}

export default Body