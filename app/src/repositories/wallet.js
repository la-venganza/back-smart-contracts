const mongodb = require("../services/mongodbClient");


function getById(userId){
    return mongodb.getFromCollection("wallets", {_id:userId})
  }
  
  function save(userId, address, privateKey){
    return mongodb.saveToCollection("wallets", {_id: userId, address:address, privateKey:privateKey});
  }

module.exports = {
    getById,
    save
}