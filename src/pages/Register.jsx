import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost/react-api/api";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if(!username || !password){
            setError("All fields are required");
            return;
        }

        const res = await fetch(`${API}/register.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if(data.success){
            alert("Account created! Please login.");
            navigate("/login");
        } else {
            setError(data.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <p style={{color:"red"}}>{error}</p>
            <label>Username</label><br/>
            <input value={username} onChange={e => setUsername(e.target.value)} /><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => navigate("/login")}>Back to Login</button>
        </div>
    );
}

export default Register;