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
        <div>
            <h2>Fund a Scholarship</h2>
            <input type="text" placeholder="Scholarship ID" value={scholarshipId} onChange={(e) => setScholarshipId(e.target.value)} />
            <input type="text" placeholder="Amount (ETH)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={fundScholarship}>Fund</button>
        </div>
    );
}

export default FundScholarship;
