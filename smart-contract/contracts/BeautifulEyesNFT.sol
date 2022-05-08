// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BeautifulEyesNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    uint256 public saleTimeStamp;

    string public notRevealedMetadata =
        "ipfs://QmWX1bxTYxMtgsnZQA1PwWkVZtM9ZYGfJMsLUBgzPsp1MK";
    bool public isRevealed = false;

    Counters.Counter private _tokenIdCounter;

    constructor(uint256 _saleTimeStamp) ERC721("BeautifulEyesNFT", "BEN") {
        saleTimeStamp = _saleTimeStamp;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmZ5WxKWrL7fMFnQpbHcDDGhSA42PPwQiMXL7guB4v6wJd/";
    }

    function mint(address to) public payable {
        require(saleTimeStamp < block.timestamp, "Sale has not started yet");
        require(msg.value >= 0.005 ether, "Not Enough ETH");

        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();

        _mint(to, newItemId);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        if (isRevealed == false) {
            return notRevealedMetadata;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        uintToString(_tokenId),
                        ".json"
                    )
                )
                : "";
    }

    // utils

    function uintToString(uint256 _i)
        internal
        pure
        returns (string memory str)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        str = string(bstr);
    }

    // setters

    function setSaleTimeStamp(uint256 _saleTimeStamp) public onlyOwner {
        saleTimeStamp = _saleTimeStamp;
    }

    function setIsRevealed(bool _isRevealed) public onlyOwner {
        isRevealed = _isRevealed;
    }
}
