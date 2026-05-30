import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;