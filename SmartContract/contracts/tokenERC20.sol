// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {} // Truyền địa chỉ vào constructor của Ownable

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
        _approve(msg.sender, address(this), amount);
    }
}
