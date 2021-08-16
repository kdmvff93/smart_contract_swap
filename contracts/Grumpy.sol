pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Grumpy is ERC20Capped {
    using SafeMath for uint256;
    // Declare Charity Fee
    uint256 CHARITY_FEE = 1;
    // Declare Burn Fee
    uint256 BURN_FEE = 1;
    // Declare Developer Fee
    uint256 DEVELOPER_FEE = 1;

    address public constant charity_wallet =
        0x2789f51DB58676895aFb1227D03c4E9501692581;
    address public constant developer_wallet =
        0xBCb683E807737c15558F9b0C1120fdf2EC848987;

    // Declare the parameters of the token

    string public token_name = "Grumpy Finance";
    string public token_symbol = "GRUMPY";
    // Create a capped supply of 100 Trillion Tokens
    uint256 public capped_supply = 100 * 10**12 * 10**9;
    // Create an initial balance of 100 Trillion Tokens
    uint256 public initialBalance = 100 * 10**12 * 10**9;

    // Declare the owner

    address public owner;

    constructor()
        public
        ERC20(token_name, token_symbol)
        ERC20Capped(capped_supply)
    {
        require(initialBalance <= capped_supply, "CommonERC20: cap exceeded");
        ERC20._mint(_msgSender(), initialBalance);
    }

    function decimals() public view virtual override returns (uint8) {
        return 9;
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        uint256 burnAmount = amount.mul(BURN_FEE) / 100;
        uint256 charityAmount = amount.mul(CHARITY_FEE) / 100;
        uint256 developerAmount = amount.mul(DEVELOPER_FEE) / 100;

        // uint256 developerAmount = amount.mul(DEVELOPER_FEE) / 100;
        _burn(_msgSender(), burnAmount);
        _transfer(_msgSender(), charity_wallet, charityAmount);
        _transfer(_msgSender(), developer_wallet, developerAmount);
        _transfer(
            _msgSender(),
            recipient,
            amount.sub(burnAmount).sub(charityAmount).sub(developerAmount)
        );
    }
}
