import styled from "styled-components";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import { useState} from "react";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    height: 200px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: #00a5ff;
    height: 100px;
    width: 100px;

    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
    const [clicked, setClicked] = useState(false);
    const click = () => setClicked((prev) => !prev);
    return (
        <Wrapper onClick={click}>
            <Grid>
                <Box layoutId="box"></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
            </Grid>
            <AnimatePresence>
                {clicked ? (
                    <Overlay variants={overlay} initial="hidden" animate="visible" exit="exit">
                        <Box layoutId="box" style={{width:400, height:400}}></Box>
                    </Overlay>
                ) : null}
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;