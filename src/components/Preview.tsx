import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
import { Context } from "./App";
import EnhancedDialog from "./Dialog";

export default function Preview() {
  const [{ bookPreviewData, headerData }, setBooks] = useContext(Context);

  const handleMutateBooks = () => {
    setBooks((prev) => ({
      ...prev,
      // delete the book from the selectedBooks array
      selectedBooks: prev.selectedBooks.filter(
        (book) => book.id !== bookPreviewData.id
      ),
      mutatedBooksCount: prev.mutatedBooksCount + 1,
      isPreviewVisible: false,
    }));
    alert(`Book ${bookPreviewData.title} deleted successfully.`);
  };

  return (
    <Stack height={"100%"}>
      <Stack
        component={"header"}
        direction={{ xs: "row-reverse", md: "column" }}
        sx={{
          bgcolor: "secondary.main",
          pl: { xs: 2, md: 4.5 },
          pr: { xs: 2, md: 1.25 },
          pt: { xs: 2, md: 2.25 },
          pb: { xs: 2, md: 4.5 },
          boxShadow: 2,
        }}
        justifyContent={{ xs: "space-between", md: "none" }}
        minHeight={{ md: "205px" }}
      >
        <Grid2
          container
          alignItems={"center"}
          justifyContent={"flex-end"}
          mb={{ md: 2 }}
          columnSpacing={1}
        >
          <Grid2>
            <EnhancedDialog
              bookPreviewData={bookPreviewData}
              setBooks={setBooks}
              tooltipTitle="Edit Book"
            >
              <EditIcon sx={{ fontSize: { sm: "30px" } }} />
            </EnhancedDialog>
          </Grid2>
          <Grid2>
            <Tooltip title="Delete Book">
              <IconButton
                sx={{ color: "white" }}
                onClick={() => {
                  handleMutateBooks();
                }}
              >
                <DeleteIcon sx={{ fontSize: { sm: "30px" } }} />
              </IconButton>
            </Tooltip>
          </Grid2>
        </Grid2>
        <Box display={"flex"} alignItems="center" gap={2}>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => {
                setBooks((prev) => ({
                  ...prev,
                  isPreviewVisible: false,
                }));
              }}
            >
              <Tooltip title="Close Preview">
                <CloseIcon />
              </Tooltip>
            </IconButton>
          </Box>
          <Stack
            sx={{
              "h2, h3": {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: { xs: "150px", sm: "none" },
              },
            }}
          >
            <Typography
              color="white"
              variant="subtitle1"
              fontWeight="medium"
              component={"h2"}
            >
              {bookPreviewData.title}
            </Typography>
            <Typography color="white" variant="subtitle1" component={"h3"}>
              {bookPreviewData.nameOfAuthor}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Stack
        direction={{ xs: "row", md: "column" }}
        height={"min-content"}
        overflow={{ xs: "scroll", md: "auto" }}
      >
        <Box
          overflow={{ xs: "auto", md: "scroll" }}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "#fff2e9",
            height: { xs: "100%", md: "385px" },
            width: { sm: "50%", md: "auto" },
            display: { xs: "none", sm: "block" },
          }}
        >
          <img
            onError={(e) => {
              e.currentTarget.src = "placeholder.svg";
            }}
            src={bookPreviewData.coverPhoto}
            alt={bookPreviewData.title}
            style={{
              marginInline: "auto",
              display: "block",
              width: "66.5%",
            }}
          />
        </Box>
        <Stack
          sx={{
            pl: 4.5,
            pr: 3,
            pt: 3,
            pb: 4.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            width: { xs: "100%", sm: "50%", md: "auto" },
            height: { xs: "100%", md: "auto" },
            overflow: "scroll",
          }}
          spacing={1.5}
          height={"280px"}
          component="article"
        >
          <Typography variant={"subtitle1"} color={"grey"} component={"h4"}>
            Info
          </Typography>

          <Stack
            spacing={1.75}
            component="dl"
            sx={{
              "dt, dd": {
                color: "grey",
              },

              dd: {
                ml: 0,
              },
              dt: {
                fontWeight: "bold",
              },
            }}
          >
            <Grid2 container>
              <Grid2 xs={3.75} component="dt">
                {headerData[0].label}
              </Grid2>
              <Grid2 xs component="dd">
                {bookPreviewData.title}
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2 xs={3.75} component="dt">
                {headerData[1].label}
              </Grid2>
              <Grid2 xs component="dd">
                {bookPreviewData.nameOfAuthor}
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2 xs={3.75} component="dt">
                {headerData[2].label}
              </Grid2>
              <Grid2 xs component="dd">
                {bookPreviewData.yearOfPublishing}
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2 xs={3.75} component="dt">
                {headerData[3].label}
              </Grid2>
              <Grid2 xs component="dd">
                {bookPreviewData.numberOfPages}
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2 xs={3.75} component="dt">
                {headerData[4].label}
              </Grid2>
              <Grid2 xs component="dd">
                {bookPreviewData.quantity}
              </Grid2>
            </Grid2>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
