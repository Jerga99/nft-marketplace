// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;


  constructor() ERC721("CreaturesNFT", "CNFT") {}

  function mintToken(string memory tokenURI) public payable returns (uint) {
    _tokenIds.increment();
    _listedItems.increment();

    uint newTokenId = _tokenIds.current();

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);

    return newTokenId;
  }

}
