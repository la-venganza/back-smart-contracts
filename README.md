# BasicPayments

Smart contract and basic service to solve payments in the Taller de Programacion 2' projects.

## Installation

To install the project we recommend that you use NVM and install the node version defined in `.nvmrc`

Once you have that in place, you can install the dependencies with npm through

`npm i`

## BasicPayments - Service

This is a minimum project that will serve as a guide to help students to do the rest of the integration

### set unique database name on .env

### start Docker

Go into app and run 'npm start'
docker-compose build
docker-compose up


### Start process

To start the process, after you installed the dependencies and deployed the smart contracts to kovan, you can run

`npm start`

keep in mind that you should have everything in config set before that.

### Available endpoints

The following endpoints are available:

- Create wallet: POST /wallet/:userId
- Get wallet: GET /wallet/:id
- Deposit ethers into the Smart contract: POST /deposit -# Body params: senderId(integer), amountInEthers(string)
- get balance GET balance/:id
- Get deposit receipt: GET /deposit/:txHash:
- payTeacher: post /payTeacher - Body params: senderId(integer), amountInEthers(string), teacherId()
### Usage example

# endpoints

## create wallet
### path
POST
http://localhost:5000/wallet/:walletId

### body
### response
{
  "address": "0x795E7855e140cD21e87A930109cB1d6ceeF1DEA1"
}


## get wallet
### path
GET
http://localhost:5000/wallet/:walletId

### body
### response
{
  "id": "testWallet",
  "address": "0x96D99aFe1D22F97aB5be4C5baBaF51Fe8e1F1462"
}


## get balance
### path
GET
http://localhost:5000/balance/:walletId
### body
### response
{
  "address": "0x795E7855e140cD21e87A930109cB1d6ceeF1DEA1",
  "balance": "0.011747069999291796"
}

## get teacher balance
### path
GET
http://localhost:5000/teacherBalance/:teacherId
### body
### response
{
  "balance": "0.01"
}

## get owner available balance
### path
GET
http://localhost:5000/availableBalance

### body
### response
{
  "balance": "0.01"
}


##  pay teacher
### path
POST
http://localhost:5000/payTeacher

### body
{
	"teacherId": "FirstTeacher",
	"amountInEthers": "0.008"
}
### response
200 o 500

##  deposit
### path
POST
http://localhost:5000/deposit
### body
{
	"senderId": "second",
	"amountInEthers": "0.01"
}
### response
200 o 500 y va con callback despues

##  teacher withdraw
### path
POST
http://localhost:5000/teacherWithdraw
### body
{
	"teacherId": "FirstTeacher",
	"recieverAddress": "0x795E7855e140cD21e87A930109cB1d6ceeF1DEA1"
}
### response
200 o 500 

##  owner withdraw
### path
POST
http://localhost:5000/ownerWithdraw### body
{
	"amount": "0.003"
}
### response
200 o 500 




### Usage



#### Testing

To run the tests, after you installed the dependencies, just run

`npm t`

#### Linting

To run the linter, after you installed the dependencies, just run 

`npm run lint`

#### Coverage

To create a coverage report, after you installed the dependencies, just run 

`npm run coverage`

#### Doc generation

To create the smart contract documentation, after you installed the dependencies, just run 

`npm run docgen`

This will generate a browsable html file within the `./docs` folder, to view it you can open it with any browser.

#### Deployment

To deploy the smart contracts just run

`npm run deploy-kovan`

`npm run deploy-local`

depending on the network you want to use.

Keep in mind that you have to set the INFURA_API_KEY and MNEMONIC envvars(the .env file can be used for this).

To get the deployed contract address just look in the `deployments/<network>/BasicPayments.json` file.

#### More scripts

Other useful scripts can be found using

`npm run`
