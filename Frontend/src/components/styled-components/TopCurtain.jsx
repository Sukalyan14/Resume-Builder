import { keyframes, styled } from "styled-components";

const Backdrop_Animation = keyframes`
    0%{
        height: 340%;
        z-index: 10;
    }
    50%{
        height: 996%;
        z-index: 10;
    }
    85%{
        z-index: 10;
    }
    100%{
        height: 340%;
        z-index: -9;
    }
`

const TopCurtain = styled.div`
    height: 170px;
    z-index: 1;
    position: relative;
    padding: 2.5rem 2.5rem 0 2.5rem;

    &::after{
        content: "";
        width: 280%;
        /* height:650px; */
        height: 340%;
        position: absolute;
        /* top: -500px;
        left: -210px; */
        top: -260%;
        left: -60%;
        transform: rotate(-50deg);
        border-radius: 50%;
        background: var(--top-container);
        z-index: -9;
        animation: ${(prop) => ( prop.$animationTrigger ? Backdrop_Animation : null)} 1.5s ease-in-out;
    }
`
export default TopCurtain
