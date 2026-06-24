import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Insert from "./pages/Insert";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Users />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/update/:id" element={<Update />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;