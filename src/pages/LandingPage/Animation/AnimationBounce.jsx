import * as React from "react";
import { motion } from "framer-motion";

//This code was insipired by the bounce example at:
//github.com/Darth-Knoppix/loading-animation/blob/master/src/BouncingBall.jsx
export const AnimationBounce = ({ childrens }) => {
  const transitionValues = {
    duration: 4,
    yoyo: Infinity,
    ease: "easeOut",
  };

  return (
    <motion.span
      transition={{
        y: transitionValues,
        width: transitionValues,
        height: transitionValues,
      }}
      animate={{
        y: ["2rem", "8rem", "10rem"],
        width: ["5rem", "5rem", "6rem"],
        height: ["5rem", "5rem", "4rem"],
      }}
    >
      {" "}
      {childrens}{" "}
    </motion.span>
  );
};
