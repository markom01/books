import { DialogContentText, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { BookTypes, DataTypes } from "./App";

interface EnhancedDialogProps {
  bookPreviewData: BookTypes;
  setBooks: React.Dispatch<React.SetStateAction<DataTypes>>;
  children: React.ReactNode;
  tooltipTitle: string;
}

export default function EnhancedDialog({
  bookPreviewData,
  setBooks,
  children,
  tooltipTitle,
}: EnhancedDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState<number>(0);

  const handleClickOpen = () => {
    setOpen(true);
    setValue(bookPreviewData.quantity);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMutateBooks = () => {
    setBooks((prev) => ({
      ...prev,
      //change the quantity of the book in the selectedBooks array
      selectedBooks: prev.selectedBooks.map((book) =>
        book.id === bookPreviewData.id ? { ...book, quantity: +value } : book
      ),
      mutatedBooksCount: prev.mutatedBooksCount + 1,
      isPreviewVisible: false,
    }));
    // localStorage.setItem(
    //   "selectedBooks",
    //   JSON.stringify(books.selectedBooks)
    // );
    alert(`Book ${bookPreviewData.title} quantity count is now ${value}.`);
  };
  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton sx={{ color: "white" }} onClick={handleClickOpen}>
          {children}
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ sm: { minWidth: 300 } }}>Edit Quantity</DialogTitle>
        <DialogContent>
          <DialogContentText mb={3}>
            Book Title: {bookPreviewData.title}
          </DialogContentText>
          <TextField
            autoFocus
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setValue(+e.target.value);
            }}
            value={value}
            sx={{ width: "100px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span data-testid="cancel-btn">Cancel</span>
          </Button>
          <Button
            onClick={() => {
              handleClose();
              const body = JSON.stringify({
                ...bookPreviewData,
                //coverPhoto is title of the book with spaces replaced with - and all letters in lowercase
                coverPhoto: `images/${bookPreviewData.title
                  .replace(/\s/g, "-")
                  .toLowerCase()}.jpg`,
                quantity: +value,
              });
              handleMutateBooks();
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
