import { styled } from "styled-components"
import { HiMiniXMark } from "react-icons/hi2";
import '../../../public/style.css';
import { useCustomPopUp } from "../../useContext/CustomPopUpContext"

const CustomBackGround = styled.div`
    width: 96vw;
    height: 96vh;
    margin: 10px;
    background: rgba(207, 207, 207, 0.08);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2.7px);
    -webkit-backdrop-filter: blur(2.7px);
    overflow: hidden;
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    position: absolute;
    top: ${(props) => !props.$appear ? '-100%' : '0%'};
    left: 0;
    display: grid;
    place-items: center;
`

const CustomPopupWrapper = styled.div`
    width: 300px;
    height: min-content;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 0.1fr;
    grid-template-rows: 0.2fr 1fr 0.5fr;
    /* grid-template-areas:'cross cross' 
    'header header'
    'message message '
    'timer resend '; */
    gap: 10px;
    padding: 18px;
    border-radius: 10px;
    /* transition: all 0.3s ease-in-out; */
    background-color: var(--body-bg);
    /* color: var(--box-shadow); */
    box-shadow:  1px 1px 3px var(--box-shadow),
            -1px -1px 3px var(--box-shadow);
    /* &:hover {
        transform: scale(1.35);
        cursor: pointer;
    } */
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
        color: var(--spare-blue);
        /* text-align: end; */
    }
    .resend-mail:hover{
        cursor: pointer;
        transition: all 0.5s ease;
        transform: scale(1.1);
    }
    .timer{
        grid-row: 3/4;
        grid-column: 1/2;
        margin-right: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }
`
const resendMailClick = () => {
    console.log(1);
}

const CustomPopup = () => {

    const { activeCustomPopUp } = useCustomPopUp()
    
    return (
        <CustomBackGround $appear={activeCustomPopUp}>
            <CustomPopupWrapper>
                <h4>Verify Your Email</h4>
                <div className="cross">
                    <HiMiniXMark />
                </div>
                <p className="message">An mail has been sent to your registered email , Please verify</p>
                <p className="resend-mail" onClick={resendMailClick}>Resend Mail</p>
                <p className="timer">20</p>
            </CustomPopupWrapper>
        </CustomBackGround>
    )
    
}

export default CustomPopup