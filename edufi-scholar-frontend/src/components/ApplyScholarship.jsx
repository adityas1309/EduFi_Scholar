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
        <div>
            <h2>Apply for Scholarship</h2>
            <input type="text" placeholder="Scholarship ID" value={scholarshipId} onChange={(e) => setScholarshipId(e.target.value)} />
            <button onClick={applyForScholarship}>Apply</button>
        </div>
    );
}

export default ApplyScholarship;
