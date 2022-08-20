// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

abstract contract CommonStorage {

    // Maintain ownership data required for Ownable contract
    // as well as implementation contract initialization status
    address internal _owner;
    mapping(address => bool) internal _initStatus;
    mapping(address => string) internal _version;

    // Maintain IMX integration variables
    address internal _imx;
    mapping(uint256 => bytes) internal _blueprints;

    // Maintain ERC721 NFT data
    // Token name
    string internal _name;
    // Token symbol
    string internal _symbol;
    // NFT URI
    string internal _rootURI;
    // Mapping from token ID to owner address
    mapping(uint256 => address) internal _owners;
    // Mapping owner address to token count
    mapping(address => uint256) internal _balances;
    // Mapping from token ID to approved address
    mapping(uint256 => address) internal _tokenApprovals;
    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) internal _operatorApprovals;

    // Maintain generic implementation state variables
    // Pattern used to allow expansion of state variables in future implementations
    // without risking storage-collision
    mapping(string => address) internal _address;
    mapping(string => uint) internal _uint;
    mapping(string => int) internal _int;
    mapping(string => bytes) internal _bytes;
    mapping(string => string) internal _string;
    mapping(string => bool) internal _bool;
    mapping(string => bytes[]) internal _array;
    mapping(string => mapping(string => bytes[])) internal _mapping;

}