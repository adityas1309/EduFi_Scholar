import { useState } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

function ApplyScholarship() {
    const [scholarshipId, setScholarshipId] = useState("");

    const applyForScholarship = async () => {
        try {
            const contract = await getEthereumContract();
            const tx = await contract.applyForScholarship(scholarshipId, window.ethereum.selectedAddress);
            await tx.wait();
            alert("Application successful!");
        } catch (error) {
            console.error("Error applying:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Apply for Scholarship</h2>
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Scholarship ID"
                    value={scholarshipId}
                    onChange={(e) => setScholarshipId(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                    onClick={applyForScholarship}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}

export default ApplyScholarship;