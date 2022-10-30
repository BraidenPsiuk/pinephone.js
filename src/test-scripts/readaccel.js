const fs = require("node:fs");

const SENSOR_TYPE = "iio:device2/in_accel";
const AXIS = "x";
const POLL_INTERVAL = 50;

// Read raw values, determine min and max
let biggestValSoFar = -9999999;
let smallestValSoFar = 9999999;
setInterval(()=>{
    let val = fs.readFileSync(`/sys/bus/iio/devices/${SENSOR_TYPE}_${AXIS}_raw`).toString();
    val = new Number(val.substring(0, val.length-1));
    if (val < smallestValSoFar) {
        console.log(`current min: ${val}`);
        smallestValSoFar = val;
    }
    if (val > biggestValSoFar) {
        console.log(`current max: ${val}`);
        biggestValSoFar = val;
    }
}, POLL_INTERVAL);

// RESULTS (ACCEL X):
// min: -32768
// max: 32767

function map(val, inMin, inMax, outMin, outMax) {
    return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}