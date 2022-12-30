import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import MySelect from "./Select";

export default function Header() {
  return (
    <Grid2
      container
      sx={{
        bgcolor: "primary.main",
        pb: { xs: 1, sm: 0, md: 4 },
        pt: { xs: 1, sm: 0 },
        pl: 3,
        pr: 2,
        boxShadow: 2,
        height: { md: "205px" },
        alignItems: { xs: "center", md: "flex-end" },
        justifyContent: { xs: "space-between", sm: "none" },
      }}
      component="header"
    >
      <Grid2
        sx={{
          zIndex: 3,
          boxShadow: 3,
          borderRadius: "100%",
          width: "min-content",
          position: "relative",
          bottom: { xs: 0, sm: "-40px", md: "-70px" },
          backgroundColor: "white",
        }}
        xs="auto"
      >
        <Link to="/edit">
          <Tooltip title="Add New Book">
            <IconButton sx={{ p: { xs: 2.5, sm: 3.5 } }} size="large">
              <AddIcon
                sx={(theme) => ({
                  color: theme.status.success,
                })}
              />
            </IconButton>
          </Tooltip>
        </Link>
      </Grid2>
      <Grid2 display={{ xs: "none", sm: "flex" }} xs alignItems="center">
        <Typography
          variant="h4"
          component={"h1"}
          color="white"
          fontWeight="medium"
          sx={{ pl: 3, pb: { md: 1 } }}
          data-testid="header"
        >
          Books
        </Typography>
      </Grid2>
      <Grid2 xs={3.2} display="flex" alignItems="center">
        <MySelect />
      </Grid2>
    </Grid2>
  );
}
