import Marquee from "react-fast-marquee";

const HorizontalScrollingList = ({ children, fromRight }) => {
  // console.log("fromRight",fromRight)
  return (
    <Marquee
      gradient={false}
      speed={60}
      direction={fromRight ? "left" : "right "}
      style={{ height: "100px", overflow: "hidden" }}
    >
      {children}
    </Marquee>
  );
};
export default HorizontalScrollingList;
