
const SHA256 = require("crypto-js/sha256");

class Client{

    constructor(first_name, last_name, email ){

        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.insureIsPaid = false;
    };

    //getters
    getFirstname(){
        return this.first_name;
    }
    getLastname(){
        return this.last_name;
    }
    getEmail(){
        return this.email
    }
    getInsuranceStatus(){
        return this.insureIsPaid;
    }

    //setters
    setFirstname(first_name){
        this.name = first_name
    }
    setLastname(last_name){
        this.last_name = last_name;
    }
    setEmail(email){
        this.email = email;
    }
    setInsurepay(insureIsPaid){
        this.insureIsPaid = insureIsPaid;
    }
};


class InsurancePay{

    constructor(amount, client, date){
        this.amount = amount;
        this.client = client;
        this.date = date
        this.payStatus();
    }

    payStatus(){
        this.client.setInsurepay(true);
    }
}

class Block{

    constructor( timestamp, data, prevHash = " "){

        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;

        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.timestamp + JSON.stringify(this.data) + this.prevHash).toString();
    }
}

class BlockChain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(new Date().getTime(), {}, "00000" )
    }

    latestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    }

}
let client1 = new Client("sipho", "zitha", "sz@gmail.com");
let client2 = new Client("phumlane", "madolo", "pm@gmail.com");
let client3 = new Client("mshengu", "xichavo", "mx@gmail.com");
let client4 = new Client("tunkis", "west", "tw@gmail.com");


let ip1=  new InsurancePay(1000, client1, new Date().getDate());
let ip2 = new InsurancePay(1000, client2, new Date().getDate());
let ip3 = new InsurancePay(1000, client3, new Date().getDate());
let ip4 = new InsurancePay(1000, client4, new Date().getDate());
   
const blocks = [

    new Block(new Date().getTime(), ip1),
    new Block(new Date().getTime(), ip2),
    new Block(new Date().getTime(), ip3),
    new Block(new Date().getTime(), ip4),
]

let blockchain = new BlockChain();


blocks.map( block =>{
    blockchain.addBlock(block);
});
console.log(blockchain);