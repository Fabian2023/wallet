// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrivateInfoStorage {
    mapping(address => bool) public whitelist;
    mapping(address => string) private privateInfo;

    constructor() {
        
        whitelist[0x5FbDB2315678afecb367f032d93F642f64180aa3] = true;
        whitelist[0x5Ec605060d810669fd7134494C4AF17ab438CC92] = true;
        whitelist[0x3D3A40cBa3Ef5cc620bC580de1eD1246cda7Dba4] = true;
        whitelist[0x7FAc1ad8d4f84759e64E3F40C9bdE17530C85609] = true;
        whitelist[0x8Ac44dC60c487FB6CdE46a3C807EAb349FA98537] = true;
        whitelist[0xa9C18Dc07f70D76C9e5fa431A1f5d23Eaf1ef6B4] = true;
        whitelist[0xf3a8473d6DC4Ed0a3f09772ff7b9bF4231eF337e] = true;
        whitelist[0x9cBD9c658789Feafb4CC7d9261485eb3E36eabC5] = true;
        whitelist[0x2eac9D76c9F92ae60C06c32fee3e6F1AbD7c5F33] = true;
        whitelist[0x8fbCd403bF4be1eCC39c4C3a5d61b7ee5B31f435] = true;
        whitelist[0x6aC1b7fAc78477dcadb7F86Aa7d4c45ee2e6472B] = true;
        whitelist[0x4aF7b73Dc5C67e5aFcD37Bc3c1Bc47F3Cd96b758] = true;
        whitelist[0x387D0b0cf4601BA1Ef9F67f1A63e002473a0f37f] = true;
        whitelist[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] = true;


    }

    function storePrivateInfo(string memory _info) public {
        require(whitelist[msg.sender], "No estas en la whitelist");
        privateInfo[msg.sender] = _info;
    }

    function getPrivateInfo(address _address) public view returns (string memory) {
        require(whitelist[_address], "No estas en la whitelist");
        return privateInfo[_address];
    }
}
