import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { getEthereumContract } from "./utils/web3";
import { ethers } from "ethers";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import FunderDashboard from "./components/FunderDashboard";

function App() {
    const [account, setAccount] = useState(null);
    const [role, setRole] = useState("none");
    const [loading, setLoading] = useState(false); // Changed initial state to false

    useEffect(() => {
        const checkConnectedWallet = async () => {
            if (window.ethereum) {
                try {
                    setLoading(true);
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        await connectWallet();
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        checkConnectedWallet();
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                setLoading(true);
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();
                setAccount(userAddress);

                const contract = await getEthereumContract();
                const userRole = await contract.getUserRole(userAddress);
                const roleMapping = { 0: "none", 1: "student", 2: "funder", 3: "admin" };
                setRole(roleMapping[Number(userRole)] || "none");
            } catch (error) {
                console.error("Connection failed:", error);
                alert("Failed to connect wallet");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please install MetaMask!");
            setLoading(false);
        }
    };

    const handleRoleAssignment = async (selectedRole) => {
        try {
            setLoading(true);
            const contract = await getEthereumContract();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            const roleMapping = { student: 1, funder: 2, admin: 3 };
            const tx = await contract.connect(signer).setUserRole(await signer.getAddress(), roleMapping[selectedRole]);
            await tx.wait();
            
            // Refresh role after assignment
            const newRole = await contract.getUserRole(await signer.getAddress());
            setRole(roleMapping[Number(newRole)] || "none");
        } catch (error) {
            console.error("Role assignment failed:", error);
            alert("Role assignment failed");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-8">Loading...</div>;

    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <nav className="bg-gray-900 shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-blue-600">EduFi Scholar</h1>
                        {account && (
                            <div className="flex items-center space-x-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {account.slice(0, 6)}...{account.slice(-4)}
                                </span>
                                <span className="text-sm text-gray-600">
                                    Role: {role}
                                </span>
                            </div>
                        )}
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={
                        !account ? <LandingPage connectWallet={connectWallet} /> : <Navigate to="/dashboard" />
                    } />
                    
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={
                            role === "none" ? <RoleSelection onRoleSelect={handleRoleAssignment} /> :
                            role === "student" ? <StudentDashboard /> :
                            role === "admin" ? <AdminDashboard /> :
                            role === "funder" ? <FunderDashboard /> :
                            <Navigate to="/" />
                        } />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}


const DashboardLayout = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Outlet />
        </div>
    );
};

const LandingPage = ({ connectWallet }) => (
  <div className="min-h-screen bg-gray-900 relative overflow-hidden">
    {/* Video Background */}
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover opacity-20"
        poster="https://cdn.pixabay.com/photo/2016/11/08/05/20/sunset-1807524_1280.jpg"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-circuits-97.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30"></div>
    </div>

    {/* Hero Section */}
    <div className="relative z-10 container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 animate-fade-in-down">
          <div className="inline-flex items-center bg-teal-400/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 space-x-2">
            <span className="text-teal-400 font-semibold text-sm tracking-wide">
              🚀 Next-Gen Education Funding Platform
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-6 leading-tight">
            Revolutionizing Education <br/>Through Web3
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Join the decentralized movement transforming how students access funding
            and investors support future talent.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="relative group">
          <button 
            onClick={connectWallet} 
            className="inline-flex items-center bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold text-lg px-12 py-5 rounded-2xl transform transition-all duration-300 group-hover:scale-105 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <svg
              className="w-6 h-6 mr-3 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Start Your Journey
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-24 text-center">
          {[
            { number: '1M+', label: 'Students Empowered' },
            { number: '$500M+', label: 'Funds Distributed' },
            { number: '95%', label: 'Success Rate' },
            { number: '50+', label: 'Global Partners' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-teal-400 mb-2">{stat.number}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* How It Works Section */}
    <div className="relative z-10 bg-gray-800/50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '📝', title: 'Apply', text: 'Students create verified scholarship applications' },
            { icon: '💎', title: 'Fund', text: 'Investors support promising candidates with crypto' },
            { icon: '🎯', title: 'Succeed', text: 'Students achieve goals, investors earn returns' },
          ].map((step, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">{step.title}</h3>
              <p className="text-blue-200">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="relative z-10 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { 
              text: 'EduFi made my Masters possible through decentralized funding. The transparent process gave me confidence in the system.',
              author: 'Sarah Johnson',
              role: 'Computer Science Graduate'
            },
            { 
              text: 'As an investor, I love supporting bright minds while earning sustainable returns. The blockchain tracking is revolutionary.',
              author: 'Michael Chen',
              role: 'Web3 Investor'
            },
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300"
            >
              <p className="text-lg text-blue-200 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-400/20 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold text-teal-400">{testimonial.author}</div>
                  <div className="text-sm text-blue-300">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Partners Section */}
    <div className="relative z-10 py-16 bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Trusted By</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-70">
          {['university', 'blockchain', 'tech-company'].map((logo, index) => (
            <div 
              key={index}
              className="w-32 h-16 bg-white/10 rounded-lg backdrop-blur-sm"
            ></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RoleSelection = ({ onRoleSelect }) => {
    const [selectedRole, setSelectedRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedRole) {
            await onRoleSelect(selectedRole);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Setup</h2>
            <form onSubmit={handleSubmit}>
                <select 
                    value={selectedRole} 
                    onChange={(e) => setSelectedRole(e.target.value)} 
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Choose Role</option>
                    <option value="student">Student</option>
                    <option value="funder">Funder</option>
                    <option value="admin">Admin</option>
                </select>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Confirm Role
                </button>
            </form>
        </div>
    );
};

export default App;