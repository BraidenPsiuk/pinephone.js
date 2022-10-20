import fs from "node:fs";
// const fs = require("fs");



export const getModelId = (discardVersionNumber) => {
// PinePhone MODEL strings (returned from "cat /sys/firmware/devicetree/base/model")
// OG PP V1.1 (non-braveheart... Comunity Edition, CE?) = ?
// OG PP V1.2 (non-braveheart... Comunity Edition, CE?) = "Pine64 PinePhone (1.2)"
// PPP V1.0? (Explorer Edition, EE) = "Pine64 PinePhonePro"

    // Fetch PinePhone's model ID string
    let modelId = fs.readFileSync(`/sys/firmware/devicetree/base/model`).toString();

    // Remove null character if it exists (it should always be there)
    modelId = modelId.split("\x00");
    modelId = modelId[0];

    // Remove version number if it exists (not present on PPP EE, present on 1.2, not sure about 1.1)
    modelId = modelId.split("(");
    modelId = modelId[0];

    // Remove space at end of string if it exists (will exist if the version number was removed)
    modelId = modelId.trim();

    // Returns either "Pine64 PinePhone" or "Pine64 PinePhonePro"
    return modelId;
};

// TODO: Remove once mature enough, rewrite using async fs calls, split into different files
console.warn("\n---------[ PINEPHONE.JS - WARNING ]---------");
console.warn("This is an early version of pinephone.js,\nthe API may change during this time!");
console.warn("--------------------------------------------\n");