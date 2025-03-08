// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Scholarship is Ownable {
    enum Role { None, Student, Funder, Admin }

    mapping(address => Role) public userRoles; // Mapping of user addresses to roles

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
    event UserRoleAssigned(address indexed user, Role role);

    constructor(address initialOwner) Ownable(initialOwner) {
        userRoles[initialOwner] = Role.Admin; // Contract deployer is admin by default
    }

    function setUserRole(address user, Role role) external onlyOwner {
        userRoles[user] = role;
        emit UserRoleAssigned(user, role);
    }

    function getUserRole(address user) external view returns (Role) {
        return userRoles[user];
    }

    function createScholarship(string memory _name, uint256 _amount) external {
        require(userRoles[msg.sender] == Role.Admin, "Only admins can create scholarships");

        scholarshipCount++;
        scholarships[scholarshipCount] = ScholarshipInfo(_name, address(0), _amount, false);
        emit ScholarshipCreated(scholarshipCount, _name, _amount);
    }

    function applyForScholarship(uint256 _id) external {
        require(userRoles[msg.sender] == Role.Student, "Only students can apply");
        require(scholarships[_id].recipient == address(0), "Already assigned");

        scholarships[_id].recipient = msg.sender;
    }

    function disburseScholarship(uint256 _id) external {
        require(userRoles[msg.sender] == Role.Admin, "Only admins can disburse");
        require(scholarships[_id].recipient != address(0), "No recipient assigned");
        require(!scholarships[_id].disbursed, "Already disbursed");

        payable(scholarships[_id].recipient).transfer(scholarships[_id].amount);
        scholarships[_id].disbursed = true;

        emit ScholarshipDisbursed(_id, scholarships[_id].recipient);
    }

    receive() external payable {} // Allows contract to receive funds
}
