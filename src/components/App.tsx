import React, { createContext, useState } from "react";
import booksJSON from "../data/books.json";
import Home from "../routes/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { TableCellProps } from "@mui/material/TableCell";
import EditPage from "../routes/EditPage";
import ErrorPage from "../routes/errorPage";
import "../styles/App.scss";

interface HeaderDataTypes {
  align: TableCellProps["align"];
  label: "Title" | "Author" | "Year" | "Pages" | "Quantity";
}

export interface BookTypes {
  id: number;
  isbn: number;
  title: string;
  nameOfAuthor: string;
  dateOfBirthAuthor: string | Date;
  numberOfPages: number;
  yearOfPublishing: number;
  quantity: number;
  coverPhoto: string;
}

export interface DataTypes {
  records: BookTypes[];
  start: number;
  limit: number;
  totalRecords: number;
  error: string;
  isLoading: boolean;
  selectedAuthor: string;
  isPreviewVisible: boolean;
  selectedBooks: BookTypes[];
  mutatedBooksCount: number;
  bookPreviewData: BookTypes;
  headerData: HeaderDataTypes[];
}

type ContextType = [DataTypes, React.Dispatch<React.SetStateAction<DataTypes>>];

const initBooks: DataTypes = {
  records: booksJSON.records,
  start: 0,
  limit: 0,
  totalRecords: 0,
  error: "",
  isLoading: false,
  selectedAuthor: "Any Author",
  selectedBooks: booksJSON.records,
  mutatedBooksCount: 0, //edited, deleted, added
  isPreviewVisible: false,
  bookPreviewData: {
    id: 0,
    isbn: 0,
    title: "",
    nameOfAuthor: "",
    dateOfBirthAuthor: new Date(),
    numberOfPages: 0,
    yearOfPublishing: 0,
    quantity: 0,
    coverPhoto: "",
  },
  headerData: [
    { align: "left", label: "Title" },
    { align: "left", label: "Author" },
    { align: "left", label: "Year" },
    { align: "center", label: "Pages" },
    { align: "center", label: "Quantity" },
  ],
};

export const Context = createContext<ContextType>({} as ContextType);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit",
    element: <EditPage />,
  },
]);

function App() {
  const [books, setBooks] = useState<DataTypes>(initBooks);

  return (
    <Context.Provider value={[books, setBooks]}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
