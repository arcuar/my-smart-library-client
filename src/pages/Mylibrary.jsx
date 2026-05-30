import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyLibrary() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("전체");

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("library")) || [];

    setBooks(savedBooks);
  }, []);

  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem("library", JSON.stringify(updatedBooks));
  };

  const updateStatus = (isbn) => {
    const updatedBooks = books.map((book) => {
      if (book.isbn !== isbn) return book;

      const currentStatus = book.status || "읽고 싶음";

      let nextStatus = "읽고 싶음";

      if (currentStatus === "읽고 싶음") {
        nextStatus = "읽는 중";
      } else if (currentStatus === "읽는 중") {
        nextStatus = "읽음";
      }

      return {
        ...book,
        status: nextStatus,
      };
    });

    saveBooks(updatedBooks);
  };

  const removeBook = (isbn) => {
    const updatedBooks = books.filter((book) => book.isbn !== isbn);

    saveBooks(updatedBooks);
  };

  const setRating = (isbn, rating) => {
    const updatedBooks = books.map((book) =>
      book.isbn === isbn ? { ...book, rating } : book,
    );

    saveBooks(updatedBooks);
  };

  const updateMemo = (isbn, memo) => {
    const updatedBooks = books.map((book) =>
      book.isbn === isbn ? { ...book, memo } : book,
    );

    saveBooks(updatedBooks);
  };

  const filteredBooks = books.filter((book) => {
    if (filter === "전체") return true;

    return (book.status || "읽고 싶음") === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {" "}
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        ← 뒤로가기
      </button>
      <h1 className="text-3xl font-bold mb-8">내 서재 </h1>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("전체")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          전체
        </button>

        <button
          onClick={() => setFilter("읽고 싶음")}
          className="bg-blue-300 px-4 py-2 rounded"
        >
          읽고 싶음
        </button>

        <button
          onClick={() => setFilter("읽는 중")}
          className="bg-yellow-300 px-4 py-2 rounded"
        >
          읽는 중
        </button>

        <button
          onClick={() => setFilter("읽음")}
          className="bg-green-300 px-4 py-2 rounded"
        >
          읽음
        </button>
      </div>
      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">해당 상태의 책이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book) => (
            <div key={book.isbn} className="bg-white p-4 rounded-xl shadow">
              <img
                src={book.thumbnail || "https://via.placeholder.com/120x180"}
                alt={book.title}
                className="w-full h-64 object-cover rounded mb-3"
              />

              <h2 className="font-bold text-lg">{book.title}</h2>

              <p className="text-gray-500">
                {book.authors?.join(", ") || "저자 정보 없음"}
              </p>

              <p className="mt-2 text-blue-500 font-semibold">
                {book.status || "읽고 싶음"}
              </p>

              <div className="flex gap-1 mt-3 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(book.isbn, star)}
                    className={`cursor-pointer ${
                      star <= (book.rating || 0) ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              <textarea
                value={book.memo || ""}
                onChange={(e) => updateMemo(book.isbn, e.target.value)}
                placeholder="독서 메모를 입력하세요"
                className="border w-full p-2 mt-3 rounded"
              />

              <button
                onClick={() => updateStatus(book.isbn)}
                className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg"
              >
                상태 변경
              </button>

              <button
                onClick={() => removeBook(book.isbn)}
                className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
