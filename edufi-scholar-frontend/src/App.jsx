import { useState, useEffect } from "react";
import { getEthereumContract } from "./utils/web3";
import { ethers } from "ethers";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import FunderDashboard from "./components/FunderDashboard";

function App() {
    const [account, setAccount] = useState(null);
    const [role, setRole] = useState(null);
    const [selectedRole, setSelectedRole] = useState(""); // For user selection

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const contract = await getEthereumContract();
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();
                setAccount(userAddress);

                console.log(`Fetching role from contract for: ${userAddress}`);
                const userRole = await contract.getUserRole(userAddress);
                console.log("User Role (Raw):", userRole);

                // Convert raw role (number) to a readable string
                const roleMapping = { 0: "none", 1: "student", 2: "funder", 3: "admin" };
                setRole(roleMapping[userRole] || "none");
            } catch (error) {
                console.error("Connection failed:", error);
            }
        } else {
            alert("MetaMask not detected!");
        }
    };

    const assignUserRole = async () => {
        if (!selectedRole) {
            alert("Please select a role first.");
            return;
        }

        if (!account) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            const contract = await getEthereumContract();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Convert role to contract role values
            const roleMapping = { student: 1, funder: 2, admin: 3 };
            const roleValue = roleMapping[selectedRole];

            console.log(`Assigning role ${selectedRole} (${roleValue}) to ${account}...`);
            const tx = await contract.connect(signer).setUserRole(account, roleValue);
            await tx.wait();
            alert("Role assigned successfully!");

            setRole(selectedRole); // Update UI with the assigned role
        } catch (error) {
            console.error("Error assigning role:", error);
        }
    };

    return (
        <div>
            <h1>EduFi Scholar</h1>

            {!account ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <>
                    <p>Connected Wallet: {account}</p>

                    {role === "none" && (
                        <div>
                            <h3>Select Your Role</h3>
                            <select value={selectedRole || ""} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="student">Student</option>
                                <option value="funder">Funder</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button onClick={assignUserRole}>Set Role</button>
                        </div>
                    )}

                    {role === "admin" && <AdminDashboard />}
                    {role === "student" && <StudentDashboard />}
                    {role === "funder" && <FunderDashboard />}
                </>
            )}
        </div>
    );
}

export default App;
