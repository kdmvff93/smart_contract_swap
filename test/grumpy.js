const { assert } = require("chai");

const Grumpy = artifacts.require("Grumpy");


contract("Grumpy", () => {
  let grumpy = null;
  let sender_address = "0x06465813bFB9D2d89bAefa7FB7c17aBfB75fD327";
  let recipient_address = "0xECc1d5079d5d79E65c583a175E9851430504FD66";
  let dev_address = "0xBCb683E807737c15558F9b0C1120fdf2EC848987";
  let charity_address = "0x2789f51DB58676895aFb1227D03c4E9501692581";
  const token_decimals = 9
  
  before(async () => {
      grumpy = await Grumpy.deployed();
      console.log("Grumpy address is ",grumpy.address)
  });

  it("Should have the correct name", async () => {
    const name = await grumpy.name();
    assert(name === 'Grumpy Finance');
  });

  it("Should have the correct number of decimals", async () => {
    const decimals = await grumpy.decimals();
    decimals_to_number = decimals.toNumber();
    console.log("grumpy number of decimals are", decimals.toNumber())
    assert(decimals_to_number === 9)
  });

  it("Should have the correct symbol", async () => {
    const symbol = await grumpy.symbol();
    assert(symbol === "GRUMPY");
  });

  
  it("Should have a supply of 100 Trillion", async () => {
    const supply = await grumpy.totalSupply();
    const supply_remove_decimals = Math.round((supply / Math.pow(10, token_decimals)));

    console.log("supply as number is ", supply_remove_decimals) 
    assert(supply_remove_decimals === 100000000000000)
  });

  it("Should give the owner 100 Trillion tokens", async () => {
    const ownerSupply = await grumpy.balanceOf(sender_address);
    assert(ownerSupply.toString() === "100000000000000000000000")
  });

  it("Should give other people no tokens to begin with", async () => {
    const otherSupply = await grumpy.balanceOf(recipient_address)
    assert(otherSupply.toNumber() === 0)
  });

  it("Sends 0.97 Thousand to recipient, 0.01 Thousand to charity wallet, and 0.01 Thousand to dev wallet", async () => {
    one_thousand_to_transfer = Math.round(157 * Math.pow(10,12))
    await grumpy.transfer(recipient_address,one_thousand_to_transfer);

    const recipient = await grumpy.balanceOf(recipient_address);
    const recipient_remove_decimals = Math.round((recipient / Math.pow(10, token_decimals)));
    console.log("The recipient receives", recipient_remove_decimals)

    const dev_wallet = await grumpy.balanceOf(dev_address);
    const dev_wallet_remove_decimals = Math.round((dev_wallet / Math.pow(10, token_decimals)));
    console.log("The dev wallet receives",dev_wallet_remove_decimals)

    const charity_wallet = await grumpy.balanceOf(charity_address);
    const charity_wallet_remove_decimals = Math.round((charity_wallet / Math.pow(10, token_decimals)));
    console.log("The charity wallet receives",charity_wallet_remove_decimals)

    const owner_wallet = await grumpy.balanceOf(sender_address);
    const owner_wallet_remove_decimals = Math.round((owner_wallet / Math.pow(10, token_decimals)));
    console.log("The owner still has",owner_wallet_remove_decimals);

    assert(recipient_remove_decimals === 152290);
    assert(dev_wallet_remove_decimals === 1570);
    assert(charity_wallet_remove_decimals === 1570);
  });
});
