import React, { useState } from "react";
import { keyframes, styled } from "styled-components";
import Login from "./Login";
import '../style.css'
import Register from "./Register";

const Backdrop_animation = keyframes`
    0%{
        width: 300%;
        height: 650px;
        z-index: -21;
    }
    25%{
        width: 300%;
        z-index: 10;
    }
    50%{
        width: 300%;
        height: 1950px;
        z-index: 10;
    }
    75%{
        width: 300%;
        z-index: 10;
    }
    100%{
        width: 300%;
        height: 650px;
        z-index: -21;
    }
`

const FormWrapper = styled.div`
    width: 350px;
    height: 770px;   
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background-color: rgba( 234, 236, 238 , 0.7);
    border-radius: 20px;
    box-shadow: 0 2px 15px rgba(15, 15, 15, 0.2);
    backdrop-filter: blur(1.9px);
    -webkit-backdrop-filter: blur(1.9px);
    /* border: 2px solid rgba(255, 255, 255 , 0.8); */
    overflow: hidden;
`

const TopContainer = styled.div`
    position: relative;
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 0.8em;
    padding-top: 3.8em;
    z-index: 1;

    &::after{
        content: "";
        width: 300%;
        height: 650px;
        position: absolute;
        top: -500px;
        left: -210px;
        transform: rotate(-50deg);
        animation: ${' '} 2s ease;
        border-radius: 50%;
        /* background-color: #FAD961; */
        /* background-color: 'linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)'; */
        background-image: var(--top-container);
        animation: ${props => (props.$animation_trigger ? Backdrop_animation : ' ')} 1.55s ease;
        z-index: -21;
        transition: all 0.7s;
        -webkit-transition:height 0.7s;
        -moz-transition:height 0.7s;
        -o-transition:height 0.7s;
        -ms-transition:height 0.7s;
    }
`

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10;
    /* background-color: ${props => (props.textbg === 'red' ? 'blue' : 'red')}; */
`
const LoginFormWrapper = () => {

    const [animation_toggle , setAnimation_toggle] = useState(false)
    const [form , setForm] = useState('login')

    const toggle = () => {
        setAnimation_toggle(true)
        setTimeout(() => {
            setAnimation_toggle(false)
        }, 1550)
    }

    const toggleForm = (formName) => {
        toggle()
        setTimeout(()=>{
            setForm(formName)
        },750)
    }

    return(
        <FormWrapper>
            <TopContainer $animation_trigger = {animation_toggle}>
                <HeaderContainer>
                    {form === 'login' ? (
                        <>
                            <h2>Welcome</h2>
                            <h2>Back</h2>
                            <h5>Please Sign In To Continue!</h5>  
                        </>
                    ) : (
                        <>
                            <h2>Create</h2>
                            <h2>Account</h2>
                            <h5>Please Sign Up To Continue!</h5>
                        </>
                    )}
                </HeaderContainer>
            </TopContainer>
            { form === 'login' ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>}
        </FormWrapper>
    )
}

export default LoginFormWrapper