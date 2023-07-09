import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const AnimationOnImg = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
      });
    }
  }, [controls, inView]);
  return (
    <div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimationOnImg;
