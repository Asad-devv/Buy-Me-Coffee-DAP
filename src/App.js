import abi from "./contract/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import "./index.css";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("No Account connected");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xEaD51ecBA140f3779f21c78dDbA16cA169EBAB71";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          })

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({ provider, signer, contract });
          setAccount(accounts);
        } else {
          alert("Please install Metamask.")
        }
      } catch (err) {
        console.log(err);
      }
    };
    connectWallet();
  }, []);

  console.log(state);
  return (
    <div className="App">
      <Buy state={state} account={account} />
      <Toaster/>
    </div>
  );
}

export default App;
