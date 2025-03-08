// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Scholarship is Ownable {
    struct ScholarshipInfo {
        string name;
        address recipient;
        uint256 amount;
        bool disbursed;
    }

    mapping(uint256 => ScholarshipInfo) public scholarships;
    uint256 public scholarshipCount;

    event ScholarshipCreated(uint256 id, string name, uint256 amount);
    event ScholarshipDisbursed(uint256 id, address recipient);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createScholarship(string memory _name, uint256 _amount) external onlyOwner {
        scholarshipCount++;
        scholarships[scholarshipCount] = ScholarshipInfo(_name, address(0), _amount, false);
        emit ScholarshipCreated(scholarshipCount, _name, _amount);
    }

    function applyForScholarship(uint256 _id, address _student) external onlyOwner {
        require(scholarships[_id].amount > 0, "Scholarship does not exist");
        require(scholarships[_id].recipient == address(0), "Already assigned");
        
        scholarships[_id].recipient = _student;
    }

    function disburseScholarship(uint256 _id) external onlyOwner {
        require(scholarships[_id].recipient != address(0), "No recipient assigned");
        require(!scholarships[_id].disbursed, "Already disbursed");

        payable(scholarships[_id].recipient).transfer(scholarships[_id].amount);
        scholarships[_id].disbursed = true;

        emit ScholarshipDisbursed(_id, scholarships[_id].recipient);
    }

    receive() external payable {} // Allows contract to receive funds
}
