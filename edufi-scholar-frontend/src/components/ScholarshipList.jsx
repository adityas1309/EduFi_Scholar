import { useState, useEffect } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";
import AssignRecipient from "./AssignRecipient";

function ScholarshipList() {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            setLoading(true);
            const contract = await getEthereumContract();
            const count = await contract.scholarshipCount();
            const scholarshipArray = [];

            for (let i = 0; i < count; i++) {
                const scholarship = await contract.scholarships(i);
                scholarshipArray.push({
                    id: i,
                    name: scholarship.name,
                    amount: ethers.formatEther(scholarship.amount),
                    recipient: scholarship.recipient,
                    disbursed: scholarship.disbursed,
                    created: new Date(scholarship.timestamp * 1000).toLocaleDateString(),
                });
            }

            setScholarships(scholarshipArray);
            setError("");
        } catch (error) {
            console.error("Error fetching scholarships:", error);
            setError("Failed to load scholarships. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDisburse = async (id) => {
        try {
            const contract = await getEthereumContract();
            const scholarship = await contract.scholarships(id);
            
            if (scholarship.recipient === ethers.ZeroAddress) {
                alert("Cannot disburse - no recipient assigned!");
                return;
            }

            const tx = await contract.disburseScholarship(id);
            await tx.wait();
            fetchScholarships();
            
        } catch (error) {
            console.error("Disbursal failed:", error);
            let errorMessage = "Disbursal failed";
            
            if (error.reason === "No recipient assigned") {
                errorMessage = "Cannot disburse - no recipient assigned!";
            } else if (error.code === "CALL_EXCEPTION") {
                errorMessage = "Contract interaction failed - check contract state";
            }
            
            setError(errorMessage);
        }
    };

    const filteredScholarships = scholarships
        .filter(scholarship => {
            const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                scholarship.recipient?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === "all" ? true : 
                                filterStatus === "disbursed" ? scholarship.disbursed : !scholarship.disbursed;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "newest") return b.id - a.id;
            if (sortBy === "oldest") return a.id - b.id;
            if (sortBy === "amount") return b.amount - a.amount;
            return 0;
        });

    return (
        <div className="space-y-6">
            {/* ... (keep previous filters and search UI) ... */}

            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 bg-white rounded-lg shadow animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredScholarships.map((scholarship) => (
                        <div
                            key={scholarship.id}
                            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {scholarship.name}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        {scholarship.amount} ETH • Created: {scholarship.created}
                                    </p>
                                    {scholarship.recipient && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Recipient: {scholarship.recipient}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            scholarship.disbursed
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {scholarship.disbursed ? "Disbursed" : "Active"}
                                    </span>
                                    
                                    {!scholarship.disbursed && (
                                        <button
                                            onClick={() => handleDisburse(scholarship.id)}
                                            className={`px-4 py-2 rounded-lg transition-colors ${
                                                scholarship.recipient 
                                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                            disabled={!scholarship.recipient}
                                        >
                                            {scholarship.recipient ? "Disburse" : "No Recipient"}
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            {!scholarship.recipient && (
                                <AssignRecipient 
                                    scholarshipId={scholarship.id}
                                    onAssign={fetchScholarships}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScholarshipList;