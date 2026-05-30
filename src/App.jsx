import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyLibrary from "./pages/MyLibrary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<MyLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
