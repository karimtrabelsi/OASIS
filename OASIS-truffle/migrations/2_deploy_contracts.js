var Donations = artifacts.require("./Donations.sol");

module.exports = function (deployer) {
  deployer.deploy(Donations);
};
