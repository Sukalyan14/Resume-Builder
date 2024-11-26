import { keyframes, styled } from "styled-components"

const Popup_AnimationDown = keyframes`
    0%{

        top: -120%;
        opacity: 0;
    }
    100%{
        top: 0%;
        opacity: 1;
    }
`
const Popup_AnimationUp = keyframes`
  0% {
    top: 0%;
    opacity: 1;
  }
  100% {
    top: -120%;
    opacity: 0;
  }
`

const CustomBackGround = styled.div`
    width: 96vw;
    height: 100%;
    margin: 10px;
    background: var(--custom-background);
    border-radius: 16px;
    box-shadow: 0 4px 30px var(--custom-background-shadow);
    backdrop-filter: blur(2.7px);
    -webkit-backdrop-filter: blur(2.7px);
    overflow: hidden;
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    position: absolute;
    top: -120%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    place-items: center;
    animation: ${ (props) => props.$appear ? Popup_AnimationDown : Popup_AnimationUp } 1s forwards;
`
const CustomPopupWrapper = styled.div`
    width: 300px;
    height: min-content;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 0.1fr;
    grid-template-rows: 0.2fr 1fr 0.5fr;
    gap: 10px;
    padding: 18px;
    border-radius: 10px;
    background-color: var(--body-bg);
    
    box-shadow:  1px 1px 3px var(--box-shadow),
            -1px -1px 3px var(--box-shadow);
    h4{
        /* grid-area: header; */
        grid-column: 1/3;
        font-weight: 500;
        font-style: italic;
        margin-top: 10px;
        margin-left: 20px;
        font-size: 18px;
        height: 100%;
    }
    p{
        font-size: 14px;
        line-height: 1.4;
    }
    .message{
        display: flex;
        align-items: center;
        grid-column: 1/4;
    }
    .cross{
        /* grid-area: cross; */
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        height: min-content;
    }
    .resend-mail{
        grid-row:3/4;
        grid-column: 2/4;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        color: ${(props) => (props.$ready ? 'var(--error-color)' : 'var(--spare-blue)')};
    }
    
    .timer{
        grid-row: 3/4;
        grid-column: 1/2;
        margin-right: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }
    .cross:hover,
    .resend-mail:hover:not([disabled]){
        cursor: pointer;
        transition: all 0.5s ease;
        transform: scale(0.95);
    }
    .resend-mail:hover:disabled{
        cursor: not-allowed;
    }
`

const CustomPopupContainer = ({children , popUpStatus , enableReSend}) => {

    return (
        <CustomBackGround $appear={popUpStatus}>
            <CustomPopupWrapper $ready={!enableReSend}>
                {children}
            </CustomPopupWrapper>
        </CustomBackGround>
    )
}

export default CustomPopupContainer
 