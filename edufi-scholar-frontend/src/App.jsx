import { useState } from "react";
import { ethers } from "ethers";
import Scholarships from "./components/Scholarships";
import ApplyScholarship from "./components/ApplyScholarship";

function App() {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setAccount(await signer.getAddress());
            } catch (error) {
                console.error("Connection failed:", error);
            }
        } else {
            alert("MetaMask not detected!");
        }
    };

    return (
        <div>
            <h1>EduFi Scholar</h1>

            {/* Connect Wallet */}
            {account ? (
                <p>Connected Wallet: {account}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}

            {/* Show Scholarships & Apply Feature */}
            <Scholarships />
            <ApplyScholarship />
        </div>
    );
}

export default App;
