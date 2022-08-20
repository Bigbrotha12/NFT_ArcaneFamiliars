const Implement = artifacts.require("FamiliarImpl");
const Proxy = artifacts.require("FamiliarProxy");

module.exports = function (deployer, accounts) {
  deployer.deploy(Proxy);
  deployer.deploy(Implement);

};
