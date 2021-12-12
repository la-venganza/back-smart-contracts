function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
      },
    },
    required: ["userId"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.getWalletBalance(req.params.userId);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
