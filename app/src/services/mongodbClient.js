var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://ubademy:ubademy@ubademy.k3omt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//next lines help with not having to craete a db connection pool.
var connected = false;
client.on('open', _=>{ connected = true; console.log("opening the database connection")})
client.on('topologyClosed', _=>{ connected=false})





function connectdb(){
  client.connect();
}

function getCollection(collection){
  if(!connected){
    console.log("not connected")
    connectdb();
  }
  return client.db(process.env.DATABASE).collection(collection);
}

function saveToCollection(collection, value)  {
  getCollection(collection).insertOne(value)
}

function getFromCollection (collection, value) {
  return getCollection(collection).findOne(value);
}


module.exports = {
    connectdb,
    getFromCollection,
    saveToCollection
  }
