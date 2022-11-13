import { execSync } from "node:child_process";

// export const notify = (subject, body) => {
//     if (body !== undefined) {
//         // execute like normal
//         execSync(`notify-send "${subject}" "${body?body:''}"`);
//     } else {
//         execSync(`notify-send "${subject}"`);
//     }
// };
export const notify = (subject, body) => {
        execSync(`notify-send "${subject}"${body?` "${body}"`:""}`);
};