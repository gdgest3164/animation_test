import { AnimatePresence, motion, useMotionValue, useScroll, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { start } from "repl";
import { styled } from "styled-components";

const Wrapper = styled(motion.div)`
  height: 200vh;
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

const SlideBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 28px;
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
`;

const Box4 = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 30px gray;
`;

const Box5 = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  height: 100px;
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

const Circle2 = styled(motion.div)`
  background-color: #00a5ff;
  border-radius: 50px;
  width: 50px;
  height: 50px;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90vw;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
  gap: 10px;
  margin: 0 auto;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
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

const brandVars = {
  start: {
    fill: "rgba(255,255,255,0)",
    pathLength: 0,
  },
  end: {
    fill: "rgba(255,255,255,1)",
    pathLength: 1,
    transition: {
      default: { duration: 5 },
      fill: { duration: 1, delay: 1 },
    },
  },
};

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  path {
    stroke: white;
    stroke-width: 2;
    fill: "transparent";
  }
`;

const showBoxVarian = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

const slideBox = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  }),
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((p) => !p);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((p) => (p >= 10 ? 1 : p + 1));
  };
  const prePlease = () => {
    setBack(true);
    setVisible((p) => (p <= 1 ? 10 : p - 1));
  };

  const [scaleClicked, setScaleClicked] = useState(false);
  const scaleToggle = () => setScaleClicked((p) => !p);

  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((p) => !p);

  const [id, setId] = useState<null | string>(null);

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
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          variants={brandVars}
          initial="start"
          animate="end"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg>

      <Box variants={myVars} style={{ scale: scale }} initial="start" animate="end">
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
        <Circle variants={circleVars}></Circle>
      </Box>

      <Box3 ref={bigBoxRef}>
        <MiniBox drag dragElastic={0.1} dragConstraints={bigBoxRef} />
      </Box3>

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

      <AnimatePresence>{showing ? <Box style={{ background: "white" }} variants={showBoxVarian} initial="initial" animate="visible" exit="leaving" /> : null}</AnimatePresence>
      <Button onClick={toggleShowing}>Click</Button>

      <div>
        <AnimatePresence mode="wait" custom={back}>
          <SlideBox custom={back} variants={slideBox} initial="entry" animate="center" exit="exit" key={visible}>
            {visible}
          </SlideBox>
        </AnimatePresence>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button style={{ float: "left" }} onClick={prePlease}>
            prev
          </Button>
          <Button style={{ float: "right" }} onClick={nextPlease}>
            next
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box4 onClick={toggleClicked}>{!clicked ? <Circle2 layoutId="circle" style={{ borderRadius: 50, rotate: 0 }} /> : null}</Box4>
        <Box4 onClick={toggleClicked}>{clicked ? <Circle2 layoutId="circle" style={{ borderRadius: 0, rotate: 180, scale: 2 }} /> : null}</Box4>
      </div>

      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box5 key={n} onClick={() => setId(n)} layoutId={n} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay onClick={() => setId(null)} initial={{ background: "rgba(0, 0, 0, 0.5)", opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box5 layoutId={id} style={{ width: "80vw", height: "20vh" }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
