import { useEffect, useState } from "react";
import { getEthereumContract } from "../utils/web3";
import { ethers } from "ethers";

const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const contract = await getEthereumContract();
                const filter = contract.filters.ScholarshipCreated();
                const logs = await contract.queryFilter(filter);
                
                setLogs(logs.map(log => ({
                    action: "Scholarship Created",
                    name: log.args.name,
                    amount: ethers.formatEther(log.args.amount),
                    timestamp: new Date(log.args.timestamp * 1000).toLocaleString(),
                    admin: shortenAddress(log.args.owner)
                })));
                
            } catch (error) {
                console.error("Error fetching logs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Activity Log</h3>
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {logs.map((log, index) => (
                        <div key={index} className="border-b pb-2">
                            <div className="flex justify-between text-sm">
                                <div>
                                    <span className="font-medium">{log.action}</span>
                                    <span className="text-gray-500 ml-2">- {log.name}</span>
                                </div>
                                <span className="text-gray-500">{log.timestamp}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                By: {log.admin} • Amount: {log.amount} ETH
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AuditLogs;