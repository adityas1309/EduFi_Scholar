const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners(); 

    const Grant = await hre.ethers.getContractFactory("Grant");
    const grant = await Grant.deploy(deployer.address);

    await grant.waitForDeployment();

    console.log(`Grant contract deployed at: ${grant.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
