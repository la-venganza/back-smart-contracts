function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {    
    const body = await walletService.createWallet(req.body.userId);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
