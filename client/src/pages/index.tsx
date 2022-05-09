import { useEffect, useState } from "react";

const Home = () => {
  const [imageId, setImageId] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageId(Math.floor(Math.random() * 10) + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center w-min">
        <h1 className="text-3xl text-center">Mint A Beautiful Eye NFT Now !</h1>
        <img
          src={`/images/${imageId}.png`}
          alt="Eye"
          className="w-96 max-w-[80vh] mt-10 rounded-lg"
        />

        <button className="w-full bg-[#a04edf] rounded-md mt-5 text-white py-3">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Home;
