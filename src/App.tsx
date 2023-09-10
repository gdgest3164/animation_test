import { motion } from "framer-motion";
import { styled } from "styled-components";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: green;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", bounce: 0.5, delay: 1 } },
};

function App() {
  return (
    <>
      <Box variants={myVars} initial="start" animate="end" />
    </>
  );
}

export default App;
