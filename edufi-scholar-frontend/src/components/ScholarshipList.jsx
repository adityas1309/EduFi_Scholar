import { useState, useEffect } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

function ScholarshipList() {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
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
                });
            }

            setScholarships(scholarshipArray);
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scholarship List</h2>
            <div className="grid gap-4">
                {scholarships.map((scholarship) => (
                    <div
                        key={scholarship.id}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{scholarship.name}</h3>
                                <p className="text-gray-600">{scholarship.amount} ETH</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    scholarship.disbursed
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                                {scholarship.disbursed ? "Disbursed" : "Active"}
                            </span>
                        </div>
                        {scholarship.recipient && (
                            <p className="mt-2 text-sm text-gray-500">
                                Recipient: {scholarship.recipient}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScholarshipList;