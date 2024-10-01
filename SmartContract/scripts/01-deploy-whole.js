const { writeAddresses } = require("../utils/addressManager");
const { ethers } = require("hardhat");

const ERC20_TOKEN_NAME = "Happy Token";
const ERC20_TOKEN_SYMBOL = "HP";

const ERC721A_TOKEN_NAME = "HappyNFT";
const ERC721A_TOKEN_SYMBOL = "HappyNFT";

const ERC1155_TOKEN_URI = "https://example.com/metadata/{id}.json";

async function main() {
  // const signer = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);

  const ERC20 = await ethers.getContractFactory("MyERC20");
  const tokenERC20 = await ERC20.deploy(ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL);
  await tokenERC20.waitForDeployment();

  const ERC721A = await ethers.getContractFactory("MyERC721A");
  const tokenERC721A = await ERC721A.deploy(
    ERC721A_TOKEN_NAME,
    ERC721A_TOKEN_SYMBOL
  );
  await tokenERC721A.waitForDeployment();

  const ERC1155 = await ethers.getContractFactory("MyERC1155");
  const tokenERC1155 = await ERC1155.deploy(ERC1155_TOKEN_URI);
  await tokenERC1155.waitForDeployment();

  const happybox = await ethers.getContractFactory("HappyBox");
  const HappyBox = await happybox.deploy(
    await tokenERC20.getAddress(),
    await tokenERC721A.getAddress(),
    await tokenERC1155.getAddress()
  );
  await HappyBox.waitForDeployment();

  const chainID = Number((await ethers.provider.getNetwork()).chainId);

  // console.log(chainID);
  // console.log(await tokenERC20.getAddress());
  // console.log(await tokenERC721A.getAddress());
  // console.log(await tokenERC1155.getAddress());
  // console.log(await HappyBox.getAddress());

  await writeAddresses(chainID, {
    DEPLOYED_CONTRACT_ERC20_ADDRESS: await tokenERC20.getAddress(),
    DEPLOYED_CONTRACT_ERC721A_ADDRESS: await tokenERC721A.getAddress(),
    DEPLOYED_CONTRACT_ERC1155_ADDRESS: await tokenERC1155.getAddress(),
    DEPLOYED_CONTRACT_HAPPYBOX_ADDRESS: await HappyBox.getAddress(),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
