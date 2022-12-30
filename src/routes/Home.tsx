import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
import { Context } from "../components/App";
import Header from "../components/Header";
import Preview from "../components/Preview";
import MyTable from "../components/Table";

export default function Home() {
  const [{ isPreviewVisible, isLoading }] = useContext(Context);
  document.title = "Home Page";
  return (
    <Grid2
      sx={{
        cursor: isLoading ? "progress" : "default",
        width: "100vw",
        height: "100vh",
      }}
      width={"100%"}
      height={"100%"}
      container
    >
      <Grid2
        component={"main"}
        xs={12}
        md
        sx={{
          "> *": {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          boxShadow: 2,
          height: { xs: isPreviewVisible ? "60%" : "100%", md: "100%" },
        }}
      >
        <Header />
        <MyTable />
      </Grid2>
      {isPreviewVisible && (
        <Grid2
          xs={12}
          md={4.5}
          lg={3.6}
          component={"aside"}
          position={"relative"}
          sx={{ height: { xs: "40%", md: "100%" } }}
        >
          <Preview />
        </Grid2>
      )}
    </Grid2>
  );
}
