const fs = require("fs");
// blocking, synchronous // dosyayı okumak
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
// blocking, synchronous // dosyaya yazmak
const textOut = `this is what we know about the avocade : ${textIn}.\ncreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("file written!");

// Non-blocking, asynchronous // dosyaya yazmak
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("your file has been written successfully");
      });
    });
  });
});

console.log("willread file");

// Non-blocking, asynchronous // dosyaya yazmak
