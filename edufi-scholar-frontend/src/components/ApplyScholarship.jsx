import { useState } from "react";
import { getEthereumContract } from "../utils/web3";

function CreateScholarship() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const createScholarship = async () => {
        try {
            const contract = await getEthereumContract();
            if (!contract) {
                alert("Contract not available!");
                return;
            }

            const tx = await contract.createScholarship(name, amount);
            await tx.wait();

            alert("Scholarship Created!");
            setName("");
            setAmount("");
        } catch (error) {
            console.error("Error creating scholarship:", error);
        }
    };

    return (
        <div>
            <h2>Create Scholarship</h2>
            <input
                type="text"
                placeholder="Scholarship Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={createScholarship}>Create</button>
        </div>
    );
}

export default CreateScholarship;
