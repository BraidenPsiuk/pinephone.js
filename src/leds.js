import { writeFileSync } from "node:fs";
import { normalize, join } from "node:path";
import { getModelName } from "./model.js";
import { Color_BLACK, Color_BLUE, Color_CYAN, Color_GREEN, Color_PURPLE, Color_RED, Color_WHITE, Color_YELLOW, Color_OFF } from "./constants.js";

const IS_PRO = getModelName().includes("Pro");

const LEDS_BASE_PATH = normalize("/sys/class/leds/");
const LEDS_BRIGHTNESS_PATH = "./brightness";

const LEDS_RED_NAME_OG = "red\:indicator"; // May be incorrect, may also require root according to pmOS wiki?
const LEDS_GREEN_NAME_OG = "green\:indicator"; // May be incorrect, may also require root according to pmOS wiki?
const LEDS_BLUE_NAME_OG = "blue\:indicator"; // May be incorrect, may also require root according to pmOS wiki?
const LEDS_RED_NAME_PRO = "red\:indicator";
const LEDS_GREEN_NAME_PRO = "green\:indicator";
const LEDS_BLUE_NAME_PRO = "blue\:indicator";



export const enableRedLED = (toEnable) => {
    toEnable = (toEnable===undefined)?true:toEnable;
    if (IS_PRO) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_PRO, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_OG, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    }
};
export const disableRedLED = () => {
    if (IS_PRO) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_PRO, LEDS_BRIGHTNESS_PATH), "0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_RED_NAME_OG, LEDS_BRIGHTNESS_PATH), "0");
    }
};

export const enableGreenLED = (toEnable) => {
    toEnable = (toEnable===undefined)?true:toEnable;
    if (IS_PRO) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_PRO, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_OG, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    }
};
export const disableGreenLED = () => {
    if (IS_PRO) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_PRO, LEDS_BRIGHTNESS_PATH), "0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_GREEN_NAME_OG, LEDS_BRIGHTNESS_PATH), "0");
    }
};

export const enableBlueLED = (toEnable) => {
    toEnable = (toEnable===undefined)?true:toEnable;
    if (IS_PRO) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_PRO, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_OG, LEDS_BRIGHTNESS_PATH), toEnable ? "1":"0");
    }
};
export const disableBlueLED = () => {
    if (IS_PRO) {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_PRO, LEDS_BRIGHTNESS_PATH), "0");
    } else {
        writeFileSync(join(LEDS_BASE_PATH, LEDS_BLUE_NAME_OG, LEDS_BRIGHTNESS_PATH), "0");
    }
};

export const setLEDColor = (color) => {
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