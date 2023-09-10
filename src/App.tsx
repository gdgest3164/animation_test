import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0 2px 3px darkcyan, 0 10px 20px darkcyan;
  margin: 50px;
`;

const Box2 = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0px 0px 30px darkgoldenrod;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Box3 = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0 2px 3px darkcyan, 0 10px 20px darkcyan;
  margin: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiniBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: cyan;
  border-radius: 30px;
`;

const Circle = styled(motion.div)`
  border-radius: 50px;
  background-color: darkcyan;
  place-self: center;
  height: 70px;
  width: 70px;
  box-shadow: 0 2px 3px darkcyan, 0 10px 20px darkcyan;
`;

const myVars = {
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const circleVars = {
  start: { opacity: 0, y: 20 },

  end: {
    opacity: 1,
    y: 0,
  },
};

const mouseEventsVars = {
  hover: { scale: 1.3, rotateZ: 90 },
  click: { borderRadius: "100px" },
};

function App() {
  const bigBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const potato = useTransform(x, [-200, 0, 200], [1.5, 1, 0.5]);

  useEffect(() => {
    potato.onChange(() => console.log(potato.get()));
  }, [x]);

  return (
    <>
      <Box variants={myVars} initial="start" animate="end">
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
      </Box>

      <Box2
        style={{ x, scale: potato }}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.1}
        dragSnapToOrigin
        variants={mouseEventsVars}
        whileHover="hover"
        whileDrag="drag"
        whileTap="click"
      />

      <Box3 ref={bigBoxRef}>
        <MiniBox drag dragElastic={0.1} dragConstraints={bigBoxRef} />
      </Box3>
    </>
  );
}

export default App;
