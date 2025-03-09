import { useEffect, useState } from "react";
import { ethers } from "ethers";

export const scholarshipContractAddress = "0xB554029ddcc291E688C408400F614031d80a9848"; 


export const scholarshipABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ScholarshipCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "ScholarshipDisbursed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum Scholarship.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "UserRoleAssigned",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "applyForScholarship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "createScholarship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "disburseScholarship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserRole",
    "outputs": [
      {
        "internalType": "enum Scholarship.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "scholarshipCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "scholarships",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "disbursed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "enum Scholarship.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "setUserRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userRoles",
    "outputs": [
      {
        "internalType": "enum Scholarship.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];


const StudentDashboard = ({ userAddress, provider, signer }) => {
    const [scholarships, setScholarships] = useState([]);
    const [appliedScholarships, setAppliedScholarships] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load available scholarships
    useEffect(() => {
        if (provider) fetchScholarships();
    }, [provider]);

    // Fetch scholarships from the blockchain
    const fetchScholarships = async () => {
        try {
            setLoading(true);
            const contract = new ethers.Contract(SCHOLARSHIP_CONTRACT_ADDRESS, ScholarshipABI, provider);
            const count = await contract.scholarshipCount();
            let availableScholarships = [];

            for (let i = 1; i <= count; i++) {
                const scholarship = await contract.scholarships(i);
                availableScholarships.push({
                    id: i,
                    name: scholarship.name,
                    amount: ethers.utils.formatEther(scholarship.amount),
                    recipient: scholarship.recipient,
                    disbursed: scholarship.disbursed,
                });
            }

            setScholarships(availableScholarships);
            setAppliedScholarships(availableScholarships.filter(s => s.recipient === userAddress));
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
        setLoading(false);
    };

    // Apply for a scholarship
    const applyForScholarship = async (id) => {
        try {
            const contract = new ethers.Contract(SCHOLARSHIP_CONTRACT_ADDRESS, ScholarshipABI, signer);
            const tx = await contract.applyForScholarship(id);
            await tx.wait();
            alert("Application submitted successfully!");
            fetchScholarships(); // Refresh data
        } catch (error) {
            console.error("Error applying:", error);
            alert("Failed to apply. Make sure you're a student.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Dashboard</h2>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-lg text-gray-700 mb-4">
                        Explore available scholarship opportunities and manage your applications.
                    </p>
                    {loading ? (
                        <p className="text-center text-gray-600">Loading scholarships...</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Applied Scholarships */}
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-indigo-800 mb-2">Your Applications</h3>
                                {appliedScholarships.length > 0 ? (
                                    appliedScholarships.map((s, index) => (
                                        <div key={index} className="bg-white p-3 rounded-md shadow-md mb-2">
                                            <p className="text-indigo-700 font-medium">{s.name}</p>
                                            <p className="text-gray-600">Amount: {s.amount} ETH</p>
                                            <p className={`text-sm ${s.disbursed ? "text-green-600" : "text-red-600"}`}>
                                                {s.disbursed ? "Disbursed" : "Pending"}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">You haven't applied for any scholarships.</p>
                                )}
                            </div>

                            {/* Available Scholarships */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-800 mb-2">Available Scholarships</h3>
                                {scholarships.length > 0 ? (
                                    scholarships.map((s, index) => (
                                        <div key={index} className="bg-white p-3 rounded-md shadow-md mb-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-green-700 font-medium">{s.name}</p>
                                                <p className="text-gray-600">Amount: {s.amount} ETH</p>
                                            </div>
                                            {!s.recipient && (
                                                <button
                                                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                                                    onClick={() => applyForScholarship(s.id)}
                                                >
                                                    Apply
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No scholarships available.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
