import { useState } from "react";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";

type Book = {
  _id: string;
  isbn: string;
  title: string;
  author: string;
  published: number;
  pages: string;
  cover: string;
  status: number;
};

export default function PrivatePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [search, setSearch] = useState("");
  const [elemenyId, setElemenyId] = useState("");
  const [editStatus, setEditStatus] = useState(1);

  const fetchBooks = async () => {
    const res = await fetch("https://lavina.onrender.com/books");
    const data = await res.json();
    setBooks(data.data);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    await API.delete(`/books/${id}`);
    setBooks((old) => old.filter((book) => book._id !== id));
  };
  const handleCreate = async () => {
    await API.post("/books", { isbn });
    setShowModal(false);
    fetchBooks();
  };
  const handleSearch = async (value: string) => {
    setSearch(value);

    const res = await API.get(`/books/${value}`);
    const data = res.data;

    setBooks(data.data);
  };
  const handleEdit = async () => {
    await API.patch(`/books/${elemenyId}`, { status: editStatus });
    fetchBooks();
    setShowEdit(false);
  };

  const getStatusBadge = (status: number) => {
    if (status == 1) {
      return (
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
          New
        </span>
      );
    } else if (status == 2) {
      return (
        <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-md">
          Reading
        </span>
      );
    } else if (status == 3) {
      return (
        <span className="bg-green-400 text-white text-xs font-semibold px-2 py-1 rounded-md">
          Finished
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="text-white">
      <div className="text-white">
        <header className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-6">
            <Link to="/private">
              <img src="logo.svg" />
            </Link>

            <div className="flex items-center bg-white rounded-md px-3 py-1 w-full max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for any training you want"
                className="bg-white text-gray-800 placeholder-gray-500 w-full focus:outline-none"
              />
            </div>
          </div>

          <img src="right.svg" />
        </header>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            You’ve got
            <span className="text-purple-500"> {books.length} book</span>
          </h1>
          <p className="text-sm text-gray-300">Your books today</p>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          onClick={() => setShowModal(true)}
        >
          + Create a book
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white text-black rounded-xl shadow-md p-4 relative"
          >
            <button
              onClick={() => handleDelete(book._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-extrabold text-extrabold"
            >
              &times;
            </button>
            <button
              onClick={() => {
                setElemenyId(book._id);
                setEditStatus(book.status);
                setShowEdit(true);
              }}
              className="absolute top-7 right-1 font-extrabold text-bold"
            >
              Edit
            </button>

            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-sm">Cover: {book.cover}</p>
            <p className="text-sm">Pages: {book.pages}</p>
            <p className="text-sm">
              Published: {new Date(book.published).getFullYear()}
            </p>
            <p className="text-sm">Isbn: {book.isbn}</p>
            <p className="text-sm text-gray-600 mt-2">
              {book.author} / {new Date(book.published).getFullYear()}
            </p>
            <div className="absolute bottom-4 right-4">
              {getStatusBadge(book.status)}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-black relative">
            <h2 className="text-lg font-semibold mb-4">Create a book</h2>

            <label className="block text-sm mb-1">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Enter ISBN"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-black relative">
            <h2 className="text-lg font-semibold mb-4">Edit Book Status</h2>

            <label className="block text-sm mb-1">Status</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={1}>New</option>
              <option value={2}>Reading</option>
              <option value={3}>Finished</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
