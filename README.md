# pinephone.js (NPM)

<!-- ![Project Logo](/img/logo.png) -->
<img src="https://raw.githubusercontent.com/BraidenPsiuk/pinephone.js/master/img/logo-with-text.png" style="width: 100%;">

This is a tiny JavaScript library which provides a consistent API for fetching device info and sensor data from Pine64 PinePhone devices.

![supported devices](https://img.shields.io/badge/Supported%20Phones%3A-PinePhone,%20PinePhone%20Pro-brightgreen)

<!-- ![Working Features](https://img.shields.io/badge/Working%20Features%3A-Getting%20basic%20device%20information,%20Getting%20bluetooth%20information-brightgreen)
![Features in Development](https://img.shields.io/badge/Features%20in%20Development:-Getting%20accel%20data,%20Getting%20gyro%20data,%20Getting%20compass%20data-red) -->

![GitHub Repo Stars](https://img.shields.io/github/stars/BraidenPsiuk/fixar.js?color=yellow)
![Module Types](https://img.shields.io/badge/module%20types%3A-cjs,%20esm-blue)
![Minified File Size](https://img.shields.io/github/size/BraidenPsiuk/pinephone.js/build/pinephone.min.js?label=minified%20size)
![License](https://img.shields.io/github/license/BraidenPsiuk/pinephone.js)

### **WARNING:** This is an early version of pinephone.js, the API may change during this time!

---

## Examples:

### Importing the library
Various builds of pinephone.js are now provided. You can import the library in CommonJS or ES module format.
```javascript
// CommonJS (Classic node.js)
const pinephone = require('pinephone')

// ES Module, import the entire library
import * as pinephone from 'pinephone'

// ES Module, import only what's needed (allows tree-shaking)
import { getModelName, getBluetoothStatus } from 'pinephone'
```

### Getting basic device information
If you just want to know if the device is an OG PinePhone or a Pro, use the following:
```javascript
console.log( pinephone.getModelName() )
// output -> 'Pine64 PinePhone' OR 'Pine64 PinePhonePro'
```
You can also get the version (helps to identify the phone's mainboard):
```javascript
console.log( pinephone.getModelVersion() )
// output -> '1.0', '1.1', '1.2', etc...
```
If you want these values returned as an object:
```javascript
console.log( pinephone.getDeviceInfo() )
// output -> (example Object):
// {
//   modelName: 'Pine64 PinePhonePro',
//   modelVersion: '1.0'
// }
```
If you want to hand-pick returned values, you can pass an array of constants like this (see [full list of options](https://github.com/BraidenPsiuk/pinephone.js/blob/master/src/constants.js)):
```javascript
console.log(pinephone.getDeviceInfo( [pinephone.Model_VersionNumber] ))
// output -> (example Object):
// {
//   modelVersion: '1.0'
// }
```

### Getting WiFi / Bluetooth statuses
Find out if WiFi or Bluetooth are enabled, both at the software level and also the hardware level (via the kill switch located inside the back cover of the phone).
```javascript
console.log( pinephone.getBluetoothStatus() )
// output -> (example Object):
// {
//   softwareEnabled: false,
//   hardwareEnabled: true
// }

console.log( pinephone.getWifiStatus() )
// output -> (example Object):
// {
//   softwareEnabled: false,
//   hardwareEnabled: false
// }
```
### Enabling or disabling WiFi / Bluetooth
This one is pretty self-explanitory. Just remember not to test disabling WiFi if you are connected to the phone via SSH!
```javascript
pinephone.enableWifi();
pinephone.disableWifi();

pinephone.enableBluetooth();
pinephone.disableBluetooth();
```

### Getting sensor data
Sensor data is accessed via EventEmitter events. By default, sensors are sampled every 50ms.

Reading sensor data is **currently not implemented** in this version of pinephone.js, but the feature will be made available very soon.

See *src/test-scripts/read-x-accel.mjs* for example code if you are curious and want to implement something right away.