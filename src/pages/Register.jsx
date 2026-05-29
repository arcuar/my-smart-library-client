import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
      });

      alert(response.data.message);

    } catch (error) {
      alert("회원가입 실패");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center">
      <div className="w-[400px] bg-white p-10 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2">
          회원가입
        </h1>

        <p className="text-gray-500 text-center mb-8">
          스마트 서재 계정을 생성하세요
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
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          회원가입
        </button>

        <button
         onClick={() => navigate("/")}
         className="w-full mt-3 border py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
  로그인으로 돌아가기
</button>

      </div>
    </div>
  );
}

export default Register;