import fs from "node:fs";
import * as constants from "./constants.js";



export const getModelName = ()=>{
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

export const getModelVersion = ()=>{
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

export const getDeviceInfo = (options) => {
    options = options||[constants.Model_Name, constants.Model_VersionNumber];
    let deviceInfo = {};

    if (options.includes(constants.Model_Name)) {
        deviceInfo["modelName"] = getModelName();
    }
    if (options.includes(constants.Model_VersionNumber)) {
        deviceInfo["modelVersion"] = getModelVersion();
    }

    return deviceInfo;
};