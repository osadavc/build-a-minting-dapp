const hre = require("hardhat");

async function main() {
  const BeautifulEyesNFT = await hre.ethers.getContractFactory(
    "BeautifulEyesNFT"
  );
  const beautifulEyesNFT = await BeautifulEyesNFT.deploy("Hello, Hardhat!");

  await beautifulEyesNFT.deployed();

  console.log("BeautifulEyesNFT deployed to:", beautifulEyesNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
