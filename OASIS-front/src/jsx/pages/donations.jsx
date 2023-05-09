import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { ABI } from "../../contracts/abi";
const Donations = () => {
  // Initialize web3 using Metamask provider

  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const loadContract = async () => {
    // const contractABI = await require("../../contracts/Donations.json");

    const contractAddress = "0xCd7D2B39a094278B570010d99e10A380a8C7cc05";
    const myContract = new web3.eth.Contract(ABI, contractAddress);

    return myContract;
  };

  const getContractData = async () => {
    const myContract = await loadContract();
    const data = await myContract.methods;
    return data;
  };

  // This function detects most providers injected at window.ethereum.
  const [contractListened, setContractListened] = useState();

  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });

  // useEffect(() => {

  // }, []);

  const makeContract = async () => {
    if (contractInfo.address === "-") {
      const contractAddress = "0x0dD931Dae44Cc79C098CEA6F6fE1d3a3E38d59C3";
      console.log(ABI);

      const contract = new ethers.Contract(
        contractAddress,
        ABI,
        provider.getSigner()
      );
      console.log(contract);
      // Call the function on the contract
      const amount = ethers.utils.parseEther("0.1");
      const options = {
        gasPrice: ethers.utils.parseUnits("1000000000", "wei"),
        gasLimit: ethers.utils.parseUnits("1000000", "wei"),
      };
      await contract
        .addDonation(
          123,
          "test",
          amount,
          "0x96252D3F03e0cb89FBe18591EC21fBb9E8b988d6",
          options
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
      await contract.totalDonations().then((res) => {
        console.log(res.toNumber());
      });
      await contract.signDonation(4).then((res) => {
        toast.success("Donation signed");
        console.log(res);
      });
      // Wait for the transaction to be mined
      // const receipt = await tx.wait();
      // console.log(receipt);
      // return receipt;
    }
  };
  // This returns the provider, or null if it wasn't detected.

  if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    startApp(provider); // initialize your app
  } else {
    console.log("Please install MetaMask!");
  }

  function startApp(provider) {
    // If the provider returned by detectEthereumProvider isn't the same as
    // window.ethereum, something is overwriting it – perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
  }

  // Get user account from Metamask
  const getAccount = async () => {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
          toast.error("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    toast.success("Connected to MetaMask.");
    console.log(account);
  };

  // Get user account balance from Metamask
  const getBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(balance);
  };

  // send transaction
  const sendTransaction = async () => {
    const accounts = await web3.eth.getAccounts();
    const tx = await web3.eth.sendTransaction({
      from: accounts[0],
      to: "0xcE2147aAA1f1D302DB1eFaF4834D6A4cAf68c8F1",
      value: web3.utils.toWei("1", "ether"),
    });
    console.log(tx);
  };
  return (
    <div>
      <button onClick={getAccount}>Get Account</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={sendTransaction}>Send Transaction</button>
      <button onClick={makeContract}>Load Contract</button>
    </div>
  );
};

export default Donations;
