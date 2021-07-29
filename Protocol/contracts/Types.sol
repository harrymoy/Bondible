// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import {BondWallet} from './BondWallet.sol';

struct Bond {
        BondWallet bondWallet;
        uint bondId;
}

struct Subscriber {
        address payable subscriber;
        uint subscriptionValue;
        uint availableBalance;
 }
