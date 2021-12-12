function schema() {
  return {
    params: {
      type: "object",
      properties: {
        teacherId: {
          type: "string",
        },
      },
    },
    required: ["teacherId"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return contractInteraction.getTeacherBalance(await walletService.getWallet(req.params.teacherId));
  };
}

module.exports = { schema, handler };
