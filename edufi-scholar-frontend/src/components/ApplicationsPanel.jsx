// ApplicationsPanel.jsx
import { useState, useEffect } from "react";

function ApplicationsPanel() {
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        const contract = await getEthereumContract();
        const pendingApps = await contract.getPendingApplications();
        setApplications(pendingApps);
    };

    const reviewApplication = async (appId, status) => {
        const contract = await getEthereumContract();
        await contract.reviewApplication(appId, status);
        fetchApplications();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Pending Applications ({applications.length})</h3>
            {applications.map(app => (
                <div key={app.id} className="border-b py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-medium">{app.studentName}</h4>
                            <p className="text-sm text-gray-600">For: {app.scholarshipName}</p>
                        </div>
                        <div className="space-x-2">
                            <button 
                                onClick={() => reviewApplication(app.id, true)}
                                className="bg-green-100 text-green-800 px-3 py-1 rounded-md hover:bg-green-200"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => reviewApplication(app.id, false)}
                                className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ApplicationsPanel;