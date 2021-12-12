const ethers = require("ethers");
const accounts = {};
const idInUseError = require('../errors/idInUse');
const walletNotFound = require("../errors/walletNotFound");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async (userId) => {
  if (accounts.hasOwnProperty(userId)){
    throw new idInUseError(userId);
  }
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  console.log("is not in accounts")

  accounts[userId] = {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
  const result = {
    id: userId,
    address: wallet.address,
  };
  return result;
};

const getWalletsData = () => () => {
  return accounts;
};

const getWalletData = () => userId => {
  console.log(userId);
  if (!accounts.hasOwnProperty(userId)){
    throw new walletNotFound(userId);
  }
  const result = {
    id: userId,
    address:   accounts[userId].address
  };
  return result;
};

const getWallet = ({}) => userId => {
  console.log(userId);

  if (!accounts.hasOwnProperty(userId)){
    console.log(userId);

    throw new walletNotFound(userId);
  }
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new ethers.Wallet(accounts[userId].privateKey, provider);
};


const getWalletBalance = () => async (userId) => {
  console.log(userId)
  if (!accounts.hasOwnProperty(userId)){
    throw new walletNotFound(userId);
  }
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const balance = await provider.getBalance( accounts[userId].address);
  const result = {
    address :  accounts[userId].address,
    balance : ethers.utils.formatEther(balance)
  }
  return result;
};


module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getWalletBalance: getWalletBalance({ config }),

});
