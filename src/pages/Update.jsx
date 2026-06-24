import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost/react-api/api";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch(`${API}/index.php?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setEmail(data.email);
            });
    }, [id]);

    const handleUpdate = async () => {
        const res = await fetch(`${API}/update.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, firstname, lastname, email })
        });
        const data = await res.json();
        alert(data.message);
        navigate("/");
    };

    return (
        <div>
            <h1>Update User</h1>
            <label>Firstname</label><br/>
            <input value={firstname} onChange={e => setFirstname(e.target.value)} /><br/>
            <label>Lastname</label><br/>
            <input value={lastname} onChange={e => setLastname(e.target.value)} /><br/>
            <label>Email</label><br/>
            <input value={email} onChange={e => setEmail(e.target.value)} /><br/><br/>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => navigate("/")}>Back</button>
        </div>
    );
}

export default Update;