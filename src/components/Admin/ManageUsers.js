import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingField, setEditingField] = useState(null);
    const [newFieldValue, setNewFieldValue] = useState('');

    // Fetch users and balance data when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEdit = (userId, field, currentValue) => {
        setEditingField({ userId, field });
        setNewFieldValue(currentValue);
    };

    const handleSave = async () => {
        const { userId, field } = editingField;

        try {
            await axios.post('http://localhost:3001/manageusers', {
                userId,
                field,
                newValue: newFieldValue,
            });

            // Update the local state
            setUsers(users.map(user =>
                user._id === userId ? { ...user, [field]: newFieldValue } : user
            ));
            setEditingField(null);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };

    const handleCancel = () => {
        setEditingField(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Fullname</th>
                        <th className="border px-4 py-2">Balance</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">
                                {editingField && editingField.userId === user._id && editingField.field === 'email' ? (
                                    <input
                                        type="text"
                                        value={newFieldValue}
                                        onChange={(e) => setNewFieldValue(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {editingField && editingField.userId === user._id && editingField.field === 'fullname' ? (
                                    <input
                                        type="text"
                                        value={newFieldValue}
                                        onChange={(e) => setNewFieldValue(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    user.fullname
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {editingField && editingField.userId === user._id && editingField.field === 'balance' ? (
                                    <input
                                        type="number"
                                        value={newFieldValue}
                                        onChange={(e) => setNewFieldValue(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    user.balance
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {editingField && editingField.userId === user._id ? (
                                    <>
                                        <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                                        <button onClick={handleCancel} className="ml-2 px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(user._id, 'email', user.email)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit Email</button>
                                        <button onClick={() => handleEdit(user._id, 'fullname', user.fullname)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit fullname</button>
                                        <button onClick={() => handleEdit(user._id, 'balance', user.balance)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit Balance</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
