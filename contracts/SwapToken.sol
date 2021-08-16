pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwapToken {
    IERC20 public Grumpy;
    address public owner1;
    IERC20 public Pawthereum;
    address public owner2;
    uint256 public amount2;
    uint256 public amount1;

    constructor(
        address _Grumpy,
        address _owner1,
        address _Pawthereum,
        uint256 _amount2
    ) public {
        Grumpy = IERC20(_Grumpy);
        owner1 = _owner1;
        Pawthereum = IERC20(_Pawthereum);
        amount2 = _amount2;
    }

    function swap(address _owner2, uint256 _amount1) public {
        owner2 = _owner2;
        amount1 = _amount1;
        amount2 = (amount1 / 100000);

        require(msg.sender == owner1 || msg.sender == owner2, "Not authorized");

        require(
            Grumpy.balanceOf(owner2) >= amount1,
            "Balance not high enough for Grumpy owner"
        );

        require(
            Pawthereum.balanceOf(owner1) >= amount2,
            "Balance not high enough for Pawthereum owner"
        );

        require(
            Grumpy.allowance(owner2, address(this)) >= amount1,
            "Token allowance too low for Grumpy holder"
        );
        require(
            Pawthereum.allowance(owner1, address(this)) >= amount2,
            "Token allowance too low KittenToken for the holder"
        );

        // transfer tokens
        _safeTransferFrom(Grumpy, owner2, owner1, amount1);
        _safeTransferFrom(Pawthereum, owner1, owner2, amount2);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint256 amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}
