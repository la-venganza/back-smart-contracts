function schema() {
  return {
    body: {
      type: "object",
      properties: {
        amount: {
          type: "string",
        },
      },
    },
    required: ["teacherId", "recieverAddress"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.ownerWithdraw(await walletService.getDeployerWallet(),req.body.amount );
  };
}

module.exports = { schema, handler };
