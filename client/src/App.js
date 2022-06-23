import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import "./assets/css/style.css";
import logo from "./assets/images/maple-leaf.png";

function App() {
  const [balance, setBalance] = useState();
  const [id, setId] = useState('NONE');
  const [amountValue, setAmountValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [proposalIdValue, setProposalIdValue] = useState('');
  const [proposalIdToFundValue, setProposalIdToFundValue] = useState('');
  const [amountToFundValue, setAmountToFundValue] = useState('');
  const [withdrawIdValue, setWithdrawValue] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = "0xEBe7F3b9C3E96B8C1C573dE231167AfbDf862B4e";

  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "FUNDME_NOTRECEIVER",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FUNDME_TRANSACTIONFAILED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FUNDME__PROPOSALFUNDED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FUNDME__PROPOSALNOTFOUND",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "proposalCompleted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "FundProposal",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getProposal",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "donatedAmount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "enum Fundraiser.ProposalStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct Fundraiser.Proposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "newProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "s_proposalId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "variable",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, ABI, signer);

  useEffect(() => {

    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    }

    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddress);
      const balanceFormatted = ethers.utils.formatEther(balance);
      setBalance(balanceFormatted);
    }

    connectWallet()
      .catch(console.error);

    getBalance()
      .catch(console.error);

  })

  const handleAmountChange = (e) => {
    setAmountValue(e.target.value);
  }

  const handleAddressChange = (e) => {
    setAddressValue(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  }

  const handleProposalIdChange = (e) => {
    setProposalIdValue(e.target.value);
  }

  const handleProposalIdToFundChange = (e) => {
    setProposalIdToFundValue(e.target.value);
  }

  const handleAmountToFundChange = (e) => {
    setAmountToFundValue(e.target.value);
  }

  const handleWithdrawChange = (e) => {
    setWithdrawValue(e.target.value);
  }


  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    const ethValue = ethers.utils.parseEther(amountValue);
    const proposal = await contract.newProposal(ethValue, addressValue, descriptionValue);
    await proposal.wait();
    setAmountValue('');
    setAddressValue('');
    setDescriptionValue('');
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await contract.getProposal(proposalIdValue);
    // await search.wait();
    setProposalIdValue('')
    const balance = await provider.getBalance(contractAddress);
    const balanceFormatted = ethers.utils.formatEther(balance);
    setBalance(balanceFormatted);
    setId(proposalIdValue);
  }

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    const donated = await contract.FundProposal(proposalIdToFundValue, { value: amountToFundValue });
    await donated.wait();
    setProposalIdToFundValue('');
    const balance = await provider.getBalance(contractAddress);
    const balanceFormatted = ethers.utils.formatEther(balance);
    setBalance(balanceFormatted);
    setId(proposalIdToFundValue);
    setAmountToFundValue('');
  }

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    const withdraw = await contract.withdraw(withdrawIdValue);
    await withdraw.wait();
    const balance = await provider.getBalance(contractAddress);
    const balanceFormatted = ethers.utils.formatEther(balance);
    setBalance(balanceFormatted);
    setId(withdrawIdValue);
    setWithdrawValue('');
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light nav-bar fixed-top bg-light">
        <a href="/" className="navbar-brand" >
          <img src={logo} alt="LOGO" width={40} height={40} />
          <span className="brand-name">Fundraiser</span>
        </a>
        <div className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a className="me-3 py-2 text-dark text-decoration-none" href='#raise'>Raise</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href='#donate'>Donate</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href='#withdraw'>Withdraw</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href='#search'>Search</a>
        </div>
      </nav>

      <section id='raise'>
        <div className='form-raise '>
          <div className="center-align">
            <span className="new-proposal-heading">Create A New Proposal</span>
          </div>
          <div className="card-body">
            <form className="p-3 bg-light" onSubmit={handleProposalSubmit}>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" placeholder="0" onChange={handleAmountChange} value={amountValue} />
              </div>
              <div className="mb-3">
                <label className="form-label">Account Address</label>
                <input type="text" className="form-control" onChange={handleAddressChange} value={addressValue} />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" rows="6" cols="50" onChange={handleDescriptionChange} value={descriptionValue} />
              </div>
              <button type="submit" className="btn btn-outline-primary">Create Proposal</button>
            </form>
          </div>
        </div>
      </section>

      <section id='donate'>
        <div className='form-donate mt-5'>
          <div className="center-align">
            <span className="new-proposal-heading">Donate</span>
          </div>
          <div className="card-body">
          <form className="p-3 bg-light" onSubmit={handleDonateSubmit}>
            <div className="mb-3">
              <label className="form-label">Proposal ID</label>
              <input type="number" className="form-control" onChange={handleProposalIdToFundChange} value={proposalIdToFundValue} />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input type="number" className="form-control" onChange={handleAmountToFundChange} value={amountToFundValue} />
            </div>
            <button type="submit" className="btn btn-outline-dark">Donate</button>
          </form>
          </div>
        </div>
      </section>

      <section id='withdraw'>
        <div className='form-withdraw mt-5'>
          <div className="center-align">
            <span className="new-proposal-heading">Withdraw</span>
          </div>
          <div className="card-body">
          <form className="p-3 bg-light" onSubmit={handleWithdrawSubmit}>
            <p className="lead">Enter Proposal ID</p>
            <div className="mb-3">
              <input type="number" className="form-control" onChange={handleWithdrawChange} value={withdrawIdValue} />
            </div>
            <button type="submit" className="btn btn-outline-success">Withdraw</button>
          </form>
          </div>
        </div>
      </section>

      <section id='search'>
        <div className='form-withdraw mt-5'>
          <div className="center-align">
            <span className="new-proposal-heading">Get Proposal Details</span>
          </div>
          <div className="card-body">
          <h3><small className="text-muted">Proposal ID: {id}</small></h3>
          <h3><small className="text-muted"> Contract Balance: {balance} CELO</small></h3>
          <form className="mt-5 p-3 bg-light" onSubmit={handleSearchSubmit}>
            <p className="lead">Search Proposals By ID</p>
            <div className="mb-3">
              <input type="number" className="form-control" onChange={handleProposalIdChange} value={proposalIdValue} />
            </div>
            <button type="submit" className="btn btn-outline-success">Search</button>
          </form>
          </div>
        </div>
      </section>

      <section id="footer">
        <div>
        CELO Hackathon @ 2022
        </div>
      </section>

    </>
  );
}

export default App;
