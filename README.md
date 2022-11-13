# pinephone.js (NPM)

<!-- ![Project Logo](/img/logo.png) -->
<img src="https://raw.githubusercontent.com/BraidenPsiuk/pinephone.js/master/img/logos/logo-with-text.png" style="width: 100%;">

A tiny JavaScript library which provides a consistent API for interacting with Pine64 PinePhone devices.

![supported devices](https://img.shields.io/badge/Supported%20Phones%3A-PinePhone,%20PinePhone%20Pro-brightgreen)

<!-- ![Working Features](https://img.shields.io/badge/Working%20Features%3A-Getting%20basic%20device%20information,%20Getting%20bluetooth%20information-brightgreen)
![Features in Development](https://img.shields.io/badge/Features%20in%20Development:-Getting%20accel%20data,%20Getting%20gyro%20data,%20Getting%20compass%20data-red) -->

![GitHub Repo Stars](https://img.shields.io/github/stars/BraidenPsiuk/fixar.js?color=yellow)
![Module Types](https://img.shields.io/badge/module%20types%3A-cjs,%20esm-blue)
![Minified File Size](https://img.shields.io/github/size/BraidenPsiuk/pinephone.js/build/pinephone.min.js?label=minified%20size)
![License](https://img.shields.io/github/license/BraidenPsiuk/pinephone.js)
![Donations](https://img.shields.io/liberapay/receives/Braiden.svg?logo=liberapay)



## Features:

### Device Information
 - Reading device model name (Is it an OG or Pro PinePhone?)
 - Reading device model version (Which mainboard version is this?)
### WiFi / Bluetooth
 - Getting current statuses (Are WiFi/BT currently enabled?)
 - Enable / Disable (Control WiFi/BT radios at software level)
### RGB LEDs
 - Toggling individual status LEDs (R, G, and B LEDs located at the top-left of the phone)
 - Set status color (*white, red, yellow, green, cyan, purple, blue, black/off*)
### Issuing Notifications
 - Create notifications with titles and optional bodies (bodies can only be viewed while the phone is unlocked)



## Examples:

### Installing the library
```shell
# NPM (https://nodejs.org)
npm install pinephone

# Bun (https://bun.sh)
bun upgrade --canary && bun install pinephone
```

### Importing the library
Various builds of pinephone.js are now provided. You can import the library in CommonJS or ES module format.
```javascript
// CommonJS (Classic node.js)
const pinephone = require('pinephone')

// ES Module, importing the entire library
import * as pinephone from 'pinephone'

// ES Module, importing only what's needed (allows tree-shaking)
import { getModelName, getBluetoothStatus } from 'pinephone'
```

### Basic usage example
```javascript
import * as pinephone from 'pinephone'

pinephone.setLEDColor(pinephone.Color_YELLOW)
pinephone.notify(`Hello, ${pinephone.getModelName()}!`, 'Hello from pinephone.js!')

console.log('Device information:', pinephone.getDeviceInfo())
console.log('WiFi status:', pinephone.getWifiStatus())
console.log('Bluetooth status:', pinephone.getBluetoothStatus())
```

### Getting device information
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
console.log( pinephone.getWifiStatus() )
// output -> (example Object):
// {
//   softwareEnabled: true,
//   hardwareEnabled: true
// }

console.log( pinephone.getBluetoothStatus() )
// output -> (example Object):
// {
//   softwareEnabled: false,
//   hardwareEnabled: true
// }
```
### Enabling or disabling WiFi / Bluetooth
This one is pretty self-explanitory. Just remember not to test disabling WiFi if you are connected to the phone via SSH!
```javascript
// Controlling WiFi (software)
pinephone.enableWifi()
pinephone.disableWifi()

// Controlling Bluetooth (software)
pinephone.enableBluetooth()
pinephone.disableBluetooth()
```

### Controlling RGB LEDs
There is a group of three status LEDs located at the top-left corner of the device. Since they are grouped closely together, toggling certain LEDs lets you "mix" the R, G, and B LEDs to produce a few other colors. You have a few options for controlling these status LEDs:
```javascript
// Different method for each action
pinephone.enableRedLED()
pinephone.disableRedLED()

// Passing in a boolean (similar to Arduio's digitalWrite function)
pinephone.enableGreenLED(true)
pinephone.enableGreenLED(false)

// Pass in colors as pinephone.js constants
pinephone.setLEDColor(pinephone.Color_WHITE)
pinephone.setLEDColor(pinephone.Color_BLACK) // Color_OFF works too

// Pass in colors as strings
pinephone.setLEDColor('yellow')
pinephone.setLEDColor('black') // 'off' works too
```

Here is a simple example showing how to blink between two colors, once per second:
```javascript
import * as pinephone from 'pinephone'

let toggle = false
setInterval(() => {
    toggle = !toggle
    if (toggle) {
        pinephone.setLEDColor(pinephone.Color_BLUE)
    } else {
        pinephone.setLEDColor(pinephone.Color_YELLOW)
    }
}, 500)
```
*Note: You cannot read the currently set color at this time, though this is definitely something that could be implemented easily. Software PWM is not possible, and likely will not be, without a faster, lower-level method of controlling the LEDs.*

### Notifications
You can issue notifications based on the Freedesktop.org specification. The most basic notifications contain just a title/subject, but you can also add a body if you feel up for the challenge :)
```javascript
pinephone.notify('Title Text')
pinephone.notify('Title Text', 'Body text - feeling adventurous today!')
```
<img src="https://raw.githubusercontent.com/BraidenPsiuk/pinephone.js/master/img/examples/notifications.png" style="width: 20%;">

### Getting sensor data
Sensor data is accessed via EventEmitter events. By default, sensors are sampled every 50ms.

Reading sensor data is **currently not implemented** in this version of pinephone.js, but the feature will be made available very soon.

See *src/test-scripts/read-x-accel.mjs* for example code if you are curious and want to implement something right away.



## Developing Apps for Mobile Linux Devices in JavaScript:

### Current PinePhone Apps
Many of the currently available applications that run on PinePhones weren't designed specifically for mobile devices. They can be desktop applications which were updated to be more adaptive and therefore mobile-friendly through the use of libraries such as [Gnome's libhandy](https://gitlab.gnome.org/GNOME/libhandy). Many of them are being written in C, C++, or Rust. The PinePhone community offers several ways to get started writing apps. Initially, you'll likely be faced with choosing a framework, such as GTK (Typically found on Phosh or Gnome-Mobile), or the KDE frameworks which utilize QT (common on Plasma Mobile).

Your choice of framework isn't really that critical to the end-user, as most apps will build and run perfectly fine under any mobile Linux environment. You can basically just choose the framework that works best for you. When it comes to JavaScript, here are just three options to consider, with Node-GTK being my personal recommendation.

### Framework / Library Choices for Developing Mobile Linux Apps with JavaScript
 - [Node-GTK](https://github.com/romgrk/node-gtk) - If you prefer working entirely in JavaScript and don't want to ship an entire browser, [Node-GTK](https://github.com/romgrk/node-gtk) might be a great solution for you. It offers bindings to GTK 3 and 4, allows use of WebGTK (and therefore WebGL/GPU), and lets you make use of npm modules (something gjs does not offer). As it is GTK-based, you can build front-ends using Glade and all apps built with Node-GTK will feel right at home with other apps in Phosh or Gnome-mobile.
 - [Tauri](https://github.com/tauri-apps/tauri) - Seems like a good step in the right direction, as it is much lighter than Electron. Tauri apps will likely not feel very at-home next to other PinePhone apps though, as it doesn't use GTK or QT styling.
 - [Electron](https://github.com/electron/electron) - Definitely seen as an attractive option for JS devs, due to how simple it is to start developing, testing, and packaging. But Electron has **many** downsides which need to be considered. It relies on Chromium, leading to large app bundle sizes and high memory usage. Many end users don't like the idea of Chromium (owned by Google) being a requirement for their app to work. It can also cause your app to feel downright sluggish, especially on devices like the original PinePhone with it's limited memory.

### Regarding Bun
[Bun](https://bun.sh/), an optimized JavaScript runtime using JavaScriptCore, is now supported thanks to their very recent implementation of the *child_process* API! This means that all methods will now work, even those utilizing *rfkill*, such as *getBluetoothStatus()* and *enableWifi()*!

To use pinephone.js with bun, make sure bun is already installed and then run the following:
```shell
bun upgrade --canary
```

As support for *child_process* was only recently added to bun, you will need to update to bun's canary release to use pinephone.js as expected. Once Bun publishes an official release with this change included (which should only be a few weeks), you will no longer need to explicitly switch to their canary version.



## Contributing:

### How to contribute
The best way to contribute is by submitting issues and/or pull requests to the [pinephone.js development repository](https://github.com/BraidenPsiuk/pinephone.js). If you would like to contribute financially, a donation would be greatly appriciated (see next section).



### Donations

This library was developed by a sole individual of the PinePhone community - I am not affiliated with [Pine64, the company](https://www.pine64.org/)! Any donations you make here will go directly to me, not Pine64. If you are looking instead to support Pine64 (which I highly recommend, they're awesome), please consider [purchasing one of their devices](https://www.pine64.org/) or donating to them.

That said, if you like pinephone.js or your project relies on it, a donation (even a small one) would help development quite a bit. Thank you!

Donate with fiat:

 - <a href="https://liberapay.com/Braiden/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>

Donate with crypto:

- Monero (XMR): <sub><sup>4B12BmQuYNF9PHg275ASbfiD7iXy1vK2YJkxtK5V4xv9UTrxFv9ZQ4ASokykTvEVa7fL1NDbtKdLyEDHsMGrRht4FdHqiKj</sup></sub>
- Litecoin (LTC): <sub><sup>LLfE4awRw47ghQJzMvmn1WPvVykcXwqt9S</sup></sub>
- Bitcoin Cash (BCH): <sub><sup>qpzezt09wvry2tc30pzlsj9tk9npmu70kqht4x3xqg</sup></sub>

---

<sub><sup>
DISCLAIMER: "PINE64 and the PINE64 pinecone logo are trademarked by Pine Store Limited." For more information, please visit [this webpage](https://wiki.pine64.org/wiki/PINE64_brand_and_logo). Please [contact me](mailto:mail@braiden.dev) if you have any issues or concerns involving this project's use of branding or imagery.
</sup></sub>