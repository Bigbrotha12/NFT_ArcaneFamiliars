import { ethers } from "hardhat";

async function main() {

  const KeepersContract = await ethers.getContractFactory("Keepers");
  const keepers = await KeepersContract.deploy("Keepers NFT", "KPR", "");

  await keepers.deployed();

  console.log(
    `Contract deployed to ${keepers.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
