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
        <div>
            <h2>Scholarship List</h2>
            <ul>
                {scholarships.map((scholarship) => (
                    <li key={scholarship.id}>
                        <strong>{scholarship.name}</strong> - {scholarship.amount} ETH
                        {scholarship.disbursed ? " (Disbursed)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScholarshipList;
