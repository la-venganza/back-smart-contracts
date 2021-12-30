require("dotenv").config();
const network = "kovan";
const deployArtifact = require(`../deployments/${network}/BasicPayments`);
const deployerMnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;
const ERC20InterfaceAbi = require(`./utils/ERC20/dai`);
const ERC20ContractAddress = process.env.ERC20_ADDRESS;
console.log(deployerMnemonic);
module.exports = {
  contractAddress: deployArtifact.address,
  contractAbi: deployArtifact.abi,
  ERC20Abi : ERC20InterfaceAbi.abi,
  ERC20ContractAddress,
  deployerMnemonic,
  infuraApiKey,
  network,
};
