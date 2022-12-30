import {
  CircularProgress,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import { useContext, useState } from "react";
import { Context } from "./App";
import EnhancedPopper from "./Popper";

type Order = true | false | undefined;

export default function MyTable() {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);
  const [isTitleOrderAsc, setIsTitleOrderAsc] = useState<Order>(undefined);
  const [isPageNumOrderAsc, setIsPageNumOrderAsc] = useState<Order>(undefined);
  const [books, setBooks] = useContext(Context);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (books.isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Container>
    );
  if (books.error) return <p>error</p>;

  return (
    <Stack
      sx={{ height: { xs: "100%", md: "calc(100% - 205px)" } }}
      overflow={"scroll"}
    >
      <TableContainer
        sx={{
          height: "100%",
          "td:not(:nth-of-type(2)), th": {
            color: "grey.A700",
          },
          "th,td": {
            typography: { xs: "body2", sm: "body1" },
          },
          "th:nth-of-type(2)": {
            pl: 0,
          },
          "th, td:nth-of-type(2)": {
            fontWeight: "medium",
          },
          "th:nth-of-type(5) span": {
            ml: 3,
          },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table stickyHeader sx={{ position: "relative" }}>
          <TableHead
            sx={{
              th: {
                py: { md: 3.1 },
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}></TableCell>
              {books.headerData.map((headerField, i) => (
                <TableCell
                  align={headerField.align}
                  key={headerField.label + i}
                >
                  {headerField.label === "Title" ||
                  headerField.label === "Pages" ? (
                    <TableSortLabel
                      direction={
                        headerField.label === "Title"
                          ? isTitleOrderAsc
                            ? "asc"
                            : "desc"
                          : isPageNumOrderAsc
                          ? "asc"
                          : "desc"
                      }
                      onClick={() => {
                        if (headerField.label === "Title") {
                          setIsTitleOrderAsc((prev) => !prev);

                          setIsPageNumOrderAsc(undefined);
                        } else {
                          setIsPageNumOrderAsc((prev) => !prev);
                          setIsTitleOrderAsc(undefined);
                        }
                      }}
                    >
                      {headerField.label}
                    </TableSortLabel>
                  ) : (
                    headerField.label
                  )}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td, th": {
                borderBottom: "none",
                py: 2,
              },
            }}
          >
            {books!.selectedBooks
              .sort((a, b) => {
                if (isTitleOrderAsc !== undefined) {
                  return isTitleOrderAsc
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
                }
                if (isPageNumOrderAsc !== undefined) {
                  return isPageNumOrderAsc
                    ? a.numOfPages - b.numOfPages
                    : b.numOfPages - a.numOfPages;
                }
                return 0;
              })

              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book, i) => (
                <TableRow
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBooks((prev) => {
                      if (!prev.isPreviewVisible) {
                        return {
                          ...prev,
                          bookPreviewData: book,
                          isPreviewVisible: true,
                        };
                      }
                      return {
                        ...prev,
                        bookPreviewData: book,
                      };
                    });
                  }}
                  key={book.title + i}
                  hover
                >
                  <TableCell align="right" sx={{ pt: 3, pl: 3, pr: 5 }}>
                    <div style={{ width: 45, height: 45, marginLeft: "auto" }}>
                      <img
                        onError={(e) => {
                          e.currentTarget.src = "placeholder.svg";
                        }}
                        src={book.coverPhoto}
                        width={"100%"}
                        height={"100%"}
                        style={{
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                        alt={`${book.title}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    scope="row"
                    sx={{
                      minWidth: 280,
                      typography: "body1",
                      pl: 0,
                    }}
                  >
                    {book.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 210,
                    }}
                  >
                    {book.nameOfAuthor}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 110,
                    }}
                  >
                    {book.yearOfBublishing}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 150,
                    }}
                    align="center"
                  >
                    {book.numOfPages}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 130,
                    }}
                    align="center"
                  >
                    {book.quantity}
                  </TableCell>
                  <TableCell align="right">
                    <EnhancedPopper
                      bookPreviewData={book}
                      setBooks={setBooks}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={books!.selectedBooks.length}
        rowsPerPage={rowsPerPage}
        component="div"
        onPageChange={handleChangePage}
        page={page}
        sx={{
          overflow: "hidden",
          "& :is(.MuiTablePagination-selectLabel, .MuiInputBase-root)": {
            display: "none",
          },
        }}
      />
    </Stack>
  );
}
