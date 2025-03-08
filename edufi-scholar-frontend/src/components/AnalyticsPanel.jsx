import { useEffect, useState } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

function AnalyticsPanel() {
    const [stats, setStats] = useState({
        totalFunds: "0",
        disbursedFunds: "0",
        activeScholarships: "0"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const contract = await getEthereumContract();
                const count = await contract.scholarshipCount();
                
                let total = 0n;
                let disbursed = 0n;

                for (let i = 0; i < count; i++) {
                    const scholarship = await contract.scholarships(i);
                    total += scholarship.amount;
                    if (scholarship.disbursed) {
                        disbursed += scholarship.amount;
                    }
                }

                setStats({
                    totalFunds: ethers.formatEther(total),
                    disbursedFunds: ethers.formatEther(disbursed),
                    activeScholarships: count.toString()
                });
                
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                label="Total Funds"
                value={`${stats.totalFunds} ETH`}
                loading={loading}
                color="blue"
            />
            <StatCard
                label="Disbursed Funds"
                value={`${stats.disbursedFunds} ETH`}
                loading={loading}
                color="green"
            />
            <StatCard
                label="Active Scholarships"
                value={stats.activeScholarships}
                loading={loading}
                color="purple"
            />
        </div>
    );
}

function StatCard({ label, value, loading, color }) {
    return (
        <div className={`bg-${color}-50 p-6 rounded-xl`}>
            <h4 className={`text-sm text-${color}-600 mb-2`}>{label}</h4>
            {loading ? (
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            ) : (
                <p className="text-2xl font-bold">{value}</p>
            )}
        </div>
    );
}

export default AnalyticsPanel;