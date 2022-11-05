import * as wireless from "../informations/wireless.js";

wireless.disableBluetooth();

console.log(wireless.getRawWirelessInfo());
console.log("-----");
console.log(wireless.getWifiInfo());
console.log("-----");
console.log(wireless.getBluetoothInfo());
console.log("-----");