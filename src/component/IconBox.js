import { styled } from "styled-components"
//Styled Components
const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 18px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    z-index: 1;
    /* background: linear-gradient(145deg, #e6e6e6, #ffffff); */
    /* background-color: ${props => props.$github ? '#000' : 'linear-gradient(145deg, #e6e6e6, #ffffff)'}; */
    background-color: ${(props) => {
        if(props.$github){
            return '#000'
        } else if(props.$facebook){
            return '#1977F3'
        } else {
            return 'linear-gradient(145deg, #e6e6e6, #ffffff)'
        }
    }};
    color: ${props => props.$github || props.$facebook ? '#fff' : null};
    box-shadow:  1px 1px 5px #c7c7c7,
            -1px -1px 5px #c7c7c7;
    &:hover {
        transform: scale(0.9);
        cursor: pointer;
    }
`
export default IconBox