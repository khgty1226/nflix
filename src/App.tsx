import styled from "styled-components";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import { useState} from "react";

const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: #00a5ff;
    height: 100px;
    width: 100px;

    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
    const [clicked, setClicked] = useState(false);
    const click = () => setClicked((prev) => !prev);
    return (
        <Wrapper onClick={click}>
            <Box>
                {!clicked ? (
                    <Circle layoutId="circle" style={{ borderRadius: 50 }} />
                ) : null}
            </Box>
            <Box>
                {clicked ? (
                    <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} />
                ) : null}
            </Box>
        </Wrapper>
    );
}

export default App;