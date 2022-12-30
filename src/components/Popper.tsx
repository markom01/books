import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  ClickAwayListener,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";
import * as React from "react";
import { deleteData } from "../hooks/useFetch";
import { BookTypes, DataTypes } from "./App";

interface Props {
  bookPreviewData: BookTypes;
  setBooks: React.Dispatch<React.SetStateAction<DataTypes>>;
}

export default function EnhancedPopper({ bookPreviewData, setBooks }: Props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMutateBooks = () => {
    setBooks((prev) => ({
      ...prev,
      mutatedBooksCount: prev.mutatedBooksCount + 1,
      isPreviewVisible: false,
    }));
    alert(`Book ${bookPreviewData.title} deleted successfully.`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Tooltip title="Options">
          <IconButton aria-describedby={id} onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
      <Popper
        placement="bottom-end"
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{ display: "flex", gap: 1, flexDirection: "column", py: 1 }}
              elevation={1}
            >
              <Button
                color="error"
                sx={{ px: 5 }}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  deleteData({
                    id: bookPreviewData.id,
                    handleMutateBooks: handleMutateBooks,
                  });
                }}
              >
                Delete
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
