import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import React, { InputHTMLAttributes, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../components/App";

interface InputTypes {
  label: string;
  value?: number | string;
  fullWidth?: boolean;
  key?: string;
  width?: CSSProperties["width"];
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  readonly?: boolean;
  required?: boolean;
  regex?: RegExp;
  error?: boolean;
  props?: {
    accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
    capture?: InputHTMLAttributes<HTMLInputElement>["capture"];
    min?: InputHTMLAttributes<HTMLInputElement>["min"];
    max?: InputHTMLAttributes<HTMLInputElement>["max"];
  };
}

const regex = {
  //4 characters or more, no special characters, spaces allowed
  text: /^[a-zA-Z0-9 ]{4,}$/,
  //positive integer, min is 1, no special characters, no spaces, no letters
  number: /^[1-9]\d*$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
};

const fieldsData: InputTypes[] = [
  {
    label: "Title",
    key: "title",
    type: "text",
    value: "Title of the book",
    regex: regex.text,
    fullWidth: true,
    required: true,
    error: false,
  },
  {
    label: "Author",
    type: "text",
    key: "nameOfAuthor",
    value: "Name of the author",
    regex: regex.text,
    fullWidth: true,
    required: true,
    error: false,
  },
  {
    label: "Date of birth (Author)",
    type: "date",
    key: "dateOfBirthAuthor",
    width: "min-content",
    value: "2000-01-01",
    regex: regex.date,
    required: true,
    props: { min: "0001-01-01", max: new Date().toISOString().split("T")[0] },
    error: false,
  },
  {
    label: "Number of pages",
    type: "number",
    key: "numberOfPages",
    regex: regex.number,
    value: 756,
    width: 80,
    required: true,
    props: { min: 1 },
    error: false,
  },
  {
    label: "Year of publishing",
    type: "number",
    regex: regex.number,
    key: "yearOfPublishing",
    width: 80,
    required: true,
    value: 2004,
    props: { min: 1, max: new Date().getFullYear() },
    error: false,
  },
  {
    label: "Quantity",
    type: "number",
    key: "quantity",
    regex: regex.number,
    width: 80,
    required: true,
    value: 1,
    props: { min: 1, max: 1000 },
    error: false,
  },
  {
    label: "Cover photo",
    value: "Cover.jpg",
    fullWidth: true,
    readonly: true,
  },
];

export default function EditPage() {
  document.title = "Edit Page";
  const navigate = useNavigate();
  const [books, setBooks] = useContext(Context);
  const [formData, setFormData] = useState(fieldsData);

  const generateIsbn = () => {
    let isbn = Math.floor(Math.random() * 100);
    while (books.records.find((record) => record.isbn === isbn && isbn !== 0)) {
      isbn = Math.floor(Math.random() * 100);
    }
    return isbn;
  };

  const handleFormInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isbn = generateIsbn();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("coverPhoto", "");
    formData.set("isbn", isbn.toString());

    if (books.error !== "Fill in the form correctly") {
      fetch(`https://book-store.mvsoft.co.rs/books`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then((r) => r.json())
        .then(() => {
          setBooks((prev) => ({
            ...prev,
            mutatedBooksCount: prev.mutatedBooksCount + 1,
          }));
          alert("Book added.");
          navigate("/");
        });
    }
  };

  return (
    <Stack height="100vh" width="100vw" component={"main"}>
      <Stack
        spacing={{ xs: 1, sm: 6 }}
        direction={{ xs: "row", sm: "column" }}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
        sx={{
          bgcolor: "primary.main",
          pl: { xs: 1, sm: 4.5 },
          pt: { xs: 2, sm: 2.5 },
          pb: { xs: 2, sm: 4 },
          boxShadow: 2,
        }}
        component="header"
      >
        <Link to="/">
          <IconButton sx={{ color: "white" }}>
            <ArrowBackIcon sx={{ fontSize: { xs: 28, sm: 24 } }} />
          </IconButton>
        </Link>

        <Typography
          pl={{ sm: 9.5 }}
          display="flex"
          alignItems="center"
          variant="h4"
          component={"h1"}
          color="white"
          fontWeight="medium"
        >
          Add Book
        </Typography>
      </Stack>
      <form
        noValidate
        autoComplete="off"
        method="post"
        onSubmit={handleFormInput}
      >
        <Stack spacing={3.1} px={{ xs: 4, sm: 14.5 }} py={6} width={"100%"}>
          {formData.map((field, i) => (
            <Box
              display={"flex"}
              alignItems={"flex-end"}
              gap={2}
              key={field.label}
              sx={{ maxWidth: "610px" }}
            >
              <TextField
                name={field.key}
                error={field.error}
                label={field.label}
                required={field.required}
                InputProps={{
                  readOnly: field.readonly,
                }}
                value={field.value}
                variant="standard"
                type={field.type}
                fullWidth
                inputProps={{
                  ...field.props,
                }}
                onChange={(e) => {
                  setFormData((prev) => {
                    const newFormData = [...prev];
                    newFormData[i].value = e.target.value;
                    return newFormData;
                  });
                }}
                onBlur={(e) => {
                  if (field.regex) {
                    if (field.regex.test(e.target.value)) {
                      setFormData((prev) => {
                        const newFormData = [...prev];
                        newFormData[i].error = false;
                        return newFormData;
                      });
                      setBooks((prev) => ({
                        ...prev,
                        error: "",
                      }));
                    } else {
                      setFormData((prev) => {
                        const newFormData = [...prev];
                        newFormData[i].error = true;
                        return newFormData;
                      });
                      setBooks((prev) => ({
                        ...prev,
                        error: "Fill in the form correctly",
                      }));
                    }
                  }
                }}
                sx={{
                  ".MuiInputBase-root": {
                    width: field.width,
                  },
                  "label[data-shrink='true']": {
                    fontSize: "1.2rem",
                  },

                  ".MuiInputBase-input": {
                    pt: 1.75,
                    pb: 1.15,
                    fontSize: "1.1rem",
                  },
                }}
              />
              {field.label === "Cover photo" && (
                <div>
                  <Button
                    sx={{ width: { xs: "max-content", sm: "155px" }, py: 0.75 }}
                    variant="outlined"
                    disabled
                    component="label"
                  >
                    Upload Image
                    <input hidden accept="image/*" type="file" />
                  </Button>
                </div>
              )}
            </Box>
          ))}
          <Box>
            <Button
              type="submit"
              sx={{ px: 4.5, py: 0.75, mt: 0.5 }}
              variant="contained"
              disabled={books.error === "Fill in the form correctly"}
            >
              Save Book
            </Button>
          </Box>
          {books.error === "Fill in the form correctly" ? (
            <Alert severity={"error"} sx={{ width: "fit-content" }}>
              {books.error}
            </Alert>
          ) : (
            <Alert severity={"success"} sx={{ width: "fit-content" }}>
              Fields are filled correctly
            </Alert>
          )}
        </Stack>
      </form>
    </Stack>
  );
}
