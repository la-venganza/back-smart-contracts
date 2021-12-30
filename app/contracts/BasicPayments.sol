// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/Math.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

/**
    @title BasicPayments Contract
    @author Taller de programacion 2 - FIUBA - Ayudantes
    @notice This contract allows you to track payments made to it 
    @dev This is an academic contract made for didactic purposes. DO NOT USE THIS IN PRODUCTION
 */
contract BasicPayments is Ownable {
    using SafeMath for uint256;

    event PaymentMade(address indexed receiver, uint256 amount);
    event TeacherPayed(address indexed receiver, uint256 amount);
    event TeacherWithdraw(address indexed receiver, uint256 amount);
    event DepositMade(address indexed sender, uint256 amount);
    event WithdrawMade(uint256 amount);


    /**
        @notice Mapping of payments sent to an address
     */
    mapping(address => uint256) public sentPayments;

    mapping(address => uint256) public teacherAccounts;

    uint256 public commitedAmount;
    IERC20 public token;

    constructor(IERC20 stableToken) Ownable() {
        commitedAmount = 0;
        token = stableToken;
    }

    /**
        @notice Function to receive payments
        Emits DepositMade with the sender and the amount as a parameter
        Fails if value sent is 0
        @dev it calls an internal function that does this entirely
     */
    function deposit() external payable {
        _deposit(msg.sender, msg.value);
    }

    /**
        @notice Sends the specified amount to the specified address 
        Emits PaymentMade with the receiver and the amount as a parameter
        Fails if value sent is greater than the balance the contract has
        Can only extract from callers balance
        @dev updates sentPayments mapping
        @param reciever Address that will receive the payment
     */
    function teacherWithdraw(address payable reciever) external {
        uint256 amount = teacherAccounts[msg.sender];
        require(amount > 0, "cannot withdraw 0 weis");
        emit TeacherWithdraw(reciever, amount);
        teacherAccounts[msg.sender] = 0;
        commitedAmount = commitedAmount - amount;
        bool success = token.transfer(reciever, amount);
        require(success, "withdraw failed");
    }

    function withdraw(uint256 extractionAmount) external onlyOwner{
        require(getAvailableBalance() >= extractionAmount, "no enough funds");
        emit WithdrawMade(extractionAmount);
        bool success  = token.transfer(owner(), extractionAmount);
        require(success, "withdraw failed");
    }

    function payTeacher(address teacher, uint256 amount) external onlyOwner {
        require(getAvailableBalance() > amount, "not enough balance");
        require(amount > 0, "cannot send 0 weis");
        teacherAccounts[teacher] = teacherAccounts[teacher].add(amount);
        commitedAmount = commitedAmount + amount;
        emit TeacherPayed(teacher, amount);
    }

    function getTeacherBalance(address teacher) view public returns(uint256){
        return teacherAccounts[teacher];
    }
    function getAvailableBalance() view public returns(uint256){
        return token.balanceOf(address(this)) - commitedAmount;
    }

    /**
        @notice fallback function: acts in the same way that deposit does
     */
    receive() external payable {
        _deposit(msg.sender, msg.value);
    }

    /**
        @notice Function to receive payments
        Emits DepositMade with the sender and the amount as a parameter
        Fails if value sent is 0
        @dev it calls an internal function that does this entirely
     */
    function _deposit(address sender, uint256 amount) internal {
        require(amount > 0, "did not send any value");
        sentPayments[sender] = sentPayments[sender].add(amount);
        emit DepositMade(sender, amount);
    }
}
