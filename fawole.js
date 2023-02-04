//the purpose of this file is to contain a web3 instance. A web3 instance is needed to communicate with solidity
//1. require web3
const Web3 = require("web3");

//2. connect to ganache using rpc
const web3 = new Web3("HTTP://127.0.0.1:7545");

//to connect to smart contract, we need abi and address
//3. get the abi from your contract by going to the directory where the abi of the contract is
const myContract = require("../build/contracts/so.json");

//4. get the contract address so as to connect smart contract by getting the network id. To get the network id, we have to use the "await" keyword, then wrap the whole code in async and return the variable async is saved in after where the await ends
const init = async() => {
    const id = await web3.eth.net.getId();

//5. input the id into networks by going into the json file that we've saved under myContract. The id is in networks that's in the json file
const deployedNetwork = myContract.networks[id];



//6. connect to smart contract
const contract = new web3.eth.Contract(myContract.abi, deployedNetwork.address);


//to read data from blockchain, call api is used. methods.the name of the function in the contract. To get the value of the function.
const read = await contract.methods.getData().call();
console.log(read);

//to define the account the value will come from. getAccounts() is an in-built function. getAccount() gets all the accounts in the ganache
const accounts = await web3.eth.getAccounts();

//to update data. send api is used. Send takes in where the value is coming from. Choose the 1 account you want to use to perform the transaction.
const Send = await contract.methods.setData(50).send({ from: accounts[0] });

//to know the current value after updating the data
const readAgain = await contract.methods.getData().call();
}

init();


