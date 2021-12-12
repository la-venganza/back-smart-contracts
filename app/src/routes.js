const getWalletData = require("./handlers/wallet/getWalletHandler");
const getWalletsData = require("./handlers/wallet/getWalletsHandler");
const createWallet = require("./handlers/wallet/createWalletHandler");
const createDeposit = require("./handlers/deposit/createDepositHandler");
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

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
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

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

module.exports = [getWalletDataRoute, getWalletsDataRoute, createWalletRoute, createDepositRoute, getDepositRoute, payTeacherRoute];
