function schema() {
  return {
  }
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.getAvailableBalance(await walletService.getDeployerWallet());
  };
}

module.exports = { schema, handler };
