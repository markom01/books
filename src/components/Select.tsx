import { FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { Context } from "./App";

export default function MySelect() {
  const [books, setBooks] = useContext(Context);

  const handleChange = (event: SelectChangeEvent) => {
    setBooks((prev) => ({
      ...prev,
      selectedAuthor: event.target.value,
      selectedBooks: prev.records.filter((book) => {
        if (event.target.value === "Any Author") return true;
        return book.nameOfAuthor === event.target.value;
      }),
    }));
  };
  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        alignItems: "flex-end",
        my: 1,
        mx: 0.5,
        ".MuiSvgIcon-root": {
          sm: { mr: 0.75 },
        },
        "& :is(*, label, .Mui-focused)": {
          color: "white",
        },
        "& :is(fieldset, .MuiOutlinedInput-root:hover fieldset) ": {
          borderColor: "white",
        },
      }}
    >
      <Select
        sx={{
          width: { xs: "200px", sm: "262px" },
          py: 0.25,
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "270px",
            },
          },
        }}
        value={books.selectedAuthor}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="Any Author">Any Author</MenuItem>
        {books.records
          //check for duplicates
          .filter(
            (book, i, books) =>
              books.findIndex((b) => b.nameOfAuthor === book.nameOfAuthor) === i
          )
          .map((book, i) => (
            <MenuItem key={book.nameOfAuthor + i} value={book.nameOfAuthor}>
              {book.nameOfAuthor}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
