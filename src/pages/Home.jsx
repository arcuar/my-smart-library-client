import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">스마트 서재</h1>

      <button
        onClick={() => navigate("/search")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
      >
        도서 검색하기
      </button>

      <button
        onClick={() => navigate("/library")}
        className="bg-green-500 text-white px-6 py-3 rounded-lg mt-3"
      >
        내 서재
      </button>
    </div>
  );
}

export default Home;
