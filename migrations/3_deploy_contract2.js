const Pawthereum = artifacts.require("Pawthereum");

module.exports = function (deployer) {
  deployer.deploy(Pawthereum);
};