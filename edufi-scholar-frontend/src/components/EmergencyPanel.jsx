// EmergencyPanel.jsx
import { useState, useEffect } from "react";
function EmergencyPanel() {
    const [isPaused, setIsPaused] = useState(false);

    const togglePause = async () => {
        const contract = await getEthereumContract();
        if (isPaused) {
            await contract.unpause();
        } else {
            await contract.pause();
        }
        setIsPaused(!isPaused);
    };

    return (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h3 className="text-xl font-semibold text-red-800 mb-4">Emergency Controls</h3>
            <div className="flex items-center space-x-4">
                <button
                    onClick={togglePause}
                    className={`px-4 py-2 rounded-lg ${
                        isPaused 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-red-600 hover:bg-red-700'
                    } text-white`}
                >
                    {isPaused ? 'Resume Operations' : 'Pause All Activities'}
                </button>
                <p className="text-sm text-red-700">
                    Status: {isPaused ? 'PAUSED' : 'ACTIVE'}
                </p>
            </div>
        </div>
    );
}

export default EmergencyPanel;