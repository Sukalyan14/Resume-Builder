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
        width: 275%;
        /* height:650px; */
        height: 310%;
        /* height: ${(prop) => (prop.$formState ? '34rem' : '35rem')}; */
        /* height: calc(var(--curtain-height) * var(--curtain-multiplier)); */
        position: absolute;
        /* top: -500px;*/
        /* top: -250%; */
        top: ${(prop) => (prop.$formState ? '-225%' : '-210%')};
        left: -50%;
        transform: rotate(-50deg);
        border-radius: 50%;
        background: var(--top-container);
        z-index: -9;
        animation: ${(prop) => ( prop.$animationTrigger && Backdrop_Animation )} 1.5s ease-in-out;
    }
`
export default TopCurtain
