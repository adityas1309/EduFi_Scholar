const hre = require("hardhat");

async function main() {
    
    const StudentLoan = await hre.ethers.getContractFactory("StudentLoan");

    
    const studentLoan = await StudentLoan.deploy();

    
    await studentLoan.waitForDeployment();

    const ScholarshipManager = await ethers.getContractFactory("ScholarshipManager");
    const contract = await ScholarshipManager.deploy();
    console.log("Contract deployed to:", contract.address);

    
    console.log(`StudentLoan contract deployed at: ${studentLoan.target}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
