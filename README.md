# pinephone.js (NPM)

<!-- ![Project Logo](/img/logo.png) -->
<img src="https://braiden.dev/public/projects/pinephone-js/img/logo-with-text.png" style="width: 100%;">

This is a tiny JavaScript library which provides a consistent API for fetching device info and sensor data from Pine64 PinePhone devices.

![supported devices](https://img.shields.io/badge/Supported%20Phones%3A-PinePhone,%20PinePhone%20Pro-brightgreen)

<!-- ![Working Features](https://img.shields.io/badge/Working%20Features%3A-Getting%20basic%20device%20information,%20Getting%20bluetooth%20information-brightgreen)
![Features in Development](https://img.shields.io/badge/Features%20in%20Development:-Getting%20accel%20data,%20Getting%20gyro%20data,%20Getting%20compass%20data-red) -->

![GitHub Repo Stars](https://img.shields.io/github/stars/BraidenPsiuk/fixar.js?color=yellow)
![Module Types](https://img.shields.io/badge/module%20types%3A-cjs,%20esm-blue)
![Minified File Size](https://img.shields.io/github/size/BraidenPsiuk/pinephone.js/build/pinephone.min.js?label=minified%20size)
![License](https://img.shields.io/github/license/BraidenPsiuk/pinephone.js)

#### **WARNING:** This is an early version of pinephone.js, the API may change during this time! IntelliSense/TS definitions are also not available yet.

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
import { getDeviceInfo, getBluetoothInfo } from 'pinephone'
```

### Getting basic device information
Getting device info is simple. By default, version numbers are included as well. If you just want to know if the device is an OG PinePhone or a Pro, pass in an object with the *includeVersionNumber* key set to false.
```javascript
// Print the device type and version
// (This is identical to the "Host" string in Neofetch)
console.log( pinephone.getDeviceInfo() )
// example output -> 'Pine64 PinePhone (1.2)', 'Pine64 PinePhonePro', etc...

// The OG PinePhone includes a version number, you can choose
// to exclude it if you wish
// (The PPP Explorer Edition does not include a version number)
console.log( pinephone.getDeviceInfo({includeVersionNumber: false}) )
// example output -> 'Pine64 PinePhone' OR 'Pine64 PinePhonePro'
```

### Getting bluetooth software and hardware switch states
Find out if Bluetooth is enabled or disabled, both at the software level and also the hardware level via the kill switch located inside the back cover of the phone.
```javascript
console.log( pinephone.getBluetoothInfo() )
// example output -> (Object):
// {
//   id: 1,
//   type: 'bluetooth',
//   device: 'hci0',
//   soft: 'unblocked',
//   hard: 'unblocked'
// }
```