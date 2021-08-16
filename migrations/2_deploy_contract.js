const Grumpy = artifacts.require("Grumpy");

module.exports = function (deployer) {
  deployer.deploy(Grumpy);
};