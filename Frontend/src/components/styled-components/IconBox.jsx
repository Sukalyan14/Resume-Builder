import { styled } from "styled-components"

//Styled Components
const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    background-color: ${(props) => {
        if(props.$github) return '#000'
        
        if(props.$facebook) return '#1977F3'
        
        return 'linear-gradient(145deg, #e6e6e6, #ffffff)'
        
    }};
    color: ${props => props.$github || props.$facebook ? '#fff' : null};
    box-shadow:  1px 1px 3px var(--box-shadow),
            -1px -1px 3px var(--box-shadow);
    &:hover {
        transform: scale(0.9);
        cursor: pointer;
    }
`
export default IconBox