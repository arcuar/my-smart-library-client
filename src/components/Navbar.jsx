import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6 flex gap-3">
      <button
        onClick={() => navigate("/home")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        홈
      </button>

      <button
        onClick={() => navigate("/search")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        도서 검색
      </button>

      <button
        onClick={() => navigate("/library")}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        내 서재
      </button>
    </div>
  );
}

export default Navbar;
