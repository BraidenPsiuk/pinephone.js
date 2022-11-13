// FLASH LED BLUE AND YELLOW
import { setLEDColor } from 'pinephone';

let enabled = false
setInterval(() => {
    enabled = !enabled;
    if (enabled) {
        setLEDColor("blue")
    } else {
        setLEDColor("yellow")
    }
}, 500)