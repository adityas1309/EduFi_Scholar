import { useState } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

function AssignRecipient({ scholarshipId, onAssign }) {
    const [recipient, setRecipient] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAssign = async () => {
        if (!ethers.isAddress(recipient)) {
            setError("Invalid Ethereum address");
            return;
        }

        try {
            setLoading(true);
            const contract = await getEthereumContract();
            const tx = await contract.assignRecipient(scholarshipId, recipient);
            await tx.wait();
            onAssign();
            setError("");
        } catch (error) {
            console.error("Assignment failed:", error);
            setError("Failed to assign recipient. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 space-y-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Recipient address (0x...)"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm flex-1"
                />
                <button
                    onClick={handleAssign}
                    disabled={loading}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Assigning..." : "Assign"}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

export default AssignRecipient;