const ethers = require("ethers");
const transactionError = require("../errors/transactionError")

const getContract = (config, wallet) => {
  console.log(config.contractAddress);
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const getERC20Contract = (config, wallet) => {
  console.log(wallet);
  console.log(config.contractAddress);
  return new ethers.Contract(config.ERC20ContractAddress, config.ERC20Abi, wallet);
};

const deposits = {};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const ERC20Contract = await getERC20Contract(config, senderWallet);
  // const tx = await ERC20Contract.transfer({
  //   _value: await ethers.utils.parseEther(amountToSend).toHexString(),
  //   _to: config.contractAddress,
  // });
  console.log("contract addres: " + config.contractAddress)
  const tx = await ERC20Contract.transfer(config.contractAddress, await ethers.utils.parseEther(amountToSend).toHexString())
  try{
    const receipt = await tx.wait(1);
    console.log("Transaction mined");
    const firstEvent = receipt && receipt.events && receipt.events[0];
    console.log(firstEvent);
    //really cant fail on this if transaction is mined.
    if (firstEvent && firstEvent.event == "DepositMade") {
      deposits[tx.hash] = {
        senderAddress: firstEvent.args.sender,
        amountSent: firstEvent.args.amount,
      };
    }
  }catch (error){
    const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
    const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
    console.error("reasons List");
    console.error(reasonsList);

    console.error("message");
    console.error(message);
    throw new transactionError(message, reasonsList)
  }

  return tx;
};


const payTeacher = ({ config }) => async (ownerWallet, teacherWallet, amountToSend) => {
  const basicPayments = await getContract(config,ownerWallet);
  const tx = await basicPayments.payTeacher(teacherWallet.address, await ethers.utils.parseEther(amountToSend).toHexString());
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "TeacherPayed") {
        //future save payment on database. for now its on contract.
      } else {
        console.error(`teacher not payed on ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};

const ownerWithdraw = ({ config }) => async (ownerWallet, amountToWithdraw) => {
  const basicPayments = await getContract(config, ownerWallet);
  const tx = await basicPayments.withdraw(await ethers.utils.parseEther(amountToWithdraw).toHexString());
  try{
    const receipt = await tx.wait(1);
    console.log("Transaction mined");
    const firstEvent = receipt && receipt.events && receipt.events[0];
    console.log(firstEvent);
    if (firstEvent && firstEvent.event == "WithdrawMade") {
      //nothing for now. 
    } else {
      console.error(`Withdraw failed on ${tx.hash}`);
    }
  }catch (error){
    const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
    const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
    console.error("reasons List");
    console.error(reasonsList);

    console.error("message");
    console.error(message);
    throw new transactionError(message, reasonsList)
  }
  
  return tx;
};


const teacherWithdraw = ({ config }) => async (teacherAccount,recieverAccount) => {
  const basicPayments = await getContract(config, teacherAccount);
  const tx = await basicPayments.teacherWithdraw(recieverAccount);
  try{
    const receipt = await tx.wait(1);
    console.log("Transaction mined");
    const firstEvent = receipt && receipt.events && receipt.events[0];
    console.log(firstEvent);
    if (firstEvent && firstEvent.event == "TeacherWithdraw") {
      //nothing for now. 
    } else {
      console.error(`Withdraw failed on ${tx.hash}`);
    }
  }catch (error){
    const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
    const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
    console.error("reasons List");
    console.error(reasonsList);

    console.error("message");
    console.error(message);
    throw new transactionError(message, reasonsList)
  }
  return tx;
};

const getTeacherBalance = ({ config }) => async (teacherAccount) => {
  const basicPayments = await getContract(config, teacherAccount);
  const balance = await basicPayments.getTeacherBalance(teacherAccount.address);
  return {balance: ethers.utils.formatEther(balance)};
};

const getAvailableBalance = ({ config }) => async (ownerWallet) => {
  const basicPayments = await getContract(config, ownerWallet);
  const balance = await basicPayments.getAvailableBalance();
  return {balance: ethers.utils.formatEther(balance)};
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return deposits[depositTxHash];
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  payTeacher: payTeacher(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  ownerWithdraw: ownerWithdraw(dependencies),
  teacherWithdraw: teacherWithdraw(dependencies),
  getTeacherBalance: getTeacherBalance(dependencies),
  getAvailableBalance: getAvailableBalance(dependencies),
  getERC20Contract
});
