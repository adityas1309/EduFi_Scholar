import { useState, useEffect } from "react";
import { getEthereumContract } from "../utils/web3";

function Scholarships() {
    const [scholarshipCount, setScholarshipCount] = useState(0);

    const fetchScholarships = async () => {
        const contract = await getEthereumContract();
        if (!contract) return;

        try {
            const count = await contract.scholarshipCount();
            setScholarshipCount(count.toString());
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
    };

    return (
        <div>
            <h2>Scholarships</h2>
            <button onClick={fetchScholarships}>Fetch Scholarships</button>
            <p>Total Scholarships: {scholarshipCount}</p>
        </div>
    );
}

export default Scholarships;
