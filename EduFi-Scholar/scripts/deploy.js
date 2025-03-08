const hre = require("hardhat");

async function main() {
    
    const StudentLoan = await hre.ethers.getContractFactory("StudentLoan");

    
    const studentLoan = await StudentLoan.deploy();

    
    await studentLoan.waitForDeployment();

    
    console.log(`StudentLoan contract deployed at: ${studentLoan.target}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
