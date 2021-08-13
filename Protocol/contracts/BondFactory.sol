// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {BondWallet} from './BondWallet.sol';

struct Subscriber {
        address payable subscriber;
        uint subscriptionValue;
        uint availableBalance;
 }

contract BondFactory {

    uint private bondCount = 1;
    mapping (uint => address) private bonds;
    mapping (uint => mapping(address => Subscriber)) private subscribers;
    IERC20 private paymentToken;
    
    event IssueBond (uint _bondId);
    event SubscribedToBond(uint _bondId, address _subscriber, uint _subscriptionValue);
    event Withdrawal(uint _bondId, address _subscriber, uint _amount);
    event BondStateChange(string _message);
    event SubscriptionChange(uint _subscription);
    event BondQuery(uint _currentBalance, uint _maxSubscription, uint _rate);
    event EmitAddressForApproval(address _bondAddress);
    
    constructor(address _tokenAddress) {
        paymentToken = IERC20(_tokenAddress);
    }

    function issueBond(uint _rate, uint _maxSubscription) public returns (address) {
        BondWallet bond = new BondWallet(msg.sender, _maxSubscription, _rate, paymentToken);
        bonds[bondCount] = address(bond);
        bondCount++;
        emit IssueBond(bondCount);
        return address(bond);
    }
    
    function emitAddress(address _address) private {
        emit EmitAddressForApproval(_address);
    }

    function subscribeToBond(uint _bondId, uint _subscriptionAmount) public payable {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint bondCurrentBalance = selectedBond.getBalance();
        uint bondMaxSubscription = selectedBond.maxSubscription();
        uint existingSubscriberValue = subscribers[_bondId][msg.sender].subscriptionValue;
        uint subscriptionValue = _subscriptionAmount * selectedBond.rate();

        assert(_subscriptionAmount + bondCurrentBalance < bondMaxSubscription);
        if (existingSubscriberValue > 0) {
            assert(existingSubscriberValue + _subscriptionAmount + bondCurrentBalance < bondMaxSubscription);
            subscribers[_bondId][msg.sender].subscriptionValue += subscriptionValue;
        } else {
            Subscriber memory subscriber = Subscriber(payable(msg.sender), subscriptionValue, 0);
            subscribers[_bondId][msg.sender] = subscriber;
        }
        emitAddress(address(selectedBond));
        selectedBond.subscribeToBond(_subscriptionAmount, msg.sender);
        emit SubscribedToBond(_bondId, msg.sender, subscriptionValue);
    }

    function withdraw(uint _bondId, uint _amount) public {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint bondCurrentBalance = selectedBond.getBalance();

        if (selectedBond.owner() == msg.sender) {
            require(selectedBond.owner() == msg.sender, "You are not the owner");
            require(_amount <= bondCurrentBalance, "You are trying to withdraw too much");
        } else {
            uint availableBalance = subscribers[_bondId][msg.sender].availableBalance; 
            require(availableBalance > 0 && availableBalance > _amount, "You have no balance to withdraw");
        }
        selectedBond.withdraw(_amount, msg.sender);
        emit Withdrawal(_bondId, msg.sender, _amount);
    }

    function closeBond(uint _bondId) public {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        selectedBond.closeBond(msg.sender);
        emit BondStateChange("Closed");
    }

    function openBond(uint _bondId) public {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        selectedBond.openBond(msg.sender);
        emit BondStateChange("Opened");
    }

    function deleteBond(uint _bondId) public {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        selectedBond.deleteBond(msg.sender);
        emit BondStateChange("Deleted");
    }

    function changeMaxSubscription(uint _bondId, uint _amount) public returns(uint)  {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint newMax = selectedBond.changeMaxSubscription(_amount);
        emit SubscriptionChange(newMax);
        return newMax;
    }

    function queryBondData(uint _bondId) public {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint bondCurrentBalance = selectedBond.getBalance();
        uint bondMaxSubscription = selectedBond.maxSubscription();
        uint bondCurrentRate = selectedBond.rate();
        emit BondQuery(bondCurrentBalance, bondMaxSubscription, bondCurrentRate);
    }
} 