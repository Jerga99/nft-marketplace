// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftMarket is ERC721URIStorage {
  constructor() ERC721("CreaturesNFT", "CNFT") {}
}
