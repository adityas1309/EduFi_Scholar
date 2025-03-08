import { useState } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

function FundScholarship() {
    const [scholarshipId, setScholarshipId] = useState("");
    const [amount, setAmount] = useState("");

    const fundScholarship = async () => {
        try {
            const contract = await getEthereumContract();
            const tx = await contract.fundScholarship(scholarshipId, { value: ethers.parseEther(amount) });
            await tx.wait();
            alert("Funding successful!");
        } catch (error) {
            console.error("Error funding scholarship:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Fund a Scholarship</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <input
                    type="text"
                    placeholder="Scholarship ID"
                    value={scholarshipId}
                    onChange={(e) => setScholarshipId(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <input
                    type="text"
                    placeholder="Amount (ETH)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
            <button
                onClick={fundScholarship}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Fund Scholarship
            </button>
        </div>
    );
}

export default FundScholarship;