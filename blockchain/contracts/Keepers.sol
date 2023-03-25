// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMXBridge/Mintable.sol";
import "./Library/Bytes.sol";

contract Keepers is ERC721, Ownable, Mintable {
    using Bytes for bytes;

    address private imx;
    string private baseURI;
    mapping(uint256 => bytes) private blueprints;

    constructor(string memory name, string memory symbol, string memory rootURI) ERC721(name, symbol) {
        baseURI = rootURI;
    }

    //----------------------- VIEW FUNCTIONS -----------------------------------

    /// @notice Returns the NFT data associated with given token ID
    /// @param _tokenId     of token data being queried.
    function getTokenBlueprint(uint256 _tokenId) external view returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        return string(blueprints[_tokenId]); 
    }

    /// @notice Returns URI of given token's image data
    /// @param _tokenId     of token data being queried.
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory keeperId = blueprints[_tokenId].substring(0, 4);

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, "/Images/", keeperId, ".png")) : "";
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    //------------------------ MUTATIVE FUNCTIONS ---------------------------------

    function _mintFor(address _to, uint256 _id, bytes memory _blueprint) internal override {
        blueprints[_id] = _blueprint;
        _safeMint(_to, _id);
    }

    function changeBaseURI(string calldata _newURI) external onlyOwner {
        baseURI = _newURI;
    }
}