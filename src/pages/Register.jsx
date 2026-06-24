import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !confirm) {
            setError("All fields are required");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        const res = await fetch(`${API}/register.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        setLoading(false);

        if (data.success) {
            navigate("/login");
        } else {
            setError(data.message);
        }
    };

    const handleKey = (e) => { if (e.key === "Enter") handleRegister(); };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Create account</h1>
                    <p className="text-gray-400 mt-1 text-sm">Fill in the details below to get started</p>
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
                        placeholder="Choose a username"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Create a password"
                    />
                </div>

                <div className="mb-7">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Confirm Password
                    </label>
                    <input
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        type="password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Repeat your password"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition mb-3 cursor-pointer disabled:opacity-60"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="w-full border border-indigo-400 text-indigo-500 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition cursor-pointer"
                >
                    Back to Sign In
                </button>
            </div>
        </div>
    );
}

export default Register;
