import { styled } from "styled-components"
import Bg  from '../assets/pngegg.png'
import LoginFormWrapper from "./LoginFormWrapper"

const Container = styled.div`
    width: 1200px;
    height: 800px;
    margin: 0;
    padding: 0;
    border-radius: 16px;
    /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: grid;
    grid-template-columns: 1fr auto;
`

const Wrapper = () => {
    return (
        <Container>
            <LoginFormWrapper/>
            <div className="img-container">
                <img src={Bg} alt="logo" />
            </div>
        </Container>
        // <div className="container">
        //     <LoginFormWrapper/>
        // </div>
    )
}

export default Wrapper