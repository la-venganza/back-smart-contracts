function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        teacherId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId","teacherId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.payTeacher(walletService.getDeployerWallet(),walletService.getWallet(req.body.teacherId), req.body.amountInEthers);
  };
}

module.exports = { schema, handler };
