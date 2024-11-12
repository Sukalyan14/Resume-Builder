import {styled } from 'styled-components'

const Line = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
    position: relative;
    z-index: -1;
    text-align: center;

    &::after {
        content: "";
        width: 0;
        height: 0;
        border: 1px solid transparent;
        border-right: 70px solid var(--arrow-color);
        border-bottom: 1px solid transparent;
        border-top: 1px solid transparent;
        position: absolute;
        bottom: 40%;
        left: 10px;
    }
    &::before{
        content: "";
        width: 0;
        height: 0;
        border-left: 70px solid var(--arrow-color);
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        position: absolute;
        bottom: 40%;
        right: 10px;
    }
`
const StyledLine = ({text = "Or continue with"}) => (
    <Line>{text}</Line>
)

export default StyledLine