// call back 버전
const fs = require('fs');

fs.readFile('./README.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

// promise 버전
const fs1 = require('fs').promises;

fs1.readFile('./README.txt')
    .then(() => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });