import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Search() {

  const addToLibrary = (book) => {
  const library =
    JSON.parse(localStorage.getItem("library")) || [];

  const exists = library.find(
    (item) => item.isbn === book.isbn
  );

  if (exists) {
    alert("이미 서재에 있는 책입니다.");
    return;
  }

  library.push({
    ...book,
    status: "읽고 싶음",
    rating: 0,
    memo: "",
  });

  localStorage.setItem(
    "library",
    JSON.stringify(library)
  );

  alert("서재에 담았습니다.");
};

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

 

  const handleSearch = async () => {
  if (!query.trim()) {
    alert("검색어를 입력하세요.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.get(
      `/books/search?query=${query}`
    );

    setBooks(response.data.books);

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("서버 연결 실패");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-10"> <Narbar />
      <h1 className="text-3xl font-bold mb-8">
        도서 검색
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="책 제목을 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-3 rounded-lg bg-white"
        />

       <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 rounded-lg hover:bg-blue-600"
>
        검색
       </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {books.map((book) => (
    <div
      key={book.isbn}
      className="bg-white p-4 rounded-xl shadow"
    >
      <img
        src={
          book.thumbnail ||
          "https://via.placeholder.com/120x180"
        }
        alt={book.title}
        className="w-full h-64 object-cover rounded mb-3"
      />

      <h2 className="font-bold text-lg">
        {book.title}
      </h2>

      <p className="text-gray-500">
        {book.authors?.join(", ")}
      </p>

      <p className="text-sm mt-2">
        {book.publisher}
      </p>

      <button
        onClick={() => addToLibrary(book)}
        className="mt-3 w-full bg-green-500 text-white py-2 rounded"
      >
        서재에 담기
      </button>
    </div>
  ))}
</div>
    </div>
  );
}

export default Search;