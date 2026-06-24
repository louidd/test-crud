import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

function Users() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [newUser, setNewUser] = useState({ firstname: "", lastname: "", email: "" });
    const [addErrors, setAddErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) navigate("/login");
        else setCurrentUser(user);
    }, []);

    useEffect(() => {
        fetch(`${API}/index.php`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const handleAdd = async () => {
        const errs = [];
        if (!newUser.firstname) errs.push("First name is required");
        if (!newUser.lastname) errs.push("Last name is required");
        if (!newUser.email) errs.push("Email is required");
        if (errs.length > 0) { setAddErrors(errs); return; }

        const res = await fetch(`${API}/index.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        await res.json();

        const updated = await fetch(`${API}/index.php`).then(r => r.json());
        setUsers(updated);
        setNewUser({ firstname: "", lastname: "", email: "" });
        setAddErrors([]);
        setShowAdd(false);
    };

    const openEdit = (user) => {
        setEditUser({ ...user });
    };

    const closeEdit = () => setEditUser(null);

    const handleUpdate = async () => {
        await fetch(`${API}/update.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: editUser.id,
                firstname: editUser.firstname,
                lastname: editUser.lastname,
                email: editUser.email,
            }),
        });
        setUsers(users.map(u => u.id === editUser.id ? editUser : u));
        closeEdit();
    };

    const deleteUser = async (id) => {
        await fetch(`${API}/delete.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setUsers(users.filter(u => u.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        Hello, <span className="font-semibold text-gray-700">{currentUser}</span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
                        <p className="text-sm text-gray-400 mt-1">{users.length} total records</p>
                    </div>
                    <button
                        onClick={() => setShowAdd(true)}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer"
                    >
                        + Add User
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">First Name</th>
                                <th className="px-6 py-4 text-left">Last Name</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-400">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className={`border-b border-gray-50 hover:bg-gray-50 transition ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}
                                    >
                                        <td className="px-6 py-4 text-gray-400 font-mono">#{user.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{user.firstname}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.lastname}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => openEdit(user)}
                                                className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-xs bg-red-50 text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-100 transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Add User</h2>
                            <button
                                onClick={() => { setShowAdd(false); setAddErrors([]); }}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        {addErrors.length > 0 && (
                            <ul className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 list-disc list-inside">
                                {addErrors.map((e, i) => <li key={i}>{e}</li>)}
                            </ul>
                        )}

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                First Name
                            </label>
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                value={newUser.firstname}
                                onChange={e => setNewUser({ ...newUser, firstname: e.target.value })}
                                placeholder="Enter first name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Last Name
                            </label>
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                value={newUser.lastname}
                                onChange={e => setNewUser({ ...newUser, lastname: e.target.value })}
                                placeholder="Enter last name"
                            />
                        </div>

                        <div className="mb-7">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Email
                            </label>
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                value={newUser.email}
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleAdd}
                                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
                            >
                                Add User
                            </button>
                            <button
                                onClick={() => { setShowAdd(false); setAddErrors([]); }}
                                className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
                            <button
                                onClick={closeEdit}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                First Name
                            </label>
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                value={editUser.firstname}
                                onChange={e => setEditUser({ ...editUser, firstname: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Last Name
                            </label>
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                value={editUser.lastname}
                                onChange={e => setEditUser({ ...editUser, lastname: e.target.value })}
                            />
                        </div>

                        <div className="mb-7">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Email
                            </label>
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                value={editUser.email}
                                onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleUpdate}
                                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={closeEdit}
                                className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
