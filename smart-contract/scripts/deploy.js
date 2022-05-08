const hre = require("hardhat");

async function main() {
  const BeautifulEyesNFT = await hre.ethers.getContractFactory(
    "BeautifulEyesNFT"
  );
  // Add the sale time as a parameter
  const beautifulEyesNFT = await BeautifulEyesNFT.deploy(1652017663);

  await beautifulEyesNFT.deployed();

  console.log("BeautifulEyesNFT deployed to:", beautifulEyesNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
