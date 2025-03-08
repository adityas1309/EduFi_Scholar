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
        <div>
            <h2>Create Scholarship</h2>
            <input type="text" placeholder="Scholarship Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Amount (ETH)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={createScholarship}>Create</button>
        </div>
    );
}

export default CreateScholarship;
