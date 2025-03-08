const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const Scholarship = await hre.ethers.getContractFactory("Scholarship");
    const scholarship = await Scholarship.deploy(deployer.address); 

    await scholarship.waitForDeployment();

    console.log(`Scholarship contract deployed at: ${scholarship.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
