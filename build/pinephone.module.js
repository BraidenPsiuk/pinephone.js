import { execSync } from 'node:child_process';
import fs from 'node:fs';

// Expected: Booleans
const BluetoothSoftwareSwitch_State = "BluetoothSoftwareSwitch_State";
const BluetoothHardwareSwitch_State = "BluetoothHardwareSwitch_State";

// Expected: Strings
const Model_Name = "Model_Name";
const ModemFirmware_Name = "ModemFirmware_Name";

// Expected: Numbers
const Model_VersionNumber = "Model_VersionNumber";
const ModemFirmware_VersionNumber = "ModemFirmware_VersionNumber";

const _getRawWirelessInfo = () => {
    const rawWirelessInfo = JSON.parse(execSync("rfkill -J"))["rfkilldevices"];
    // if (rawWirelessInfo.length !== 2) throw new Error("rawWirelessInfo length is different from expected"); // Don't ship with this enabled, just for testing
    return rawWirelessInfo;
};


const isEnabled = (switchStateString)=>{
    return (switchStateString === "unblocked");
};


const getWifiStatus = () => {
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

const enableWifi = () => {
    execSync("rfkill unblock wifi");
};

const disableWifi = () => {
    execSync("rfkill block wifi");
};


const getBluetoothStatus = () => {
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

const enableBluetooth = () => {
    execSync("rfkill unblock bluetooth");
};

const disableBluetooth = () => {
    execSync("rfkill block bluetooth");
};

const getModelName = ()=>{
// PinePhone MODEL strings (returned from "cat /sys/firmware/devicetree/base/model")
// OG PP V1.1 (non-braveheart... Comunity Edition, CE?) = ?
// OG PP V1.2 (non-braveheart... Comunity Edition, CE?) = "Pine64 PinePhone (1.2)"
// PPP V1.0? (Explorer Edition, EE) = "Pine64 PinePhonePro"

    // Fetch PinePhone's model ID string
    let modelId = fs.readFileSync(`/sys/firmware/devicetree/base/model`).toString();
    // let modelId = "Pine64 PinePhone (1.2)"; // For testing OG PP with version number attached

    // Remove null character if it exists (it should always be there)
    modelId = modelId.split("\x00");
    modelId = modelId[0];

    // Remove version number if it exists (not present on PPP EE, present on 1.2, not sure about 1.1)
    modelId = modelId.split("(");
    modelId = modelId[0];

    // Remove space at end of string if it exists (will exist if the version number was removed)
    modelId = modelId.trim();

    return modelId;
};

const getModelVersion = ()=>{
// PinePhone MODEL strings (returned from "cat /sys/firmware/devicetree/base/model")
// OG PP V1.1 (non-braveheart... Comunity Edition, CE?) = ?
// OG PP V1.2 (non-braveheart... Comunity Edition, CE?) = "Pine64 PinePhone (1.2)"
// PPP V1.0? (Explorer Edition, EE) = "Pine64 PinePhonePro"

    // Fetch PinePhone's model ID string
    let modelId = fs.readFileSync(`/sys/firmware/devicetree/base/model`).toString();
    // let modelId = "Pine64 PinePhone (1.2)"; // For testing OG PP with version number attached
    let versionNumber;

    // Remove null character if it exists (it should always be there)
    modelId = modelId.split("\x00");
    modelId = modelId[0];

    let containsVersionNumber = true;
    if (modelId.indexOf("(") === -1) containsVersionNumber = false;

    if (containsVersionNumber) {
        versionNumber = modelId.substring(modelId.indexOf("(")+1, modelId.indexOf(")"));
    } else {
        versionNumber = "1.0";
    }

    return versionNumber;
};

const getDeviceInfo = (options) => {
    options = options||[Model_Name, Model_VersionNumber];
    let deviceInfo = {};

    if (options.includes(Model_Name)) {
        deviceInfo["modelName"] = getModelName();
    }
    if (options.includes(Model_VersionNumber)) {
        deviceInfo["modelVersion"] = getModelVersion();
    }

    return deviceInfo;
};

export { BluetoothHardwareSwitch_State, BluetoothSoftwareSwitch_State, Model_Name, Model_VersionNumber, ModemFirmware_Name, ModemFirmware_VersionNumber, _getRawWirelessInfo, disableBluetooth, disableWifi, enableBluetooth, enableWifi, getBluetoothStatus, getDeviceInfo, getModelName, getModelVersion, getWifiStatus };
