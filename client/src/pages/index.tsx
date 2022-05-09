import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useNetwork,
  useContractWrite,
  chain,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import contractInterface from "../lib/BeautifulEyesNFT.json";

const Home = () => {
  const [imageId, setImageId] = useState(1);
  const [buttonMessage, setButtonMessage] = useState("Mint NFT");

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { activeChain, switchNetworkAsync } = useNetwork();
  const { data: account } = useAccount();

  const { writeAsync } = useContractWrite(
    {
      addressOrName: "0x40ac75b32e02bcb48e24c7a2061b399446157f14",
      contractInterface: contractInterface.abi,
    },
    "mint",
    {
      args: [account?.address],
      overrides: {
        gasLimit: 3000000,
        value: ethers.utils.parseEther("0.005"),
      },
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setImageId(Math.floor(Math.random() * 10) + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    switchNetworks();
  }, [account]);

  useEffect(() => {
    switchNetworks();
  }, [activeChain?.id]);

  const switchNetworks = async () => {
    if (account && activeChain?.id != chain.rinkeby.id && switchNetworkAsync) {
      setButtonMessage("Switching Network...");
      await switchNetworkAsync(chain.rinkeby.id);
      setButtonMessage("Mint NFT");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center w-min">
        <h1 className="text-3xl text-center">Mint A Beautiful Eye NFT Now !</h1>
        <img
          src={`/images/${imageId}.png`}
          alt="Eye"
          className="w-96 max-w-[80vh] mt-10 rounded-lg"
        />

        {!account ? (
          <button
            className="w-full bg-[#a04edf] rounded-md mt-5 text-white py-3"
            onClick={() => {
              connect();
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            className="w-full bg-[#a04edf] rounded-md mt-5 text-white py-3 animate-pulse disabled:bg-[#a04edf]/30 disabled:animate-none disabled:cursor-none"
            disabled={buttonMessage != "Mint NFT"}
            onClick={async () => {
              setButtonMessage("Minting...");
              await writeAsync();
              setButtonMessage("Check Your NFT On Opensea 🎉");
            }}
          >
            {buttonMessage}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
