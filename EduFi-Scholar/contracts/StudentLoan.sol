// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StudentLoan {
    struct Loan {
        uint id;
        address borrower;
        uint amount;
        uint interest;
        uint duration;
        uint startTime;
        bool repaid;
    }

    uint public loanCount;
    mapping(uint => Loan) public loans;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event LoanRequested(uint id, address borrower, uint amount);
    event LoanRepaid(uint id, address borrower);

    function requestLoan(uint _amount, uint _interest, uint _duration) external {
        loanCount++;
        loans[loanCount] = Loan(loanCount, msg.sender, _amount, _interest, _duration, block.timestamp, false);
        emit LoanRequested(loanCount, msg.sender, _amount);
    }

    function repayLoan(uint _loanId) external payable {
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Not your loan");
        require(msg.value >= loan.amount + (loan.amount * loan.interest / 100), "Insufficient amount");
        loan.repaid = true;
        emit LoanRepaid(_loanId, msg.sender);
    }
}
