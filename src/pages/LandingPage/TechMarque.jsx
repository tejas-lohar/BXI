import HorizontalScrollingList from "./HorizontalScrollingList";
import { Box, Grid } from "@mui/material";

const TechMarque = (props) => {
  //   console.log("New data", props);
  return (
    <HorizontalScrollingList>
      {props?.Tech?.map((client, idx) => {
        // console.log(client, "---->");
        return (
          <Grid container>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
              <img
                key={idx}
                src={client}
                // style={{ height: "auto", width: "150%" }}
                style={{
                  width: "95px",
                  height: "auto",
                  objectFit: "cover",
                  margin: "30px",
                  overflow: "hidden",
                }}
              />
            </Grid>
          </Grid>
        );
      })}
    </HorizontalScrollingList>
  );
};

export default TechMarque;
