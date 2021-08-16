const { assert } = require("chai");

const SwapToken = artifacts.require("SwapToken");
const Grumpy = artifacts.require("Grumpy");
const Pawthereum = artifacts.require("Pawthereum");

contract("SwapToken",  () => {
    let swapToken = null;

    before(async () => {
         swapToken = await SwapToken.deployed();
         console.log("SwapToken address is ", swapToken.address)
         grumpy = await Grumpy.deployed();
         console.log("grumpy address is ", grumpy.address);
         pawthereum = await Pawthereum.deployed();
         console.log("grumpy address is ", pawthereum.address)
         
    });

    it("Should have the correct owner1 address", async () => {
        const owner1 = await swapToken.owner1();
        console.log("owner1 is ", owner1)
        assert(owner1 === "0x06465813bFB9D2d89bAefa7FB7c17aBfB75fD327")
    })

    it("Should send 97 grumpys to the address that I input", async () => {

        const owner1 = await swapToken.owner1();

        // check that the initial supply of grumpy is 100 trillion
        const grumpy_supply = await grumpy.totalSupply();
        const grumpy_supply_remove_decimals = Math.round((grumpy_supply / Math.pow(10, 9)));
    
        console.log("supply as number is ", grumpy_supply_remove_decimals) 
        assert(grumpy_supply_remove_decimals === 100000000000000)

        // check that the initial supply of Pawthereum is 1 billion
        const ownerSupply = await pawthereum.balanceOf(owner1);

        assert(ownerSupply.toString() === "1000000000000000000")

        // Send a test amount of grumpy to another address

        const simulated_token_holder_address = "0xaf284EfD8C649522120a05bfeeB36F2b6e7c970C"

        await grumpy.transfer(simulated_token_holder_address,90000000000)

        const grumpy_owner_after_transfer = await grumpy.balanceOf(owner1)

        console.log("grumpy owner balance after transfer is ", grumpy_owner_after_transfer.toString())

        const grumpy_simulated_user = await grumpy.balanceOf(simulated_token_holder_address)

        console.log("grumpy user balance after transfer is ", grumpy_simulated_user.toString())

        

    })

    it("Should execute the swap properly", async () => {
        // Execute the swap transaction, swapping 100 grumpys for 0.1 pawthereums


        const simulated_token_holder_address = "0xaf284EfD8C649522120a05bfeeB36F2b6e7c970C"

        const owner1 = await swapToken.owner1();

        console.log("SwapToken owner 1 address is ", owner1)
        // Approve a certain allowance before you can swap

        const simulated_token_holder_balance = await grumpy.balanceOf(simulated_token_holder_address)

        console.log("simulated token holder balance is ",simulated_token_holder_balance.toString())

        const pawthereum_owner_balance = await pawthereum.balanceOf(owner1)

        console.log("Owner balance is ",pawthereum_owner_balance.toString())

        await grumpy.approve(swapToken.address, 100000000000, {from: simulated_token_holder_address});

        await pawthereum.approve(swapToken.address,10000000000, {from: owner1});

        await swapToken.swap(simulated_token_holder_address,10000000000, {from: owner1});

        // Make sure the new balance of grumpy is 0 for the new user
        
        const grumpy_simulated_user_balance_after_swap = await grumpy.balanceOf("0xaf284EfD8C649522120a05bfeeB36F2b6e7c970C")
        
        console.log("Token holder Grumpy balance after swap is ", grumpy_simulated_user_balance_after_swap.toNumber())

        // assert(grumpy_simulated_user_balance_after_swap === "0")

        // console.log the simulated user's balance in PAWTH. It should have increased following the swap

        const simulated_token_holder_balance_after_swap = await pawthereum.balanceOf(simulated_token_holder_address);

        console.log("token holder Pawthereum balance after swap is ", simulated_token_holder_balance_after_swap.toNumber())

        // assert(grumpy_owner_supply_2.toString() === 3999000)
        
        // Make sure that the new balance of pawthereum is 3999.9
        
        // const pawthereum_owner_supply_2 = await pawthereum.balanceOf("0x86207aa0E7759E8F8fCFD60567261A1FD3A2d308")
        
        // assert(pawthereum_owner_supply_2.toNumber() === 3999.9)

    })




});