// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./Ownable.sol";
import "./IMintable.sol";
import "./Minting.sol";

abstract contract Mintable is Ownable, IMintable{

    event AssetMinted(address to, uint256 id, bytes blueprint);

    modifier onlyOwnerOrIMX() {
        require(msg.sender == _imx || msg.sender == owner(), "Function can only be called by owner or IMX");
        _;
    }

    function mintFor(
        address user,
        uint256 quantity,
        bytes calldata mintingBlob
    ) external override onlyOwnerOrIMX {
        require(quantity == 1, "Mintable: invalid quantity");
        (uint256 id, bytes memory blueprint) = Minting.split(mintingBlob);
        _mintFor(user, id, blueprint);
        
        emit AssetMinted(user, id, blueprint);
    }

    function _mintFor(
        address to,
        uint256 id,
        bytes memory blueprint
    ) internal virtual;
}