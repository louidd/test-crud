import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost/react-api/api";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Redirect to login if not logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user) navigate("/login");
    }, []);

    useEffect(() => {
        fetch(`${API}/index.php`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const deleteUser = async (id) => {
        await fetch(`${API}/delete.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        setUsers(users.filter(user => user.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>
            <h1>Users</h1>
            <button onClick={() => navigate("/insert")}>Create User</button>
            <button onClick={handleLogout}>Logout</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                                <button onClick={() => navigate(`/update/${user.id}`)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;