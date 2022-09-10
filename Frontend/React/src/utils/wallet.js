import {IMXqueryService} from '../API/IMXLink';
export default class Wallet {
    isConnected;
    address;
    starkAddress;
    constructor(){
        this.isConnected = false;
        this.address = "";
        this.starkAddress = "";
    }

    async connect() {
        IMXqueryService.s
    }

    changeAccount() {
        if(this.isConnected){

        } else {
            console.error("You must be connected to provider");
        }
    }

    changeChain() {
        if(this.isConnected){

        } else {
            console.error("You must be connected to provider");
        }
    }

    disconnect() {
        if(this.isConnected){

        } else {
            console.error("You must be connected to provider");
        }
    }

}