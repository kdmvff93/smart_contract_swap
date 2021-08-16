const Pawthereum = artifacts.require("Pawthereum");

contract("Pawthereum", () => {
  let pawthereum = null;
  let sender_address = "0x06465813bFB9D2d89bAefa7FB7c17aBfB75fD327";
  let recipient_address = "0xECc1d5079d5d79E65c583a175E9851430504FD66";
  let dev_address = "0xBCb683E807737c15558F9b0C1120fdf2EC848987";
  let charity_address = "0x2789f51DB58676895aFb1227D03c4E9501692581";
  const token_decimals = 9
  
  before(async () => {
      pawthereum = await Pawthereum.deployed();
      console.log("pawthereum address is ",pawthereum.address)
  });

  it("Should have the correct name", async () => {
    const name = await pawthereum.name();
    assert(name === 'Pawthereum');
  });

  it("Should have the correct number of decimals", async () => {
    const decimals = await pawthereum.decimals();
    decimals_to_number = decimals.toNumber();
    console.log("pawthereum number of decimals are", decimals.toNumber())
    assert(decimals_to_number === 9)
  });

  it("Should have the correct symbol", async () => {
    const symbol = await pawthereum.symbol();
    assert(symbol === "PAWTH");
  });

  
  it("Should have a supply of 1 billion", async () => {
    const supply = await pawthereum.totalSupply();
    const supply_remove_decimals = Math.round((supply / Math.pow(10, token_decimals)));

    console.log("supply as number is ", supply_remove_decimals) 
    assert(supply_remove_decimals === 1000000000)
  });

  it("Should give the owner 1 billion tokens", async () => {
    const ownerSupply = await pawthereum.balanceOf(sender_address);
    assert(ownerSupply.toString() === "1000000000000000000")
  });

  it("Should give other people no tokens to begin with", async () => {
    const otherSupply = await pawthereum.balanceOf(recipient_address)
    assert(otherSupply.toNumber() === 0)
  });

  it("Sends 0.97 Thousand to recipient, 0.01 Thousand to charity wallet, and 0.01 Thousand to dev wallet", async () => {
    one_thousand_to_transfer = Math.round(1 * Math.pow(10,3))
    await pawthereum.transfer(recipient_address,one_thousand_to_transfer);

    const recipient = await pawthereum.balanceOf(recipient_address);
    console.log("The recipient receives", recipient.toString())

    const dev_wallet = await pawthereum.balanceOf(dev_address);
    console.log("The dev wallet receives",dev_wallet.toString())

    const charity_wallet = await pawthereum.balanceOf(charity_address);
    console.log("The charity wallet receives",charity_wallet.toString())

    const owner_wallet = await pawthereum.balanceOf(sender_address);
    console.log("The owner still has",owner_wallet.toString());

    assert(recipient.toNumber() === 970);
    assert(dev_wallet.toNumber() === 10);
    assert(charity_wallet.toNumber() === 10);
  });
  
});