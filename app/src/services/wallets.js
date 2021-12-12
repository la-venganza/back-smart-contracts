const ethers = require("ethers");
const idInUseError = require('../errors/idInUse');
const walletNotFound = require("../errors/walletNotFound");
const walletRepository = require("../repositories/wallet")

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async (userId) => {
  if (await walletRepository.getById(userId)){
    throw new idInUseError(userId);
  }
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
 const wallet = ethers.Wallet.createRandom().connect(provider);
  
  await(walletRepository.save(userId, wallet.address, wallet.privateKey));
  const result = {
    address: wallet.address
  };
  return result;
};

const getWalletsData = () => () => {
  return "?";
};

const getWalletData = () =>  async (userId) => {
  const wallet = await walletRepository.getById(userId)
  if (!wallet){
    throw new walletNotFound(userId);
  }

  const result = {
    id: userId,
    address: wallet.address
  };
  return result;
};

const getWallet = ({}) => async (userId) => {
  const wallet = await walletRepository.getById(userId)
  if (!wallet){
    throw new walletNotFound(userId);
  }
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new ethers.Wallet(wallet.privateKey, provider);
};


const getWalletBalance = () => async (userId) => {
  const wallet = await walletRepository.getById(userId)
  if (!wallet){
    throw new walletNotFound(userId);
  }
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const balance = await provider.getBalance( wallet.address);
  const result = {
    address :  wallet.address,
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
