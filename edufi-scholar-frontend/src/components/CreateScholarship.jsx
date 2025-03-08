import { useState } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

function CreateScholarship() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const createScholarship = async () => {
        try {
            const contract = await getEthereumContract();
            const tx = await contract.createScholarship(name, ethers.parseEther(amount));
            await tx.wait();
            alert("Scholarship created successfully!");
        } catch (error) {
            console.error("Error creating scholarship:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create Scholarship</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Scholarship Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <input
                    type="text"
                    placeholder="Amount (ETH)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                    onClick={createScholarship}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Create Scholarship
                </button>
            </div>
        </div>
    );
}

export default CreateScholarship;