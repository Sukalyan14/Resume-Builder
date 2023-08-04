import React from "react";
import { keyframes, styled } from "styled-components";

const Backdrop_animation = keyframes`
    0%{
        width: 300%;
        height: 650px;
        z-index: -21;
    }
    50%{
        width: 300%;
        height: 1750px;
        z-index: 10;
    }
    100%{
        width: 300%;
        height: 650px;
        z-index: -21;
    }
`

const Wrapper = styled.div`
    width: 350px;
    height: 750px;   
    /* min-height: 550px; */
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background-color: #eaecee;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(15, 15, 15, 0.28);
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
        transform: rotate(-45deg);
        border-radius: 50%;
        background-color: var(--top-container-color);
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
    z-index: 22;
`
const LandingFormWrapper = () => {
    return(
        <Wrapper>
            <TopContainer>
                <HeaderContainer>
                    <h2>Welcome</h2>
                    <h2>Back</h2>
                    <h5>Please Sign In To Continue!</h5>
                </HeaderContainer>
            </TopContainer>
            <p onClick={()=> console.log(1)}>Clicks</p>
        </Wrapper>
    )
}

export default LandingFormWrapper