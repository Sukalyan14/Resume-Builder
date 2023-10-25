import { styled } from "styled-components";
import '../../public/style.css';

const ButtonStyled = styled.button`
    width: 100%;
    letter-spacing: 2px;
    display: inline-block;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    padding: 0.5em 2em;
    border: none;
    outline: none;
    /* background: var(--top-container); */
    border-radius: 100px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
    color: var(--button-color);
    text-decoration: none;
    transition: 0.3s ease all;
    margin-top: 6px;
    z-index: 0;

    &::before {
        content: '';
        transition: 0.5s all ease;
        position: absolute;
        top: 0;
        left: 50%;
        right: 50%;
        bottom: 0;
        opacity: 0;
        background: var(--top-container);
        border-radius: 100px;
        z-index: -2;
    }

    &:hover , &:focus{
        color: #fff;
        cursor: pointer;
        filter: brightness(1.15);
    }

    &:hover::before , &:focus::before{
        transition: 0.5s all ease;
        left: 0;
        right: 0;
        opacity: 1;
    }

    &:active{
        transform: scale(0.9);
    }
`
const Button = (props) => {
    
    return (
        <ButtonStyled>{props.btn_text}</ButtonStyled>
    )
}

export default Button