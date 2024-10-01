// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract MyERC721A is ERC721A {
    constructor(
        string memory name,
        string memory symbol
    ) ERC721A(name, symbol) {} // Truyền địa chỉ vào constructor của Ownable

    // Mint nhiều NFT với chi phí gas tối ưu
    function mint(address to, uint256 quantity) public {
        _safeMint(to, quantity);
    }
}
