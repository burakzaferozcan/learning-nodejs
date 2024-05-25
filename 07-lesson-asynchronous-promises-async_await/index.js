const fs = require("fs");
const superagent = require("superagent");
//! callback hell
//! fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//!   console.log(`Breed: ${data}`);
//!   superagent
//!     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//!     .end((err, res) => {
//!       if (err) return console.log(err.message);
//!       console.log(res.body.message);
//!       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//!         if (err) return console.log(err.message);
//!         console.log("random dog image saved to file!");
//!       });
//!     });
//! });
//? promises
//? fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//?   console.log(`Breed: ${data}`);
//?   superagent
//?     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//?     .then((res) => {
//?       console.log(res.body.message);
//?       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//?         console.log("random dog image saved to file!");
//?       });
//?     })
//?     .catch((err) => {
//?       console.log(err.message);
//?     });
//? });
//todo Building Promises
//todo const readFilePro = (file) => {
//todo   return new Promise((resolve, reject) => {
//todo     fs.readFile(file, (err, data) => {
//todo       if (err) reject("i could not find that file");
//todo       resolve(data);
//todo     });
//todo   });
//todo };
//todo const writeFilePro = (file, data) => {
//todo   return new Promise((resolve, reject) => {
//todo     fs.writeFile(file, data, (err) => {
//todo       if (err) reject("i could not write that file");
//todo       resolve("success");
//todo     });
//todo   });
//todo };
//todo readFilePro(`${__dirname}/dog.txt`)
//todo   .then((data) => {
//todo     console.log(`Breed: ${data}`);
//todo     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//todo   })
//todo   .then((res) => {
//todo     console.log(res.body.message);
//todo     return writeFilePro("dog-img.txt", res.body.message);
//todo   })
//todo   .then(() => {
//todo     console.log("random dog image saved to file!");
//todo   })
//todo   .catch((err) => {
//todo     console.log(err.message);
//todo   });
//? async/await
//? const readFilePro = (file) => {
//?   return new Promise((resolve, reject) => {
//?     fs.readFile(file, (err, data) => {
//?       if (err) reject("i could not find that file");
//?       resolve(data);
//?     });
//?   });
//? };
//? const writeFilePro = (file, data) => {
//?   return new Promise((resolve, reject) => {
//?     fs.writeFile(file, data, (err) => {
//?       if (err) reject("i could not write that file");
//?       resolve("success");
//?     });
//?   });
//? };
//? const getDogPic = async () => {
//?   try {
//?     const data = await readFilePro(`${__dirname}/dog.txt`);
//?     console.log(`Breed: ${data}`);
//?     const res = await superagent.get(
//?       `https://dog.ceo/api/breed/${data}/images/random`
//?     );
//?     console.log(res.body.message);
//?     await writeFilePro("dog-img.txt", res.body.message);
//?     console.log("random dog image saved to file!");
//?   } catch (error) {
//?     console.log(error);
//?     throw error;
//?   }
//?   return "2: ready";
//? };
//? (async () => {
//?   try {
//?     console.log("1: will get dog pics");
//?     const x = await getDogPic();
//?     console.log(x);
//?     console.log("3: done getting dog pics");
//?   } catch (error) {
//?     console.log("error");
//?   }
//? })();
// console.log("1: will get dog pics");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: done getting dog pics");
//   })
//   .catch((err) => {
//     console.log("error");
//   });
//! Waiting for Multiple Promises Simultaneously
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("i could not find that file");
      resolve(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("i could not write that file");
      resolve("success");
    });
  });
};
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resPro1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resPro2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resPro3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res, resPro1, resPro2, resPro3]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    console.log(res.body.message);
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("random dog image saved to file!");
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "2: ready";
};
(async () => {
  try {
    console.log("1: will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: done getting dog pics");
  } catch (error) {
    console.log("error");
  }
})();
// console.log("1: will get dog pics");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: done getting dog pics");
//   })
//   .catch((err) => {
//     console.log("error");
//   });
