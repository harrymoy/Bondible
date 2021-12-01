// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BondCertificate is ERC721, ERC721URIStorage {

    address private bondFactory;
    uint private subscriptionCount = 0;
    mapping(uint => uint) bondSubscriptions;

    constructor() ERC721("Bond Certificate", "BND") {
        bondFactory = msg.sender;
    }

    modifier requireBondFactory() {
        require(msg.sender == bondFactory, "You are not calling from bond factory");
        _;
    }

    function createBondCertificate(address _owner, uint _bondId) public 
        requireBondFactory()
    {
        _mint(_owner, _bondId);
    }

    function saveCertificate(string memory _tokenUri, uint _bondId) public
        requireBondFactory()
    {
        _setTokenURI(_bondId, _tokenUri);
    }

    function createSubscriptionCertificate(address _owner, uint _bondId) public
        requireBondFactory()
    {
        uint subscriptionId = subscriptionCount;
        subscriptionCount++;
        _mint(_owner, subscriptionId);
        bondSubscriptions[subscriptionId] = _bondId;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}