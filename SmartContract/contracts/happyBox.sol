// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./tokenERC20.sol";
import "./tokenERC721A.sol";
import "./tokenERC1155.sol";

contract HappyBox {
    
    event GiftCreated(
        uint256 indexed giftId,
        address indexed sender,
        address indexed recipient
    );

    enum AssetType {
        ERC20,
        ERC721,
        ERC1155
    }

    struct Gift {
        address sender;
        address recipient;
        AssetType assetType;
        address assetContract;
        uint256 tokenIdOrAmount;
        uint256 amount;
        bool isClaimed;
        string message;
    }

    mapping(uint256 => Gift) public gifts;

    MyERC20 public myERC20;
    MyERC721A public myERC721;
    MyERC1155 public myERC1155;

    constructor(address _myERC20, address _myERC721, address _myERC1155) {
        myERC20 = MyERC20(_myERC20);
        myERC721 = MyERC721A(_myERC721);
        myERC1155 = MyERC1155(_myERC1155);
    }

    modifier onlySender(uint256 giftId) {
        require(gifts[giftId].sender == msg.sender, "Not the sender!!!");
        _;
    }

    modifier onlyRecipient(uint256 giftId) {
        require(gifts[giftId].recipient == msg.sender, "Not the recipient!!!");
        _;
    }

    modifier giftExist(uint256 giftId) {
        require(gifts[giftId].sender != address(0), "Gift does not exist!!!");
        _;
    }

    modifier giftNotClaimed(uint256 giftId) {
        require(!gifts[giftId].isClaimed, "Gift is already claimed");
        _;
    }

    function createGift(
        address recipient,
        AssetType assetType,
        address assetContract,
        uint256 tokenIdOrAmount,
        uint256 amount,
        string memory message,
        bool mintNewToken
    ) external {
        require(recipient != address(0), "Invalid recipient address");

        if (mintNewToken) {
            // Mint new token
            if (assetType == AssetType.ERC20) {
                myERC20.mint(address(this), tokenIdOrAmount);
                assetContract = address(myERC20);
            } else if (assetType == AssetType.ERC721) {
                myERC721.mint(address(this), tokenIdOrAmount);
                assetContract = address(myERC721);
            } else if (assetType == AssetType.ERC1155) {
                myERC1155.mint(address(this), tokenIdOrAmount, amount, "");
                assetContract = address(myERC1155);
            } else {
                revert("Invalid asset type");
            }
        } else {
            // Kiểm tra quyền sở hữu token và thực hiện chuyển
            require(
                assetContract != address(0),
                "Invalid asset contract address!!"
            );

            if (assetType == AssetType.ERC20) {
                IERC20 token = IERC20(assetContract);

                // Kiểm tra quyền ủy quyền (allowance)
                uint256 allowance = token.allowance(msg.sender, address(this));
                require(
                    allowance >= amount,
                    "Not enough allowance for transfer"
                );

                // Kiểm tra số dư người gửi
                uint256 balance = token.balanceOf(msg.sender);
                require(balance >= amount, "Not enough balance");

                // Thực hiện chuyển token ERC20 từ người gửi sang hợp đồng
                require(
                    token.transferFrom(msg.sender, address(this), amount),
                    "ERC20 transfer failed!!!"
                );
            } else if (assetType == AssetType.ERC721) {
                IERC721 nft = IERC721(assetContract);

                // Kiểm tra chủ sở hữu NFT
                require(
                    nft.ownerOf(tokenIdOrAmount) == msg.sender,
                    "Sender does not own the NFT!!!"
                );

                // Kiểm tra ủy quyền cho NFT
                require(
                    nft.getApproved(tokenIdOrAmount) == address(this) ||
                        nft.isApprovedForAll(msg.sender, address(this)),
                    "Contract is not approved to transfer this NFT"
                );

                nft.transferFrom(msg.sender, address(this), tokenIdOrAmount);
            } else if (assetType == AssetType.ERC1155) {
                IERC1155 erc1155 = IERC1155(assetContract);

                // Kiểm tra số dư ERC1155 token
                require(
                    erc1155.balanceOf(msg.sender, tokenIdOrAmount) >= amount,
                    "Sender does not have enough ERC1155 tokens"
                );

                // Kiểm tra ủy quyền cho ERC1155
                require(
                    erc1155.isApprovedForAll(msg.sender, address(this)),
                    "Contract is not approved to transfer this ERC1155 token"
                );

                erc1155.safeTransferFrom(
                    msg.sender,
                    address(this),
                    tokenIdOrAmount,
                    amount,
                    ""
                );
            }
        }

        // Tạo ID bằng hash
        bytes32 giftHash = keccak256(
            abi.encodePacked(
                msg.sender,
                recipient,
                assetType,
                assetContract,
                tokenIdOrAmount,
                amount,
                message
            )
        );

        // Chuyển đổi bytes32 sang uint256
        uint256 giftId = uint256(giftHash);

        gifts[giftId] = Gift(
            msg.sender,
            recipient,
            assetType,
            assetContract,
            tokenIdOrAmount,
            amount,
            false,
            message
        );
        emit GiftCreated(giftId, msg.sender, recipient);
    }

    function claimGift(
        uint256 giftId
    ) external giftExist(giftId) onlyRecipient(giftId) giftNotClaimed(giftId) {
        Gift storage gift = gifts[giftId];
        gift.isClaimed = true;

        if (gift.assetType == AssetType.ERC20) {
            IERC20 token = IERC20(gift.assetContract);
            require(
                token.transfer(msg.sender, gift.tokenIdOrAmount),
                "ERC20 transfer faileed!!!"
            );
        } else if (gift.assetType == AssetType.ERC721) {
            IERC721 nft = IERC721(gift.assetContract);
            nft.transferFrom(address(this), msg.sender, gift.tokenIdOrAmount);
        } else if (gift.assetType == AssetType.ERC1155) {
            IERC1155 erc1155 = IERC1155(gift.assetContract);
            erc1155.safeTransferFrom(
                address(this),
                msg.sender,
                gift.tokenIdOrAmount,
                gift.amount,
                ""
            );
        }
    }

    function cancelGift(
        uint256 giftId
    ) external giftExist(giftId) onlySender(giftId) giftNotClaimed(giftId) {
        Gift storage gift = gifts[giftId];
        gift.isClaimed = true;

        if (gift.assetType == AssetType.ERC20) {
            IERC20 token = IERC20(gift.assetContract);
            require(
                token.transfer(msg.sender, gift.tokenIdOrAmount),
                "ERC20 transfer failed"
            );
        } else if (gift.assetType == AssetType.ERC721) {
            IERC721 nft = IERC721(gift.assetContract);
            nft.transferFrom(address(this), msg.sender, gift.tokenIdOrAmount);
        } else if (gift.assetType == AssetType.ERC1155) {
            IERC1155 erc1155 = IERC1155(gift.assetContract);
            erc1155.safeTransferFrom(
                address(this),
                msg.sender,
                gift.tokenIdOrAmount,
                gift.amount,
                " "
            );
        }
    }

    function getGift(
        uint256 giftId
    ) external view giftExist(giftId) returns (Gift memory) {
        return gifts[giftId];
    }
}
