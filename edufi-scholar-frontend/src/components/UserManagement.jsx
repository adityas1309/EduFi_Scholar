// New UserManagement.jsx component
import { useState, useEffect } from "react";

function UserManagement() {
    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
        const contract = await getEthereumContract();
        const eventFilter = contract.filters.RoleAssigned();
        const events = await contract.queryFilter(eventFilter);
        // Process events into user list
    };

    const updateRole = async (address, newRole) => {
        // Smart contract interaction
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">User Permissions</h3>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Current Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.address}>
                            <td>{shortenAddress(user.address)}</td>
                            <td>{user.role}</td>
                            <td>
                                <select 
                                    value={user.newRole} 
                                    onChange={(e) => updateRole(user.address, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="student">Student</option>
                                    <option value="funder">Funder</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;