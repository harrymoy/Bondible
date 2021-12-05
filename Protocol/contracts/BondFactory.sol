// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {BondWallet} from './BondWallet.sol';
import {BondCertificate} from './BondCertificate.sol';

struct Subscriber {
        address payable subscriber;
        uint subscriptionValue;
        uint availableBalance;
 }

 /**
    @title BondFactory
    @author Harry Moy, Sam Clusker
    @dev Contract used to create and call Bond Wallets
    Copyright 2021 Harry Moy, Sam Clusker
  */
contract BondFactory {

    uint private bondCount = 1;
    mapping (uint => address) private bonds;
    mapping (uint => mapping(address => Subscriber)) private subscribers;
    IERC20 private paymentToken;
    BondCertificate public bondCertificate;
    
    event IssueBond (uint _bondId);
    event SubscribedToBond(address _bond, address _subscriber, uint _subscriptionValue);
    event Withdrawal(uint _bondId, address _subscriber, uint _amount);
    event SubscriptionChange(uint _subscription);
    event RateChange(uint _newRate);
    event ErrorHandler(string reason);
    
    //Instantiate the contract with the Dai token address.
    constructor(address _tokenAddress) {
        paymentToken = IERC20(_tokenAddress);
        bondCertificate = new BondCertificate();
    }

                                                        ///////////////////////////////////// Function Calls /////////////////////////////////////

    /**
        Issue the bond and create a BondWallet contract.
        @param _rate: The rate the bond is issued at.
        @param _maxSubscription: The amount the user is looking to raise.
     */                                     
    function issueBond(uint _rate, uint _maxSubscription) public returns (address, uint) {
        BondWallet bond = new BondWallet(msg.sender, _maxSubscription, _rate, paymentToken);
        bonds[bondCount] = address(bond);
        uint bondId = bondCount;
        emit IssueBond(bondId);
        bondCertificate.createBondCertificate(msg.sender, bondId);
        bondCount++;
        return (address(bond), bondId);
    }

    function saveCertificate(uint _bondId, string memory _tokenUri) public
        returns (bool)
    {
        bondCertificate.saveCertificate(_tokenUri, _bondId);
        return true;
    }

    /**
        Emits the address for a selected bond so the .approve() can be called at Dai's address with the selected bond's address.
        @param _bondId: The Id for a specific bond.
     */    
    function requestApprovalForBond(uint _bondId) public view returns(address) {
        address bondAddress = bonds[_bondId];
        return bondAddress;
    }

    /**
        Subscribes a user to a selected bond. Performs checks that whether the user is already subscribed and if the amount they're subscribing is greater than max subscription.
        @param _bondId: The Id for a specific bond.
        @param _subscriptionAmount: The amount they want to subscribe with.
     */    
    function subscribeToBond(uint _bondId, uint _subscriptionAmount) public 
        payable
    {
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

        selectedBond.subscribeToBond(_subscriptionAmount, msg.sender);
        emit SubscribedToBond(address(selectedBond), msg.sender, subscriptionValue);
    }

    /**
        Checks if the user has sufficient funds to withdraw and withdraws that amount.
        @param _bondId: The Id for a specific bond.
        @param _amount: The amount they wish to withdraw.
     */    
    function withdraw(uint _bondId, uint _amount) public returns(bool) {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint bondCurrentBalance = selectedBond.getBalance();

        if (selectedBond.owner() == msg.sender) {
            require(selectedBond.owner() == msg.sender, "You are not the owner");
            require(_amount <= bondCurrentBalance, "You are trying to withdraw too much");
        } else {
            uint availableBalance = subscribers[_bondId][msg.sender].availableBalance; 
            require(availableBalance > 0 && availableBalance > _amount, "You have no balance to withdraw");
        }
        try selectedBond.withdraw(_amount, msg.sender) {
            emit Withdrawal(_bondId, msg.sender, _amount);
            return true;
         } catch Error(string memory reason)  {
            emit ErrorHandler(reason);
            return false;
        }
    }
    
    /**
        Closes the bond so it cannot receive any more subscriptions if user is the owner.
        @param _bondId: The Id for a specific bond.
     */    
    function closeBond(uint _bondId) public returns (bool) {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        try selectedBond.closeBond(msg.sender) {
            return true;
        } catch Error(string memory reason)  {
            emit ErrorHandler(reason);
            return false;
        }
    }

    /**
        Opens the bond so it can receive subscriptions if the user is the owner.
        @param _bondId: The Id for a specific bond.
     */
    function openBond(uint _bondId) public returns(bool) {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        try selectedBond.openBond(msg.sender) {
            return true;
        } catch Error(string memory reason)  {
            emit ErrorHandler(reason);
            return false;
        }
    }

    /**
        Deletes the bond if the user is the owner.
        @param _bondId: The Id for a specific bond.
     */
    function deleteBond(uint _bondId) public returns (bool) {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        try selectedBond.deleteBond(msg.sender) {
            return true;
        } catch Error(string memory reason)  {
            emit ErrorHandler(reason);
            return false;
        }
    }

    /**
        Changes the maximum subscription if the user is the owner.
        @param _bondId: The Id for a specific bond.
        @param _amount: The amount they wish to change the max subscription to.
     */
    function changeMaxSubscription(uint _bondId, uint _amount) public returns(uint)  {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint newMax = selectedBond.changeMaxSubscription(_amount);
        return newMax;
    }
    
    /**
        Changes the rate if the user is the owner.
        @param _bondId: The Id for a specific bond.
        @param _newRate: The new rate they wish to apply.
     */
    function changeRate(uint _bondId, uint _newRate) public returns(uint) {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        uint newRate = selectedBond.changeRate(_newRate);
        return newRate;
    }

     /**
        Queries the selected bond's data.
        @param _bondId: The Id for a specific bond.
     */
    function queryBondData(uint _bondId) public view returns(BondWallet) {
        BondWallet selectedBond = BondWallet(bonds[_bondId]);
        return selectedBond;
    }
} 