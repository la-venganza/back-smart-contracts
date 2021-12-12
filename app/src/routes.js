const getWalletData = require("./handlers/wallet/getWalletHandler");
const getWalletsData = require("./handlers/wallet/getWalletsHandler");
const createWallet = require("./handlers/wallet/createWalletHandler");
const createDeposit = require("./handlers/deposit/createDepositHandler");
const getWalletBalance = require("./handlers/wallet/getWalletBalanceHandler");
const getTeacherBalance = require("./handlers/contract/getTeacherBalanceHandler");
const getAvailableBalance = require("./handlers/contract/getAvailableBalanceHandler");

const teacherWithdraw = require("./handlers/contract/teacherWithdrawHandler");
const ownerWithdraw = require("./handlers/contract/ownerWithdrawHandler");

const payTeacher = require("./handlers/contract/payTeacherHandler");
const getDeposit = require("./handlers/deposit/getDepositHandler");

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function getWalletBalanceroute({ services, config }) {
  return {
    method: "GET",
    url: "/balance/:userId",
    schema: getWalletBalance.schema(config),
    handler: getWalletBalance.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet/:userId",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function payTeacherRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payTeacher",
    schema: payTeacher.schema(config),
    handler: payTeacher.handler({ config, ...services }),
  };
}

function getTeacherBalanceRoute({ services, config }) {
  return {
    method: "GET",
    url: "/teacherBalance/:teacherId",
    schema: getTeacherBalance.schema(config),
    handler: getTeacherBalance.handler({ config, ...services }),
  };
}

function getAvailableBalanceRoute({ services, config }) {
  return {
    method: "GET",
    url: "/availableBalance",
    schema: getAvailableBalance.schema(config),
    handler: getAvailableBalance.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

function teacherWithdrawRoute({ services, config }) {
  return {
    method: "POST",
    url: "/teacherWithdraw",
    schema: teacherWithdraw.schema(config),
    handler: teacherWithdraw.handler({ config, ...services }),
  };
}

function ownerWithdrawRoute({ services, config }) {
  return {
    method: "POST",
    url: "/ownerWithdraw",
    schema: ownerWithdraw.schema(config),
    handler: ownerWithdraw.handler({ config, ...services }),
  };
}

module.exports = [getWalletDataRoute, ownerWithdrawRoute, getAvailableBalanceRoute, getWalletsDataRoute,teacherWithdrawRoute , getWalletBalanceroute, createWalletRoute,getTeacherBalanceRoute, createDepositRoute, getDepositRoute, payTeacherRoute];
