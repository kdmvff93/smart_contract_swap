

const SwapToken = artifacts.require("SwapToken");
const Grumpy = artifacts.require("Grumpy");
const Pawthereum = artifacts.require("Pawthereum");

module.exports = async (deployer) => {
  let owner1 = "0x06465813bFB9D2d89bAefa7FB7c17aBfB75fD327";
  const grumpy = await Grumpy.deployed();
  const grumpy_address = grumpy.address;
  const pawthereum = await Pawthereum.deployed();
  const pawthereum_address = pawthereum.address;
  const swapToken = await deployer.deploy(SwapToken, grumpy_address, owner1, pawthereum_address, 1);
  console.log("SwapToken address is ",swapToken.address)
  const owner1_returned = await swapToken.owner1()
  console.log("SwapToken dev wallet is ", owner1_returned)
  // console.log("SwapToken instance is ", swapToken)

  
};