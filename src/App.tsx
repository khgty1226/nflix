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
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    position: absolute;
    top: 100px;
`;

const boxVarients = {
    initial : (back:Boolean) => ({
        opacity: 0,
        scale: 0,
        x: back ? -500 : 500
    }),
    animate: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            duration: 0.3
        }
    },
    exit: (back:Boolean) => ({
        opacity: 0,
        scale: 0,
        x: back ? 500 : -500,
        transition: {
            duration: 0.3
        }
    })
}

function App() {
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);

    const prev = () => {
        setBack(true);
        setVisible((prev) => prev === 1 ? 1 : prev - 1)
    };
    const next = () => {
        setBack(false);
        setVisible((prev) => prev === 10 ? 10 : prev + 1)
    };
    return (
        <Wrapper>
            <AnimatePresence custom={back} mode="wait">
                <Box key={visible}
                     custom={back}
                     variants={boxVarients}
                     initial="initial"
                     animate="animate"
                     exit="exit">
                    {visible}
                </Box>
            </AnimatePresence>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
        </Wrapper>
    );
}

export default App;