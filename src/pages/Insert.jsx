import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

function Insert() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const errs = [];
        if(!firstname) errs.push("Firstname is required");
        if(!lastname) errs.push("Lastname is required");
        if(!email) errs.push("Email is required");

        if(errs.length > 0){ setErrors(errs); return; }

        const res = await fetch(`${API}/index.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstname, lastname, email })
        });
        const data = await res.json();
        alert(data.message);
        navigate("/");
    };

    return (
        <div>
            <h1>Create User</h1>
            <ul style={{color:"red"}}>
                {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
            <label>Firstname</label><br/>
            <input value={firstname} onChange={e => setFirstname(e.target.value)} /><br/>
            <label>Lastname</label><br/>
            <input value={lastname} onChange={e => setLastname(e.target.value)} /><br/>
            <label>Email</label><br/>
            <input value={email} onChange={e => setEmail(e.target.value)} /><br/><br/>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => navigate("/")}>Back</button>
        </div>
    );
}

export default Insert;