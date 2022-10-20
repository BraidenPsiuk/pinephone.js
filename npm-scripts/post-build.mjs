// import { readdir } from 'fs/promises';

// const generateDocs = async () => {
//     const exampleFolders = await readdir("./examples/");
//     for (const exampleFiles of exampleFolders) {
//         const folder = await readdir(`./examples/${exampleFiles}/`);
//         console.log(folder);
//     }
//     // Maybe switch to using recursion here in case of complex examples, Three even does this, I confirmed!

//     const exampleArr = [];
//     const docs = {
//         numberOfExamples: exampleFolders.length,
//         examples: exampleArr
//     };
// };

// generateDocs().then(thing=>{
//     console.log(thing);
// });