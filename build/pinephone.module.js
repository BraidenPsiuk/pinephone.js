import fs, { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { normalize, join } from 'node:path';

// Expected: Booleans
const BluetoothSoftwareSwitch_State = "BluetoothSoftwareSwitch_State";
const BluetoothHardwareSwitch_State = "BluetoothHardwareSwitch_State";
// Expected: Strings
const Model_Name = "Model_Name";
const ModemFirmware_Name = "ModemFirmware_Name";
// Expected: Numbers
const Model_VersionNumber = "Model_VersionNumber";
const ModemFirmware_VersionNumber = "ModemFirmware_VersionNumber";

// Other Constants
const Color_WHITE = "white";
const Color_RED = "red";
const Color_YELLOW = "yellow";
const Color_GREEN = "green";
const Color_CYAN = "cyan";
const Color_PURPLE = "purple";
const Color_BLUE = "blue";
const Color_BLACK = "black";
const Color_OFF$1 = "off";

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

const MODEL_NAME = getModelName();

const LEDS_BASE_PATH = normalize("/sys/class/leds/");
const LEDS_BRIGHTNESS_PATH = "./brightness";

const LEDS_RED_NAME_OG = "red\:indicator"; // May be incorrect, may also require root according to pmOS wiki?
const LEDS_GREEN_NAME_OG = "green\:indicator"; // May be incorrect, may also require root according to pmOS wiki?
const LEDS_BLUE_NAME_OG = "blue\:indicator"; // May be incorrect, may also require root according to pmOS wiki?
const LEDS_RED_NAME_PRO = "red\:indicator";
const LEDS_GREEN_NAME_PRO = "green\:indicator";
const LEDS_BLUE_NAME_PRO = "blue\:indicator";



const enableRedLED = (toEnable) => {
    toEnable = (toEnable===undefined)?true:toEnable;
    if (MODEL_NAME.includes("Pro")) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_PRO, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_OG, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    }
};
const disableRedLED = () => {
    if (MODEL_NAME.includes("Pro")) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_PRO, LEDS_BRIGHTNESS_PATH), "0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_OG, LEDS_BRIGHTNESS_PATH), "0");
    }
};

const enableGreenLED = (toEnable) => {
    toEnable = (toEnable===undefined)?true:toEnable;
    if (MODEL_NAME.includes("Pro")) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_PRO, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_OG, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    }
};
const disableGreenLED = () => {
    if (MODEL_NAME.includes("Pro")) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_PRO, LEDS_BRIGHTNESS_PATH), "0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_OG, LEDS_BRIGHTNESS_PATH), "0");
    }
};

const enableBlueLED = (toEnable) => {
    toEnable = (toEnable===undefined)?true:toEnable;
    if (MODEL_NAME.includes("Pro")) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_PRO, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_OG, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    }
};
const disableBlueLED = () => {
    if (MODEL_NAME.includes("Pro")) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_PRO, LEDS_BRIGHTNESS_PATH), "0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_OG, LEDS_BRIGHTNESS_PATH), "0");
    }
};

const setLEDColor = (color) => {
    switch (color) {
        case Color_WHITE:
            enableRedLED(true);
            enableGreenLED(true);
            enableBlueLED(true);
            break;
        case Color_RED:
            enableRedLED(true);
            enableGreenLED(false);
            enableBlueLED(false);
            break;
        case Color_YELLOW:
            enableRedLED(true);
            enableGreenLED(true);
            enableBlueLED(false);
            break;
        case Color_GREEN:
            enableRedLED(false);
            enableGreenLED(true);
            enableBlueLED(false);
            break;
        case Color_CYAN:
            enableRedLED(false);
            enableGreenLED(true);
            enableBlueLED(true);
            break;
        case Color_BLUE:
            enableRedLED(false);
            enableGreenLED(false);
            enableBlueLED(true);
            break;
        case Color_PURPLE:
            enableRedLED(true);
            enableGreenLED(false);
            enableBlueLED(true);
            break;
        case Color_BLACK:
            enableRedLED(false);
            enableGreenLED(false);
            enableBlueLED(false);          
            break;
        case Color_OFF:
            enableRedLED(false);
            enableGreenLED(false);
            enableBlueLED(false);          
            break;
    }
};

// export const notify = (subject, body) => {
//     if (body !== undefined) {
//         // execute like normal
//         execSync(`notify-send "${subject}" "${body?body:''}"`);
//     } else {
//         execSync(`notify-send "${subject}"`);
//     }
// };
const notify = (subject, body) => {
        execSync(`notify-send "${subject}"${body?` "${body}"`:""}`);
};

export { BluetoothHardwareSwitch_State, BluetoothSoftwareSwitch_State, Color_BLACK, Color_BLUE, Color_CYAN, Color_GREEN, Color_OFF$1 as Color_OFF, Color_PURPLE, Color_RED, Color_WHITE, Color_YELLOW, Model_Name, Model_VersionNumber, ModemFirmware_Name, ModemFirmware_VersionNumber, _getRawWirelessInfo, disableBlueLED, disableBluetooth, disableGreenLED, disableRedLED, disableWifi, enableBlueLED, enableBluetooth, enableGreenLED, enableRedLED, enableWifi, getBluetoothStatus, getDeviceInfo, getModelName, getModelVersion, getWifiStatus, notify, setLEDColor };
