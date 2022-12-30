import React, { createContext, useEffect, useState } from "react";
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
  dateOfBirthAuthor: Date;
  numOfPages: number;
  yearOfBublishing: number;
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
  records: [],
  start: 0,
  limit: 0,
  totalRecords: 0,
  error: "",
  isLoading: true,
  selectedAuthor: "Any Author",
  selectedBooks: [],
  mutatedBooksCount: 0, //edited, deleted, added
  isPreviewVisible: false,
  bookPreviewData: {
    id: 0,
    isbn: 0,
    title: "",
    nameOfAuthor: "",
    dateOfBirthAuthor: new Date(),
    numOfPages: 0,
    yearOfBublishing: 0,
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

  useEffect(() => {
    fetch(`https://book-store.mvsoft.co.rs/books`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((d) => {
        setBooks((prev) => ({
          ...prev,
          ...d,
          selectedBooks: d.records,
        }));
      })
      .catch((error) => {
        setBooks((prev) => ({
          ...prev,
          error: error.message,
        }));
      })
      .finally(() => {
        setBooks((prev) => ({
          ...prev,
          isLoading: false,
        }));
      });
  }, [books.mutatedBooksCount]);

  return (
    <Context.Provider value={[books, setBooks]}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
