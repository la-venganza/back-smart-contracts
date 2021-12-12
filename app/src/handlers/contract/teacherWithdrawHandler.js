function schema() {
  return {
    body: {
      type: "object",
      properties: {
        teacherId: {
          type: "string",
        },
        recieverAddress: {
          type: "string",
        },
      },
    },
    required: ["teacherId", "recieverAddress"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.teacherWithdraw(await walletService.getWallet(req.body.teacherId), req.body.recieverAddress);
  };
}

module.exports = { schema, handler };
