import { styled } from "styled-components"
import '../../../public/style.css';

//Styled Components
const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 18px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
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
    box-shadow:  1px 1px 3px var(--box-shadow),
            -1px -1px 3px var(--box-shadow);
    &:hover {
        transform: scale(1.35);
        cursor: pointer;
    }
`
export default IconBox