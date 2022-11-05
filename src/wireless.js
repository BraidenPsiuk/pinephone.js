import { execSync } from "node:child_process";


export const _getRawWirelessInfo = () => {
    const rawWirelessInfo = JSON.parse(execSync("rfkill -J"))["rfkilldevices"];
    // if (rawWirelessInfo.length !== 2) throw new Error("rawWirelessInfo length is different from expected"); // Don't ship with this enabled, just for testing
    return rawWirelessInfo;
};


const isEnabled = (switchStateString)=>{
    return (switchStateString === "unblocked");
};


export const getWifiStatus = () => {
    const rawWirelessInfo = _getRawWirelessInfo();
    // const rawWirelessInfo = [{"type": "other"}, {"type": "bluetooth"}]; // Just for testing
    
    let rawWifiInfo;
    rawWirelessInfo.forEach(e => {
        if (e.type === "wlan") rawWifiInfo = e;
    });

    const wifiInfo = {
        "softwareEnabled": isEnabled(rawWifiInfo["soft"]),
        "hardwareEnabled": isEnabled(rawWifiInfo["hard"])
    };
    return wifiInfo;
};

export const enableWifi = () => {
    execSync("rfkill unblock wifi");
};

export const disableWifi = () => {
    execSync("rfkill block wifi");
};


export const getBluetoothStatus = () => {
    const rawWirelessInfo = _getRawWirelessInfo();
    // const rawWirelessInfo = [{"type": "wlan"}, {"type": "other"}]; // Just for testing
    
    let rawBluetoothInfo;
    rawWirelessInfo.forEach(e => {
        if (e.type === "bluetooth") rawBluetoothInfo = e;
    });

    const bluetoothInfo = {
        "softwareEnabled": isEnabled(rawBluetoothInfo["soft"]),
        "hardwareEnabled": isEnabled(rawBluetoothInfo["hard"])
    };
    return bluetoothInfo;
};

export const enableBluetooth = () => {
    execSync("rfkill unblock bluetooth");
};

export const disableBluetooth = () => {
    execSync("rfkill block bluetooth");
};