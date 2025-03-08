// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Grant is Ownable {
    struct GrantInfo {
        string name;
        address recipient;
        uint256 amount;
        bool approved;
    }

    mapping(uint256 => GrantInfo) public grants;
    uint256 public grantCount;

    event GrantCreated(uint256 id, string name, uint256 amount);
    event GrantApproved(uint256 id, address recipient);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createGrant(string memory _name, uint256 _amount) external onlyOwner {
        grantCount++;
        grants[grantCount] = GrantInfo(_name, address(0), _amount, false);
        emit GrantCreated(grantCount, _name, _amount);
    }

    function applyForGrant(uint256 _id, address _student) external onlyOwner {
        require(grants[_id].amount > 0, "Grant does not exist");
        require(grants[_id].recipient == address(0), "Already assigned");

        grants[_id].recipient = _student;
    }

    function approveGrant(uint256 _id) external onlyOwner {
        require(grants[_id].recipient != address(0), "No recipient assigned");
        require(!grants[_id].approved, "Already approved");

        grants[_id].approved = true;
        payable(grants[_id].recipient).transfer(grants[_id].amount);

        emit GrantApproved(_id, grants[_id].recipient);
    }

    receive() external payable {} // Allows contract to receive funds
}
