import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("로그인 성공");

      navigate("/home");

    } catch (error) {
  console.log("에러 전체:", error);

  if (error.response) {
    console.log("응답 데이터:", error.response.data);
    alert(error.response.data.message);
  } else {
    alert("서버 연결 실패");
  }
}
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center">
      <div className="w-[400px] bg-white p-10 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2">
          스마트 서재
        </h1>

        <p className="text-gray-500 text-center mb-8">
          나만의 독서 공간을 관리해보세요
        </p>

        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          로그인
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-3 border py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          회원가입
        </button>

      </div>
    </div>
  );
}

export default Login;