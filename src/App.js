import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';



function ConncectToBlockchain() {
  let web3 = new Web3(Web3.givenProvider);

  const address = "0xd698b5777930380611339D302b7828724Aa8F89d";
  const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amt",
        "type": "int256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amt",
        "type": "int256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
]

  let contract = new web3.eth.Contract(abi, address);
  // console.log(contract)
  return contract;
}

async function getAccounts(){
  let web3 = new Web3(Web3.givenProvider);
  let accounts  = await web3.eth.getAccounts()
  return accounts
}

function App() {
  const [bal, setBal] = useState(0)
  const [actionType, setActionType] = useState('Deposit')
  const [account, setAccount] = useState(1)

  const [amount, setAmount] = useState(0)
  // const [contract, setContract] = useState([])
  let contract = ConncectToBlockchain()
  function action(actionType) {
    setActionType(actionType)
  }
  function handleAmountChange(e){
    setAmount(e.target.value)
  }

  function getBankBalance() {
    contract.methods.getBalance().call().then(function (bal) {
      console.log(bal)
      setBal(bal)
    })
  }
  function trasnaction(){
    if(actionType === 'Deposit'){

     // let web3 = new Web3(Web3.givenProvider);
     let acc = account
     contract.methods.deposit(amount).send({from: acc}).then(res => {
      console.log(res)
      getBankBalance()
      setAmount(0)
     })
    }

    if(actionType === 'Withdraw'){

     let web3 = new Web3(Web3.givenProvider);

    web3.eth.getAccounts().then(accs => {
        setAccount(accs[0])
      })
      console.log(account)
     let acc = account
     contract.methods.withdraw(amount).send({from: acc}).then(res => {
      console.log(res)
      getBankBalance()
      setAmount(0)
     })
    }
  }

  useEffect(() => {
    // Update the document title using the browser API

    // setContract(contract)
    contract.methods.getBalance().call().then(function (bal) {
      // console.log(bal)
      setBal(bal)
    })
    getAccounts().then((accounts) => {
      setAccount(accounts[0])
    })
  });

  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card text-center">
          <div className="card-header">
            You Account
          </div>
          <div className="card-body ">
            <h5 className="card-title">Bank Of ETH</h5>
            <p className="card-text">A complete <samp>decentralized</samp> bank</p>
            <div className="card text-dark bg-light mb-3 container" style={{ width: "18rem" }}>

              <div className="card-body">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-outline-danger btn-sm" type="button" onClick={getBankBalance}><i className="fa fa-refresh" aria-hidden="true" /></button>
                </div>
                <h5 className="card-title">Your Balance</h5>
                <h3 className="card-text">${bal}</h3>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">

              <button type="button" className="btn btn-outline-warning btn-lg ml-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onClick={(e) => action('Withdraw')}>Withdraw <i className="fa fa-money"></i></button>
              <button type="button" className="btn btn-outline-dark btn-lg mr-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onClick={(e) => action('Deposit')}>Deposit <i className="fa fa-plus-square" aria-hidden="true"></i></button>
              <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                  <h5 id="offcanvasTopLabel">Bank Of ETH - {actionType}</h5>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <form className="row g-3 justify-content-center">
                    <div className="col-auto">
                      <label htmlFor="staticEmail2" className="">Current Balance</label>
                      <input type="text" readOnly className="form-control-plaintext" id="staticEmail2" value={bal} />
                    </div>
                    <div className="col-auto">
                      <label htmlFor="inputAmount" className="">Amount</label>
                      <input type="number" className="form-control" id="inputAmount" placeholder="Amount" value={amount} onChange={(e) => handleAmountChange(e)} />
                    </div>
                    <div className="col-auto">

                       <button className="btn btn-primary" type="button" onClick={trasnaction} >{actionType}</button>
                      </div>
                     
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            Account No. : {account}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
