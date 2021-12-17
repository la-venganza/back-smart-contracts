function schema() {
  return {}
    
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    return "ok";
  };
}

module.exports = { schema, handler };
