export const shortAddress = (address) => {
    if(address.length <= 8) {
        throw new Error("Invalid address string");
    } else {
        return address.substring(0, 5) + '...' + address.substring(address.length - 3);
    }
}