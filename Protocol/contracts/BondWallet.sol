// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract BondWallet {

    enum BondState {Open, Closed}

    address payable public owner;
    address private bondFactory;
    uint public maxSubscription;
    uint public rate;
    uint public currentBalance;
    BondState private bondState;
    IERC20 paymentToken;
    
    constructor(address _owner, uint _maxSubscription, uint _rate, IERC20 _paymentToken) {
        owner = payable(_owner);
        bondFactory = msg.sender;
        maxSubscription = _maxSubscription;
        rate = _rate;
        currentBalance = 0;
        bondState = BondState.Open;
        paymentToken = _paymentToken;
    }

    modifier requireOwner(address _address) {
        require(_address == this.owner(), "You are not the owner");
        _;
    }

    modifier requireBondOpen() {
        require(bondState == BondState.Open, "Bond is closed");
        _;
    }

    modifier requireBondClosed() {
        require(bondState == BondState.Closed, "Bond is open");
        _;
    }

    modifier requireBondFactory() {
        require(msg.sender == bondFactory, "You are not calling from bond factory");
        _;
    }

    function changeMaxSubscription(uint _amount) public requireBondFactory() requireBondClosed() returns(uint) {
        require (currentBalance < _amount, "You have too much in this bond already");
        maxSubscription = _amount;
        return maxSubscription;
    }

    function changeRate(uint _newRate) public requireBondFactory() requireBondClosed() returns (uint) {
        rate = _newRate;
        return rate;
    }

    function getBalance() public view requireBondFactory() returns(uint) {
        return currentBalance;
    }

    function subscribeToBond(uint _subscriptionAmount) public payable requireBondFactory() requireBondOpen() {
        paymentToken.approve(msg.sender, _subscriptionAmount);
        paymentToken.transferFrom(msg.sender, address(this), _subscriptionAmount);
        currentBalance += _subscriptionAmount;
    }

    function withdraw(uint _amount, address _address) public requireBondFactory() requireBondClosed() {
        paymentToken.transfer(_address, _amount);
    }

    function closeBond(address _address) public  requireOwner(_address) requireBondFactory() requireBondOpen() {
        bondState = BondState.Closed;
    }

    function openBond(address _address) public  requireOwner(_address) requireBondFactory() {
        bondState = BondState.Open;
    }

    function deleteBond(address _address) public requireOwner(_address) requireBondFactory() requireBondClosed() {
        require(currentBalance == 0, "You cannot delete a bond with money inside");
        selfdestruct(owner);
    }
}