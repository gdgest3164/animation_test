import { motion, useMotionValue, useScroll, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";

const Wrapper = styled(motion.div)`
  height: 150vh;
  width: 100vw;
  display: grid;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0 2px 3px gray, 0 10px 20px gray;
  margin: 50px;
  margin: 0 auto;
`;

const Box2 = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0px 0px 30px white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Box3 = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0 2px 3px cyan, 0 10px 20px cyan;
  margin: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
`;

const MiniBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: cyan;
  border-radius: 30px;
`;

const Circle = styled(motion.div)`
  border-radius: 50px;
  background-color: transparent;
  place-self: center;
  height: 70px;
  width: 70px;
  box-shadow: 10px 10px 30px gray;
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
  click: { borderRadius: "30px" },
};

function App() {
  const bigBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const potato = useTransform(x, [-200, 200], [-360, 360]);
  const gradient = useTransform(x, [-200, 200], ["linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))", "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))"]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  // useEffect(() => {
  //   // potato.onChange(() => console.log(potato.get()));
  //   scrollY.onChange(() => console.log(scrollYProgress.get()));
  // }, [x]);

  return (
    <Wrapper style={{ background: gradient }}>
      <Box3 ref={bigBoxRef}>
        <MiniBox drag dragElastic={0.1} dragConstraints={bigBoxRef} />
      </Box3>

      <Box variants={myVars} style={{ scale: scale }} initial="start" animate="end">
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
      </Box>

      <Box2
        style={{ x, rotateZ: potato }}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.1}
        dragSnapToOrigin
        variants={mouseEventsVars}
        whileHover="hover"
        whileDrag="drag"
        whileTap="click"
      />
    </Wrapper>
  );
}

export default App;
