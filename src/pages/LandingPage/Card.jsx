import { Box } from "@mui/material";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function Card({ videoUrl }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });
  return (
    <animated.div
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Box
        sx={{
          width: "350px",
          height: "500px",
          filter: "drop-shadow(0px 8.7245px 17.449px rgba(0, 0, 0, 0.5))",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <video
          // controls
          src={videoUrl}
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
          style={{ objectFit: "cover" }}
        />
      </Box>
    </animated.div>
  );
}

export default Card;
