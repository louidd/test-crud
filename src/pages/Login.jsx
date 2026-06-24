import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost/react-api/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(!username || !password){
            setError("All fields are required");
            return;
        }

        const res = await fetch(`${API}/login.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if(data.success){
            localStorage.setItem("user", data.user);
            navigate("/");
        } else {
            setError(data.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <p style={{color:"red"}}>{error}</p>
            <label>Username</label><br/>
            <input value={username} onChange={e => setUsername(e.target.value)} /><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}

export default Login;