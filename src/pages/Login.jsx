import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("All fields are required");
            return;
        }
        const res = await fetch(`${API}/login.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem("user", data.user);
            navigate("/");
        } else {
            setError(data.message);
        }
    };

    const handleKey = (e) => { if (e.key === "Enter") handleLogin(); };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
                    <p className="text-gray-400 mt-1 text-sm">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                        {error}
                    </div>
                )}

                <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Username
                    </label>
                    <input
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-7">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition mb-3 cursor-pointer"
                >
                    Sign In
                </button>
                <button
                    onClick={() => navigate("/register")}
                    className="w-full border border-indigo-400 text-indigo-500 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition cursor-pointer"
                >
                    Create an account
                </button>
            </div>
        </div>
    );
}

export default Login;
