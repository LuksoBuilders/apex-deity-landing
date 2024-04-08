import { ethers } from "ethers";
import ApexDeities from "../abis/ApexDeities.json";
import HolyShit from "../abis/HolyShit.json";
import { APEX_DEITIES_CONTRACT_ADDRESS, HOLY_SHIT_CONTRACT_ADDRESS } from "./constants";

const getAvailableFromMinted = (n: ethers.BigNumber) => 25 - Number(n);

function bytes32ToNumber(bytes: string): bigint {
    // Ensure the input string represents a valid bytes32 (64 characters)
    if (bytes.length !== 66) {
        throw new Error("Invalid bytes32 format");
    }

    // Parse the input string as a BigInt in base 16
    const numberValue = BigInt(bytes);

    return numberValue;
}

function numberToBytes32(numberValue: number) {
    // Ensure the input is a valid BigInt

    // Convert the BigInt to a hexadecimal string
    let hexString = BigInt(numberValue).toString(16);

    // Pad the string with zeros to ensure it's 64 characters long
    while (hexString.length < 64) {
        hexString = "0" + hexString;
    }

    // Return the resulting string
    return "0x" + hexString;
}

export {
    bytes32ToNumber,
    numberToBytes32,
    getAvailableFromMinted
};
