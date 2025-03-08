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
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scholarships Overview</h2>
            <div className="flex items-center gap-4">
                <button
                    onClick={fetchScholarships}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Refresh Count
                </button>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <span className="text-lg font-medium text-gray-700">
                        Total Scholarships:{" "}
                        <span className="text-blue-600 ml-2">{scholarshipCount}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Scholarships;