// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BondCertificate is ERC721, ERC721URIStorage {

    constructor(string memory _tokenUri, uint _bondId, address _owner) ERC721("Bond Certificate", "BND") {
        createBondCertificate(_tokenUri, _bondId, _owner);
    }

    function createBondCertificate(string memory _tokenUri, uint _bondId, address _owner) private returns (bool) {
        _mint(_owner, _bondId);
        _setTokenURI(_bondId, _tokenUri);
        return true;
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