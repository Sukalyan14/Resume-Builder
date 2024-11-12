import { keyframes, styled } from "styled-components";

const TopCurtain = styled.div`
    /* width: 100%; */
    height: 200px;
    /* background-color: #FAD961; */
    z-index: 1;
    position: relative;
    padding: 4rem 2.5rem 0 2.5rem;

    &::after{
        content: "";
        width: 300%;
        height: 650px;
        position: absolute;
        /* top: -500px;
        left: -210px; */
        top: -260%;
        left: -60%;
        transform: rotate(-50deg);
        border-radius: 50%;
        background: var(--top-container);
        z-index: -9;
    }
`
export default TopCurtain
