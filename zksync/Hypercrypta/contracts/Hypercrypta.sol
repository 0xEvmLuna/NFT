// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hypercrypta is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Address for address payable;
    uint256 private _totalSupply;

    Counters.Counter private _tokenIdCounter;
    uint256 public constant maxSupply = 10000;
    uint256 public constant maxWalletAmount = 100;
    uint256 public constant maxMintAmount = 10;

    constructor() ERC721("Hypercrypta", "Hypercrypta") {}

    receive() external payable {}
    // Modifier Ensure that the caller is a real user
    modifier callerIsUers() {
        require(msg.sender == tx.origin, "The caller is not the user");
        _;
    }

    function freeMint(address to, uint256 quantity) public callerIsUers nonReentrant {
        require(totalSupply() + quantity <= maxSupply, "The maximum quantity of mint has already been exceeded");
        require(quantity <= maxMintAmount, "The quantity has exceeded that of mint");
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(to, newTokenId);
        _tokenIdCounter.increment();
        _totalSupply++;
    }

    function withdraw() external onlyOwner nonReentrant {
        uint balance = address(this).balance;
        payable(_msgSender()).sendValue(balance);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
}
