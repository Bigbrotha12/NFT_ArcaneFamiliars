const FamiliarAdmin = artifacts.require("FamiliarAdmin");
const FamiliarIMX = artifacts.require("FamiliarIMX");
const FamiliarLogic = artifacts.require("FamiliarLogic");
const FamiliarProxy = artifacts.require("FamiliarProxy");

module.exports = async function (deployer, network, accounts) {

  if(network == 'development') {
    // Admin = accounts[0], IMX = accounts[1]
    await deployer.deploy(FamiliarAdmin);
    await deployer.deploy(FamiliarIMX); 
    await deployer.deploy(FamiliarLogic);
    let routeConfig = [
      accounts[0],
      (await FamiliarAdmin.deployed()).address,
      accounts[1],
      (await FamiliarIMX.deployed()).address
    ]
    // constructor(address[] memory _routingConfig) 
    // Layout: [0] = admin, [1] = admin contract
    //         [2] = imx,   [3] = imx contract
    await deployer.deploy(FamiliarProxy, routeConfig);
  }

  if(network == 'goerli') {
    await deployer.deploy(FamiliarAdmin);
    await deployer.deploy(FamiliarIMX); 
    await deployer.deploy(FamiliarLogic);
    let routeConfig = [
      process.env.SIGNER_ADDRESS,
      (await FamiliarAdmin.deployed()).address,
      process.env.IMX_GOERLI,
      (await FamiliarIMX.deployed()).address
    ]
    // constructor(address[] memory _routingConfig) 
    // Layout: [0] = admin, [1] = admin contract
    //         [2] = imx,   [3] = imx contract
    await deployer.deploy(FamiliarProxy, routeConfig);
  }
  

};