// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

 /**
    @title BondWallet
    @author Harry Moy, Sam Clusker
    @dev Smart contracts that represent bonds
    Copyright 2021 Harry Moy, Sam Clusker
  */
contract BondWallet {

    enum BondState {Open, Closed}

    address payable public owner;
    address private bondFactory;
    uint public maxSubscription;
    uint public rate;
    uint private currentBalance;
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

    /**
        Modifier which requires any function using it to be called by the owner of the bonds.
        @param _address: The address of the function caller, via the BondFactory.
     */   
    modifier requireOwner(address _address) {
        require(_address == this.owner(), "You are not the owner");
        _;
    }

    /**
        Modifier which requires any function using it to be for an open bond.
     */   
    modifier requireBondOpen() {
        require(bondState == BondState.Open, "Bond is closed");
        _;
    }
    /**
        Modifier which requires any function using it to be for a closed bond.
     */   
    modifier requireBondClosed() {
        require(bondState == BondState.Closed, "Bond is open");
        _;
    }
    /**
        Modifier which requires any function using it to be called by the Bond Factory.
     */   
    modifier requireBondFactory() {
        require(msg.sender == bondFactory, "You are not calling from bond factory");
        _;
    }

    /**
        A function which gets the balance for this smart contract
        @return the balance of the smart contract
     */   
    function getBalance() public view requireBondFactory() returns(uint) {
        return currentBalance;
    }

    /**
        A function which changes the maximum subscription for a closed bond
        @param _amount: The new maximum subscription amount.
        @return the new amount
     */   
    function changeMaxSubscription(uint _amount) public requireBondFactory() requireBondClosed() returns(uint) {
        require (currentBalance < _amount, "You have too much in this bond already");
        maxSubscription = _amount;
        return maxSubscription;
    }

    /**
        A function which changes the rate for a closed bond
        @param _newRate: The new rate for the bond.
        @return the new rate
     */   
    function changeRate(uint _newRate) public requireBondFactory() requireBondClosed() returns (uint) {
        rate = _newRate;
        return rate;
    }

    /**
        A function which subscribes the user to the bond
        @param _subscriptionAmount: The amount the user wishes to subscribe
        @param _subscriber: The address of the subscriber
     */   
    function subscribeToBond(uint _subscriptionAmount, address _subscriber) public payable requireBondFactory() requireBondOpen() {
        paymentToken.transferFrom(_subscriber, address(this), _subscriptionAmount);
        currentBalance += _subscriptionAmount;
    }

    /**
        A function which withdraws a selected amount from the bond
        @param _amount: The amount the user wishes to withdraw
        @param _address: The address of the withdrawer
     */   
    function withdraw(uint _amount, address _address) public requireBondFactory() requireBondClosed() {
        paymentToken.transferFrom(address(this) ,_address, _amount);
    }

    /**
        A function which closes the bond
     */   
    function closeBond(address _address) public requireOwner(_address) requireBondFactory() requireBondOpen() {
        bondState = BondState.Closed;
    }

    /**
        A function which opens the bond
     */
    function openBond(address _address) public requireOwner(_address) requireBondFactory() {
        bondState = BondState.Open;
    }

    /**
        A function which deletes the bond
     */
    function deleteBond(address _address) public requireOwner(_address) requireBondFactory() requireBondClosed() {
        require(currentBalance == 0, "You cannot delete a bond with money inside");
        selfdestruct(owner);
    }
}