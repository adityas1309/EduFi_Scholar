import { useState, useEffect } from "react";
import { getEthereumContract } from "./utils/web3";
import { ethers } from "ethers";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import FunderDashboard from "./components/FunderDashboard";

function App() {
    const [account, setAccount] = useState(null);
    const [role, setRole] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const contract = await getEthereumContract();
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();
                setAccount(userAddress);

                const userRole = await contract.getUserRole(userAddress);
                const roleMapping = { 0: "none", 1: "student", 2: "funder", 3: "admin" };
                setRole(roleMapping[userRole] || "none");
            } catch (error) {
                console.error("Connection failed:", error);
            }
        } else {
            alert("Please install MetaMask to use this platform!");
        }
    };

    const assignUserRole = async () => {
        if (!selectedRole) return alert("Please select a role first.");
        if (!account) return alert("Please connect your wallet first.");

        try {
            const contract = await getEthereumContract();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const roleMapping = { student: 1, funder: 2, admin: 3 };
            const tx = await contract.connect(signer).setUserRole(account, roleMapping[selectedRole]);
            await tx.wait();
            setRole(selectedRole);
        } catch (error) {
            console.error("Error assigning role:", error);
        }
    };

    const LandingPage = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Hero Section */}
            <section className="text-center py-20 px-4 max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Transform Education with<br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Decentralized Funding
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Bridging the gap between students and educational funding through blockchain technology.
                </p>
                {!account && (
                    <button 
                        onClick={connectWallet}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Get Started
                    </button>
                )}
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose EduFi Scholar?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['Transparent Funding', 'Instant Disbursement', 'Secure Transactions'].map((feature, index) => (
                            <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <div className="h-6 w-6 bg-blue-600 rounded-full" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature}</h3>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {['Connect Wallet', 'Choose Role', 'Interact', 'Succeed'].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{step}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">EduFi Scholar</h1>
                    {account && (
                        <div className="flex items-center space-x-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </span>
                        </div>
                    )}
                </div>
            </nav>

            {!account ? (
                <LandingPage />
            ) : (
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {role === "none" ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Setup</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Your Role
                                    </label>
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Choose Role</option>
                                        <option value="student">Student</option>
                                        <option value="funder">Funder</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button
                                    onClick={assignUserRole}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Confirm Role
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {role === "admin" && <AdminDashboard />}
                            {role === "student" && <StudentDashboard />}
                            {role === "funder" && <FunderDashboard />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;