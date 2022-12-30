import { BookTypes } from "../components/App";

interface FetchTypes {
  id?: number | null;
  setBooks: () => void;
  options: RequestInit;
}

const fetchData = ({ id = null, setBooks, options }: FetchTypes) => {
  fetch(`https://book-store.mvsoft.co.rs/books/${id}`, options)
    .then((r) => r.json())
    .then(() => setBooks())
    .catch((error) => {
      // only for development
      process.env.NODE_ENV === "development" && console.log(error);
    });
};
export default fetchData;

interface DeleteTypes {
  id: BookTypes["id"];
  handleMutateBooks: () => void;
}

export const deleteData = ({ id, handleMutateBooks }: DeleteTypes) =>
  fetchData({
    id: id,
    options: {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    },
    setBooks: handleMutateBooks,
  });

interface PatchTypes {
  id: BookTypes["id"];
  body: string;
  handleMutateBooks: () => void;
}

export const patchData = ({ id, body, handleMutateBooks }: PatchTypes) =>
  fetchData({
    id: id,
    options: {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    },
    setBooks: handleMutateBooks,
  });
