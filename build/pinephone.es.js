const fs = require("fs");
const getModelId = (discardVersionNumber) => {
  let modelId = fs.readFileSync(`/sys/firmware/devicetree/base/model`).toString();
  modelId = modelId.split("\0");
  modelId = modelId[0];
  modelId = modelId.split("(");
  modelId = modelId[0];
  modelId = modelId.trim();
  return modelId;
};
console.warn("\n---------[ PINEPHONE.JS - WARNING ]---------");
console.warn("This is an early version of pinephone.js,\nthe API may change during this time!");
console.warn("--------------------------------------------\n");
export { getModelId };
